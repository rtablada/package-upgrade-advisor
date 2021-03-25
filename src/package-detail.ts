import { NpmPackageDetails } from './npm-interfaces/package-details';

export interface PackageDetail {
  packageName: string;
  requestedVersion: string;
  dependencyType: string;
  npmDetails: NpmPackageDetails | undefined;
}
