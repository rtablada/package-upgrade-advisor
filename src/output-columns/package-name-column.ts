import { PackageDetail } from '../package-detail';
import { OutputColumn, RowStatus } from './output-column';

export class PackageNameColumn extends OutputColumn {
  headerText: string = 'Package';

  getRowText(detail: PackageDetail): string {
    return detail.packageName;
  }

  getStatus = () => RowStatus.none;
}
