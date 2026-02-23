/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@simplesteps/core$': '<rootDir>/../../../packages/core/src/index',
    '^@simplesteps/core/runtime$': '<rootDir>/../../../packages/core/src/runtime/index',
    '^@simplesteps/core/runtime/services$': '<rootDir>/../../../packages/core/src/runtime/services/index',
    '^@simplesteps/core/(.+)$': '<rootDir>/../../../packages/core/src/$1',
    '^@simplesteps/cdk$': '<rootDir>/../../../packages/cdk/src/index',
    '^@simplesteps/cdk/(.+)$': '<rootDir>/../../../packages/cdk/src/$1',
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
      },
    }],
  },
};
