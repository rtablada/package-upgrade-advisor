import fetch from 'node-fetch';
import { PackageDetails } from './package-details';

const packageNames = [
  'ember-source',
  'ember-cli-babel',
];

async function main() {
  const packageDetails : PackageDetails[] = await Promise.all(
    packageNames.map(async (packageName) => {
      const res = await fetch(`https://registry.npmjs.org/${packageName}`);

      return res.json();
    }),
  );

  console.log(packageDetails);
}

main();
