import { NpmPackageDetails } from './npm-interfaces/package-details';

export interface PackageDetail {
  packageName: string;
  version: string;
  dependencyType: string;
  npmDetails: NpmPackageDetails | undefined;
}
