'use strict';

module.exports = {
  default: {
    paths: ['src/test/bdd/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/test/bdd/step-definitions/**/*.ts'],
  },
};
