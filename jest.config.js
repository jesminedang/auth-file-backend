module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
        babelConfig: true,
      },
    },
  };
  