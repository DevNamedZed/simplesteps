#!/usr/bin/env tsx
/**
 * Service codegen entry point.
 *
 * Reads services.codegen.json + vendored Smithy models, then generates:
 *   - src/runtime/services/<Service>.ts   (service binding stubs)
 *   - src/runtime/services/metadata.ts    (SDK IDs, optimized integrations, param tables)
 *   - src/runtime/services/index.ts       (barrel re-exports)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import type { CodegenConfig, ServiceConfig, AutoServiceInfo } from './lib/config.js';
import { SmithyParser } from './lib/smithy.js';
import type { SmithyServiceInfo } from './lib/smithy.js';
import { emitServiceFile, emitAutoServiceFile, normalizeClassName } from './lib/emitters/serviceFile.js';
import { emitBarrel } from './lib/emitters/barrel.js';
import { emitMetadata } from './lib/emitters/metadata.js';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const CODEGEN_DIR = path.resolve(
  typeof __dirname !== 'undefined' ? __dirname : new URL('.', import.meta.url).pathname,
);
const ROOT_DIR = path.resolve(CODEGEN_DIR, '../..');
const CORE_DIR = path.resolve(ROOT_DIR, 'packages/core');
const SERVICES_DIR = path.resolve(CORE_DIR, 'src/runtime/services');

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const modelsDir = path.resolve(CODEGEN_DIR, 'models');

  // Auto-fetch models if the directory is empty or missing
  ensureModels(modelsDir);

  console.log('Reading services.codegen.json...');
  const configPath = path.resolve(CODEGEN_DIR, 'services.codegen.json');
  const config: CodegenConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

  const optimizedEntries = Object.entries(config.optimizedServices);
  console.log(`Found ${optimizedEntries.length} optimized services.`);

  const includeSet = new Set(config.include ?? []);

  let filesWritten = 0;

  // Phase 1: Generate optimized service files (from config)
  const optimizedClassNames = new Set<string>();
  for (const [serviceName, serviceConfig] of optimizedEntries) {
    optimizedClassNames.add(serviceConfig.className);
    if (serviceConfig.classAlias) optimizedClassNames.add(serviceConfig.classAlias);

    const smithyParser = loadSmithyParser(serviceConfig);
    const code = emitServiceFile(serviceName, serviceConfig, smithyParser);
    const outPath = path.resolve(SERVICES_DIR, `${serviceConfig.className}.ts`);
    writeFile(outPath, code);
    filesWritten++;
  }

  // Phase 2: Auto-generate services from curated include list
  const autoServices: AutoServiceInfo[] = [];

  console.log(`Processing ${includeSet.size} included model directories...`);

  for (const dir of includeSet) {
    const modelPath = path.join(modelsDir, dir, 'model.json');
    if (!existsSync(modelPath)) {
      console.warn(`  Warning: No model found for included service "${dir}", skipping.`);
      continue;
    }

    try {
      const parser = new SmithyParser(modelPath);
      const info = parser.extractServiceInfo();
      if (!info) continue;

      const className = normalizeClassName(info.sdkId);

      // Skip if it's an optimized service (already generated in Phase 1)
      if (optimizedClassNames.has(className)) continue;

      // Skip services with no operations
      if (info.operations.length === 0) continue;

      // Generate the service file
      const code = emitAutoServiceFile(info, parser);
      const outPath = path.resolve(SERVICES_DIR, `${className}.ts`);
      writeFile(outPath, code);
      filesWritten++;

      const sdkId = info.arnNamespace || info.sdkId.replace(/\s+/g, '').toLowerCase();

      autoServices.push({
        className,
        sdkId,
        sdkIdPascal: info.sdkId,
        modelPath: `models/${dir}/model.json`,
        operationCount: info.operations.length,
      });
    } catch (err) {
      console.warn(`  Warning: Failed to process model in ${dir}: ${(err as Error).message}`);
    }
  }

  // Sort auto services by class name for deterministic output
  autoServices.sort((a, b) => a.className.localeCompare(b.className));
  console.log(`Auto-discovered ${autoServices.length} additional services.`);

  // Phase 3: Generate metadata.ts
  {
    const code = emitMetadata({
      optimizedServices: config.optimizedServices,
      autoServices,
    });
    const outPath = path.resolve(SERVICES_DIR, 'metadata.ts');
    writeFile(outPath, code);
    filesWritten++;
  }

  // Phase 4: Generate barrel
  {
    const code = emitBarrel({
      optimizedServices: config.optimizedServices,
      autoServices,
    });
    const outPath = path.resolve(SERVICES_DIR, 'index.ts');
    writeFile(outPath, code);
    filesWritten++;
  }

  console.log(`Done! Wrote ${filesWritten} files (${optimizedEntries.length} optimized + ${autoServices.length} auto-discovered).`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * If models/ is empty or missing, clone aws/api-models-aws and extract all
 * Smithy JSON AST files. This makes `npm run codegen` fully self-contained.
 */
