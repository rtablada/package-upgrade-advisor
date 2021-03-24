import { PackageDetails } from '../npm-interfaces/package-details';

export default interface Filter {
  filter(packageDetails: PackageDetails): boolean;
}
