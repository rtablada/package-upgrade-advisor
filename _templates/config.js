const {
  PackageUpgraderConfig,
  OptionsFilter,
  PackageNameColumn,
  DependencyColumn,
  RequiredVersionColumn,
  LatestVersionColumn,
  PublishDateColumn,
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
      packageNameRegex = /.*/;
    },
    class MyFilter extends OptionsFilter {
      // Set to allow or deny
      mode = 'deny';

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
  displayColumns: [
    // Show the package name
    new PackageNameColumn(),
    // Show the version currently installed
    new RequiredVersionColumn(),
    // Show the latest version of this package available from NPM
    new LatestVersionColumn(),
    // Show publish date of required and latest versions
    new PublishDateColumn(),
    // Show child dependencies on lodash
    // and the version used (and the version used by the latest version)
    // new DependencyColumn('lodash'),
  ],
});
