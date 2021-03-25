import { PackageDetail } from '../package-detail';
import Filter from './filter';

export default abstract class OptionsFilter implements Filter {
  abstract mode : 'allow' | 'deny';

  packageNames : string[] = [''];

  keywords : string[] = [''];

  packageNameRegex : undefined | RegExp = undefined;

  private filterByRegex(packageDetails: PackageDetail) {
    return this.packageNameRegex !== undefined
      && !!packageDetails.packageName.match(this.packageNameRegex);
  }

  filter(packageDetails: PackageDetail) : boolean {
    let result: boolean = false;

    result = this.packageNames.includes(packageDetails.packageName)
      || this.keywords.some((keyword) => packageDetails.npmDetails.keywords.includes(keyword))
      || this.filterByRegex(packageDetails);

    return this.mode === 'allow' ? result : !result;
  }
}
