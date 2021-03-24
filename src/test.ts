import fetch from 'node-fetch';
import Filter from './filters/filter';
import OptionsFilter from './filters/options-filter';
import { PackageDetails } from './npm-interfaces/package-details';

interface FilterClass {
  new(): Filter;
}

class PackageUpgradeHelper {
  packageNames = [
    'ember-source',
    'ember-cli-babel',
  ];

  filters: Filter[];

  constructor(filterClasses: FilterClass[]) {
    this.filters = filterClasses.map((F) => new F());
  }

  async getPackageDetails() : Promise<PackageDetails[]> {
    return Promise.all(
      this.packageNames.map(async (packageName) => {
        const res = await fetch(`https://registry.npmjs.org/${packageName}`);

        return res.json() as Promise<PackageDetails>;
      }),
    );
  }

  getFilteredPackages(allPackages: PackageDetails[]) : PackageDetails[] {
    return this.filters
      .reduce(
        (packageDetails, filter) => packageDetails.filter((p) => filter.filter(p)),
        allPackages,
      );
  }
}

async function main() {
  class MyFilter extends OptionsFilter {
    mode: 'allow' | 'deny' = 'allow';

    packageNameRegex = /ember/
  }

  const helper = new PackageUpgradeHelper([MyFilter]);

  const packageDetails = await helper.getPackageDetails();

  console.log(helper.getFilteredPackages(packageDetails).map((a) => a.name));
}

main();
