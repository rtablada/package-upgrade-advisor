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

  filterByKeyword(packageKeywords: string[] = []): boolean {
    return this.keywords.some((keyword) => packageKeywords.includes(keyword));
  }

  filter(packageDetails: PackageDetail) : boolean {
    let result: boolean = false;

    result = this.packageNames.includes(packageDetails.packageName)
      || this.filterByKeyword(packageDetails.npmDetails.keywords ?? [])
      || this.filterByRegex(packageDetails);

    return this.mode === 'allow' ? result : !result;
  }
}
