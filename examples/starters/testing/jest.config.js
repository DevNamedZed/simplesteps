/** @type {import('jest').Config} */
const rootDir = '<rootDir>/../../../';
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@simplesteps/core$': `${rootDir}packages/core/src/index`,
    '^@simplesteps/core/runtime$': `${rootDir}packages/core/src/runtime/index`,
    '^@simplesteps/core/runtime/services$': `${rootDir}packages/core/src/runtime/services/index`,
    '^@simplesteps/core/asl$': `${rootDir}packages/core/src/asl/index`,
    '^@simplesteps/core/(.+)$': `${rootDir}packages/core/src/$1`,
    '^@simplesteps/local$': `${rootDir}packages/local/src/index`,
    '^@simplesteps/local/(.+)$': `${rootDir}packages/local/src/$1`,
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        target: 'ES2022',
        module: 'commonjs',
        moduleResolution: 'node',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        declaration: false,
        rootDir: '../../..',
        baseUrl: '../../..',
        paths: {
          '@simplesteps/core': ['packages/core/src/index'],
          '@simplesteps/core/*': ['packages/core/src/*'],
          '@simplesteps/local': ['packages/local/src/index'],
          '@simplesteps/local/*': ['packages/local/src/*'],
        },
      },
    }],
  },
};
