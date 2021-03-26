import { PackageDetail } from '../package-detail';
import { OutputColumn, RowStatus } from './output-column';

export class RequiredVersionColumn extends OutputColumn {
  headerText = 'Required Version';

  getRowText(detail: PackageDetail): string {
    return detail.arboristNode.version;
  }

  getStatus = () => RowStatus.none;
}
