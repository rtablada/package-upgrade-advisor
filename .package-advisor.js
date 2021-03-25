const {
  PackageUpgraderConfig,
  OptionsFilter, PackageNameColumn, DependencyColumn, RequiredVersionColumn, LatestVersionColumn,
} = require('package-upgrade-advisor');

module.exports = new PackageUpgraderConfig({
  filters: [
    class MyFilter extends OptionsFilter {
      mode = 'deny';
      packageNameRegex = /$\@types/;
    },
  ],

  // Configures the displayed table or output CSV data
  displayColumns: [
    // Show the package name
    new PackageNameColumn(),
    // Show the version currently installed
    new RequiredVersionColumn(),
    // Show the latest version of this package available from NPM
    new LatestVersionColumn(),
    // Show child dependencies on lodash
    // and the version used (and the version used by the latest version)
    new DependencyColumn('lodash'),
  ],
});
