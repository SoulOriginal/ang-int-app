const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
};
