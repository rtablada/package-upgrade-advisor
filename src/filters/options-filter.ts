import { PackageDetails } from '../package-details';
import Filter from './filter';

export default abstract class OptionsFilter extends Filter {
  abstract mode : 'allow' | 'deny';

  packageNames : string[] = [''];

  keywords : string[] = [''];

  packageNameRegex : RegExp = new RegExp('.*');

  filter(packageDetails: PackageDetails) : boolean {
    let result: boolean = false;

    result = this.packageNames.includes(packageDetails.name)
      || this.keywords.some((keyword) => packageDetails.keywords.includes(keyword))
      || !!packageDetails.name.match(this.packageNameRegex);

    return this.mode === 'allow' ? result : !result;
  }
}
