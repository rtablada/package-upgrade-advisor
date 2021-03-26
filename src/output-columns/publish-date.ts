import moment from 'moment';
import { PackageDetail } from '../package-detail';
import { OutputColumn, RowStatus } from './output-column';

export class PublishDateColumn extends OutputColumn {
  headerText = 'Publish Date';

  getRowText(detail: PackageDetail): string {
    const currentVersion = detail.arboristNode.version;
    const latestVersion = detail.npmDetails['dist-tags'].latest;

    return `${this.getDate(detail, currentVersion).format('L')} ~> ${this.getDate(detail, latestVersion).format('L')}`;
  }

  getStatus(detail: PackageDetail): RowStatus {
    if (!this.options.changeStatus) {
      return undefined;
    }

    const currentVersion = detail.arboristNode.version;
    const latestVersion = detail.npmDetails['dist-tags'].latest;

    const currentDate = this.getDate(detail, currentVersion);
    const latestDate = this.getDate(detail, latestVersion);

    if (latestDate.diff(currentDate, 'year')) return RowStatus.warning;
    if (latestDate.diff(currentDate, 'month')) return RowStatus.caution;
    if (latestDate.diff(currentDate, 'day')) return RowStatus.success;

    return RowStatus.none;
  }

  getDate(detail: PackageDetail, version: string): moment.Moment {
    return moment(detail.npmDetails.time[version]);
  }
}
