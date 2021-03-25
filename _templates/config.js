const {
  PackageUpgraderConfig,
  OptionsFilter, PackageNameColumn, DependencyColumn, RequiredVersionColumn, LatestVersionColumn,
} = require('package-upgrade-advisor');

module.exports = new PackageUpgraderConfig({
  // Array of filters to run in order for composability
  filters: [
    class MyFilter extends OptionsFilter {
      // Set to allow or deny
      mode = 'allow';

      // List of strict package names to always filter
      packageNames = [];

      // List of keywords to filter on
      keywords = [];

      // Regex to match package names,
      // if left undefined no regex will be applied
      // and only keywords/packageNames will be used
      packageNameRegex = undefined;
    },
  ],

  // Configures the displayed table or output CSV data
  displayTable: [
    new PackageNameColumn(),
    new RequiredVersionColumn(),
    new LatestVersionColumn(),
    new DependencyColumn('ember-source'),
    new DependencyColumn('ember-cli'),
    new DependencyColumn('ember-data'),
  ],
});
