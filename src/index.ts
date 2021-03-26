import fetch from 'node-fetch';
import Table from 'cli-table';
import Arborist from '@npmcli/arborist';
import npmfetch from 'npm-registry-fetch';
import colors from 'colors/safe';
import Filter from './filters/filter';
import { NpmPackageDetails } from './npm-interfaces/package-details';
import { OutputColumn, RowStatus } from './output-columns';
import { ArboristNode, PackageDetail } from './package-detail';

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
  displayColumns: OutputColumn[];
}

export class PackageUpgraderConfig {
  options: PackageUpgraderConfigOptions;

  filters: Filter[];

  arborist: any;

  tree: ArboristNode;

  constructor(options: PackageUpgraderConfigOptions) {
    this.options = options;
    this.filters = options.filters.map((F) => new F());
    this.arborist = new Arborist();
  }

  async run(
    packageJson: PackageJson,
    outputType: 'csv' | 'console' = this.options.defaultOutputType ?? 'console',
  ) {
    console.log('Loading Packages...');
    const packageDetails = [
      ...(await this.packageDetails(packageJson.dependencies, 'dependencies')),
      ...(await this.packageDetails(packageJson.devDependencies, 'devDependencies')),
    ];

    console.log('\n\n\n\n');

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

  getColor(status: RowStatus) {
    switch (status) {
      case (RowStatus.success):
        return colors.green;
      case (RowStatus.alert):
        return colors.blue;
      case (RowStatus.caution):
        return colors.yellow;
      case (RowStatus.warning):
        return colors.red;
      case (RowStatus.highlight):
        return colors.magenta;
      default: return (a) => a;
    }
  }

  printToConsole(filteredPackages: PackageDetail[]) {
    const table = new Table({
      head: this.options.displayColumns.map((c) => c.headerText),
    });

    for (let i = 0; i < filteredPackages.length; i++) {
      const p = filteredPackages[i];

      table.push(this.options.displayColumns.map((c) => {
        const status = c.getStatus(p);

        return this.getColor(status)(c.print(p));
      }));
    }

    console.log(table.toString());
  }

  async packageDetails(
    dependencies: { [packageName: string]: string; } = {},
    dependencyType: string,
  ) : Promise<PackageDetail[]> {
    const packageNames = Object.keys(dependencies);

    this.tree = await this.arborist.loadActual();

    return Promise.all(packageNames.map(async (packageName) => ({
      packageName,
      requestedVersion: dependencies[packageName],
      dependencyType,
      npmDetails: await this.loadNpmDetails(packageName),
      arboristNode: this.tree.resolve(packageName),
    })));
  }

  loadNpmDetails(packageName: string): Promise<NpmPackageDetails> {
    return npmfetch.json(packageName) as Promise<NpmPackageDetails>;
  }
}
