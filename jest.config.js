module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    "@backend/(.*)": ["<rootDir>/src/app/backend/$1"],
    "@components/(.*)": ["<rootDir>/src/app/components/$1"],
    "@directives/(.*)": ["<rootDir>/src/app/directives/$1"],
    "@guards/(.*)": ["<rootDir>/src/app/guards/$1"],
    "@interceptors/(.*)": ["<rootDir>/src/app/interceptors/$1"],
    "@interfaces/(.*)": ["<rootDir>/src/app/interfaces/$1"],
    "@mocks/(.*)": ["<rootDir>/src/app/mocks/$1"],
    "@pages/(.*)": ["<rootDir>/src/app/pages/$1"],
    "@pipes/(.*)": ["<rootDir>/src/app/pipes/$1"],
    "@services/(.*)": ["<rootDir>/src/app/services/$1"],
    "@utils/(.*)": ["<rootDir>/src/app/utils/$1"],
    "@env/(.*)": ["<rootDir>/src/environments/$1"],
    "^uuid$": "uuid"
  },
  modulePathIgnorePatterns: [
    "\\.mocks\\.ts$",
  ],
  moduleDirectories: ['node_modules', 'src'],
  coverageReporters:['lcov', 'text', 'text-summary']
};
