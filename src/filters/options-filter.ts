import { PackageDetails } from '../npm-interfaces/package-details';
import Filter from './filter';

export default abstract class OptionsFilter implements Filter {
  abstract mode : 'allow' | 'deny';

  packageNames : string[] = [''];

  keywords : string[] = [''];

  packageNameRegex : undefined | RegExp = undefined;

  private filterByRegex(packageDetails: PackageDetails) {
    return this.packageNameRegex !== undefined
      && !!packageDetails.name.match(this.packageNameRegex);
  }

  filter(packageDetails: PackageDetails) : boolean {
    let result: boolean = false;

    result = this.packageNames.includes(packageDetails.name)
      || this.keywords.some((keyword) => packageDetails.keywords.includes(keyword))
      || this.filterByRegex(packageDetails);

    return this.mode === 'allow' ? result : !result;
  }
}