function ensureModels(modelsDir: string): void {
  // Check if we already have models
  if (existsSync(modelsDir)) {
    const entries = readdirSync(modelsDir).filter(d =>
      statSync(path.join(modelsDir, d)).isDirectory(),
    );
    if (entries.length > 0) {
      console.log(`Found ${entries.length} cached models in ${path.relative(ROOT_DIR, modelsDir)}.`);
      return;
    }
  }

  console.log('No models found. Fetching from aws/api-models-aws...');
  const tmpDir = path.join(CODEGEN_DIR, '.tmp-models-clone');

  try {
    // Clean up any previous failed attempt
    if (existsSync(tmpDir)) {
      execSync(`rm -rf ${JSON.stringify(tmpDir)}`, { stdio: 'inherit' });
    }

    execSync(
      `git clone --depth 1 https://github.com/aws/api-models-aws.git ${JSON.stringify(tmpDir)}`,
      { stdio: 'inherit' },
    );

    const repoModels = path.join(tmpDir, 'models');
    if (!existsSync(repoModels)) {
      throw new Error('models/ directory not found in cloned repo');
    }

    mkdirSync(modelsDir, { recursive: true });

    const serviceDirs = readdirSync(repoModels).filter(d =>
      statSync(path.join(repoModels, d)).isDirectory(),
    );

    let count = 0;
    for (const svc of serviceDirs) {
      const svcDir = path.join(repoModels, svc, 'service');
      if (!existsSync(svcDir) || !statSync(svcDir).isDirectory()) continue;

      // Pick latest version
      const versions = readdirSync(svcDir).filter(v =>
        statSync(path.join(svcDir, v)).isDirectory(),
      );
      if (versions.length === 0) continue;
      versions.sort();
      const latest = versions[versions.length - 1];

      // Find the model JSON
      const versionDir = path.join(svcDir, latest);
      const jsonFiles = readdirSync(versionDir).filter(f => f.endsWith('.json'));
      if (jsonFiles.length === 0) continue;

      const localDir = path.join(modelsDir, svc);
      mkdirSync(localDir, { recursive: true });
      const src = path.join(versionDir, jsonFiles[0]);
      const dst = path.join(localDir, 'model.json');
      writeFileSync(dst, readFileSync(src));
      count++;
    }

    console.log(`Fetched ${count} Smithy models.`);
  } finally {
    // Always clean up clone
    if (existsSync(tmpDir)) {
      execSync(`rm -rf ${JSON.stringify(tmpDir)}`, { stdio: 'inherit' });
    }
  }
}

function loadSmithyParser(config: ServiceConfig): SmithyParser | null {
  if (!config.smithyModel) return null;

  const modelPath = path.resolve(CODEGEN_DIR, config.smithyModel);
  if (!existsSync(modelPath)) {
    console.warn(`  Warning: Smithy model not found at ${modelPath}, skipping typed params.`);
    return null;
  }

  return new SmithyParser(modelPath);
}

function writeFile(filePath: string, content: string): void {
  const existing = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : null;
  if (existing === content) {
    console.log(`  ${path.relative(ROOT_DIR, filePath)} (unchanged)`);
    return;
  }
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  ${path.relative(ROOT_DIR, filePath)} (updated)`);
}

main();
