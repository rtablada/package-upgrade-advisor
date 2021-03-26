import { PackageDetail } from '../package-detail';
import { OutputColumn, RowStatus } from './output-column';

export class LatestVersionColumn extends OutputColumn {
  headerText = 'Latest Version';

  getRowText(detail: PackageDetail): string {
    return detail.npmDetails['dist-tags'].latest;
  }

  getStatus(detail: PackageDetail): RowStatus {
    if (!this.options.changeStatus) {
      return undefined;
    }

    const currentVersion = detail.requestedVersion;
    const latestVersion = detail.npmDetails['dist-tags'].latest;

    return this.getSemverStatus(currentVersion, latestVersion);
  }
}
