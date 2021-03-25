import { PackageDetail } from '../package-detail';

export default interface Filter {
  filter(packageDetails: PackageDetail): boolean;
}
