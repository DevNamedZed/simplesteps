/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'build/reports/coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'cobertura'],
  collectCoverageFrom: [
    'packages/core/src/**/*.ts',
    'packages/cdk/src/**/*.ts',
    'packages/local/src/**/*.ts',
    '!**/*.d.ts',
  ],
  roots: [
    '<rootDir>/packages/core/test',
    '<rootDir>/packages/cdk/test',
    '<rootDir>/packages/local/test',
    '<rootDir>/examples/starters/cdk/test',
    '<rootDir>/examples/starters/testing/test',
  ],
  moduleNameMapper: {
    // Strip .js extensions from TypeScript ESM-style imports
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Map @simplesteps/core barrel imports
    '^@simplesteps/core$': '<rootDir>/packages/core/src/index',
    '^@simplesteps/core/runtime$': '<rootDir>/packages/core/src/runtime/index',
    '^@simplesteps/core/runtime/services$': '<rootDir>/packages/core/src/runtime/services/index',
    '^@simplesteps/core/asl$': '<rootDir>/packages/core/src/asl/index',
    // Catch-all for deep @simplesteps/core/* imports
    '^@simplesteps/core/(.+)$': '<rootDir>/packages/core/src/$1',
    // Map @simplesteps/cdk barrel imports
    '^@simplesteps/cdk$': '<rootDir>/packages/cdk/src/index',
    '^@simplesteps/cdk/(.+)$': '<rootDir>/packages/cdk/src/$1',
    // Map @simplesteps/local barrel imports
    '^@simplesteps/local$': '<rootDir>/packages/local/src/index',
    '^@simplesteps/local/(.+)$': '<rootDir>/packages/local/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        target: 'ES2022',
        module: 'commonjs',
        moduleResolution: 'node',
        strict: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        skipLibCheck: true,
        declaration: false,
        rootDir: '.',
        baseUrl: '.',
        paths: {
          '@simplesteps/core': ['packages/core/src/index'],
          '@simplesteps/core/*': ['packages/core/src/*'],
          '@simplesteps/cdk': ['packages/cdk/src/index'],
          '@simplesteps/cdk/*': ['packages/cdk/src/*'],
          '@simplesteps/local': ['packages/local/src/index'],
          '@simplesteps/local/*': ['packages/local/src/*'],
        },
      },
    }],
  },
};
