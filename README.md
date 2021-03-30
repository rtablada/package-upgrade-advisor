# Package Upgrade Advisor


> This is still under heavy development! Give it a spin but be warned that the API and config file may change in future releases

Package Upgrade Advisor is a tool to help you and your team to visualize and track what project dependencies are most important to upgrade.
This is inspired by bulky builds caused by having multiple versions of libraries required as sub-dependencies, slow build times with conflicting Ember addons, and a general dread of "what should I update".

Get more information that simply looking at what you get from `npm outdated`!

![Example Package Upgrade Advisor Output](https://p192.p3.n0.cdn.getcloudapp.com/items/KoudDp2y/a929158b-1c54-44ec-8aec-3dbb9846a94f.jpg?v=7ff618ff73af7b26b196f13783e20ce7)

## Installation

The Package Upgrade Advisor currently needs to be installed globally and in your project

When using yarn:

```sh
yarn global add package-upgrade-advisor
yarn add -D package-upgrade-advisor
```

When using npm:

```sh
yarn -g install package-upgrade-advisor
yarn install --dev package-upgrade-advisor
```

## Initialization

To create a config file run:

```sh
package-upgrade-advisor init
```

This will create a `.package-advisor.js` file for configuration.

## Configuration

### Filters

Filters in the configuration file allow you to limit which packages are listed in the table output by the advisor.
Filters in the `filters` array in the configuration will run in order (this is helpful when you might want to have a deny list of packages to override the rules of an 'allow' filter).

The default `OptionsFilter` has a few properties for configuration:

* `mode` - This should be set to "allow" or "deny" to set if packages will be allowed or removed when matching the rules for this filter
* `packageNames` - This is a list of literal package names to allow or deny
* `keywords` - This is a list of NPM keywords to use to allow or deny packages (this will filter based on ANY matching keyword from this array not all)
* `packageNameRegex` - This is a regex used to match against package names, if undefined the regex filter will not be applied

The filters in `OptionsFilter` filter based on any `packageNammes`, `keywords`, or `packageNameRegex` match. If you would like to have a cascading set of filters add multiple `OptionsFilter` classes to your configuration file.

Example:

```js
filters: [
  // Allow only packages with names that contain "babel"
  class MyFilter extends OptionsFilter {
    mode = 'allow';
    packageNameRegex = /babel*/;
  },
  // Remove "@babel/core"
  class MyFilter extends OptionsFilter {
    mode = 'deny';
    packageNames = ['@babel/core'];
    keywords = [];
  },
],
```

### Output Columns

The `displayColumns` configuration allows you to define the information you would like to display or output.

By default the configuration will come with columns for:

* Package Name - The name of the package being inspected
* Installed Version - The version currently installed in your package
* Latest Version - Latest version available from the NPM Registry

The columns in `displayColumns` can be reordered to any order and in the future you will be able to define your own `OutputColumn` classes to create your own customized output.

The last column type that ships with Package Upgrade Advisor is the `DependencyColumn` this takes the name of a child sub-dependency that you are trying to audit to help identify potentially conflicting or duplicated versions. The `DependencyColumn` constructor takes a package name and will output the version of that package required by your dependency as well as the version that would be installed by upgrading to the latest version of your dependency.

### Example Output

This is the output from running `package-upgrade-advisor` on this project!

```sh
┌──────────────────────────────────┬──────────────────┬────────────────┬────────────────────────┐
│ Package                          │ Required Version │ Latest Version │ lodash                 │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @npmcli/arborist                 │ 2.2.9            │ 2.2.9          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ cli-table                        │ 0.3.6            │ 0.3.6          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ cliui                            │ 7.0.4            │ 7.0.4          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ colors                           │ 1.4.0            │ 1.4.0          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ json-to-ts                       │ 1.7.0            │ 1.7.0          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ moment                           │ 2.29.1           │ 2.29.1         │ >=4.17.19 ~> >=4.17.19 │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ npm-registry-fetch               │ 9.0.0            │ 9.0.0          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ semver                           │ 7.3.5            │ 7.3.5          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ yargs                            │ 16.2.0           │ 16.2.0         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @types/node-fetch                │ 2.5.8            │ 2.5.8          │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @types/npm                       │ 2.0.31           │ 2.0.31         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @types/yargs                     │ 16.0.0           │ 16.0.1         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @typescript-eslint/eslint-plugin │ 4.19.0           │ 4.20.0         │ ^4.17.15 ~> ^4.17.15   │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ @typescript-eslint/parser        │ 4.19.0           │ 4.20.0         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ eslint                           │ 7.22.0           │ 7.23.0         │ ^4.17.21 ~> ^4.17.21   │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ eslint-config-airbnb-base        │ 14.2.1           │ 14.2.1         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ eslint-plugin-import             │ 2.22.1           │ 2.22.1         │ N/A                    │
├──────────────────────────────────┼──────────────────┼────────────────┼────────────────────────┤
│ typescript                       │ 4.2.3            │ 4.2.3          │ N/A                    │
└──────────────────────────────────┴──────────────────┴────────────────┴────────────────────────┘
```

### Upcoming Features

These are not in any particular order:

* Bug in child dependency versions... It is getting the top level node resolved version...
* Row highlighting (easily identify which packages are causing the worst problems)
* Row sorting (sort by a given column or alert status)
* CSV output
