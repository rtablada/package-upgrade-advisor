import fetch from 'node-fetch';
import Table from 'cli-table';
import npm from 'npm';
import Filter from './filters/filter';
import { NpmPackageDetails } from './npm-interfaces/package-details';
import { OutputColumn } from './output-columns';
import { PackageDetail } from './package-detail';

export { default as OptionsFilter } from './filters/options-filter';
export * from './output-columns';

interface FilterClass {
  new(): Filter;
}

interface PackageJson {
  devDependencies: {
    [packageName: string]: string;
  } | undefined,
  dependencies: {
    [packageName: string]: string;
  } | undefined,
}

interface PackageUpgraderConfigOptions {
  defaultOutputType: 'csv' | 'console' | undefined;
  filters: FilterClass[];
  displayTable: OutputColumn[];
}

export class PackageUpgraderConfig {
  options: PackageUpgraderConfigOptions;

  filters: Filter[];

  constructor(options: PackageUpgraderConfigOptions) {
    this.options = options;
    this.filters = options.filters.map((F) => new F());
  }

  async run(
    packageJson: PackageJson,
    outputType: 'csv' | 'console' = this.options.defaultOutputType ?? 'console',
  ) {
    await new Promise((resolve) => npm.load(resolve));
    const packageDetails = [
      ...(await this.packageDetails(packageJson.dependencies, 'dependencies')),
      ...(await this.packageDetails(packageJson.devDependencies, 'dev-dependencies')),
    ];

    const filteredPackages = this.filters
      .reduce(
        (packageDetails, filter) => packageDetails.filter((p) => filter.filter(p)),
        packageDetails,
      );

    if (outputType === 'console') {
      this.printToConsole(filteredPackages);
    } else {
      this.exportCsv(filteredPackages);
    }
  }

  exportCsv(filteredPackages: PackageDetail[]) {
    throw new Error('Method not implemented.');
  }

  printToConsole(filteredPackages: PackageDetail[]) {
    const table = new Table({
      head: this.options.displayTable.map((c) => c.headerText),
    });

    for (let i = 0; i < filteredPackages.length; i++) {
      const p = filteredPackages[i];
      table.push(this.options.displayTable.map((c) => c.getRowText(p)));
    }

    console.log(table.toString());
  }

  async packageDetails(
    dependencies: { [packageName: string]: string; } = {},
    dependencyType: string,
  ) : Promise<PackageDetail[]> {
    const packageNames = Object.keys(dependencies);

    return Promise.all(packageNames.map(async (packageName) => ({
      packageName,
      requestedVersion: dependencies[packageName],
      dependencyType,
      npmDetails: await this.loadNpmDetails(packageName),
    })));
  }

  async loadNpmDetails(packageName: string): Promise<NpmPackageDetails> {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);

    return res.json() as Promise<NpmPackageDetails>;
  }
}
