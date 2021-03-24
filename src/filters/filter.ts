import { PackageDetails } from '../package-details';

export default abstract class Filter {
  abstract filter(packageDetails: PackageDetails): boolean;
}
