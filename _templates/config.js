const { OptionsFilter } = require('package-upgrade-helper');

module.exports = [
  class MyFilter extends OptionsFilter {
    mode = 'allow';

    packageNames = [];

    keywords = [];
  },
];
