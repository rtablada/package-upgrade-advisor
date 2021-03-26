import OptionsFilter from './options-filter';

export default class EmberCoreAddonsFilter extends OptionsFilter {
  mode : 'deny' | 'allow' = 'deny';

  packageNames = [
    '@glimmer/component',
    '@glimmer/tracking',
    'babel-eslint',
    'broccoli-asset-rev',
    'ember-auto-import',
    'ember-cli',
    'ember-cli-app-version',
    'ember-cli-babel',
    'ember-cli-dependency-checker',
    'ember-cli-htmlbars',
    'ember-cli-inject-live-reload',
    'ember-cli-sri',
    'ember-cli-uglify',
    'ember-data',
    'ember-export-application-global',
    'ember-fetch',
    'ember-load-initializers',
    'ember-maybe-import-regenerator',
    'ember-qunit',
    'ember-resolver',
    'ember-source',
    'ember-template-lint',
    'ember-welcome-page',
    'eslint',
    'eslint-plugin-ember',
    'eslint-plugin-node',
    'loader.js',
    'npm-run-all',
    'qunit-dom',
  ];
}
