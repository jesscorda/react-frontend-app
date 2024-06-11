/** @type {import('jest').Config} */

module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '^.+\\.(css|png|jpg)$': '<rootDir>/jest.setup.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  globals: {
    TARGET_ENV: 'develop',
    SERVICE_URL: '',
  },
};
