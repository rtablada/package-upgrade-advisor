import semver from 'semver';
import { PackageDetail } from '../package-detail';

export interface OutputOptions {
  changeStatus: boolean;
  maxLength: number | undefined;
}

export enum RowStatus {
  none = 0,
  success = 1,
  alert = 2,
  caution = 3,
  warning = 4,
  highlight = 5,
}

export abstract class OutputColumn {
  abstract headerText : string;

  options : OutputOptions ;

  constructor(options: OutputOptions = {
    maxLength: undefined,
    changeStatus: true,
  }) {
    this.options = options;
  }

  abstract getRowText(detail : PackageDetail) : string;

  abstract getStatus(detail: PackageDetail) : RowStatus;

  print(detail: PackageDetail) {
    const text = this.getRowText(detail);

    return text.substring(0, this.options.maxLength);
  }

  getSemverStatus(currentVersion: string, latestVersion: string): RowStatus {
    if (currentVersion === undefined || latestVersion === undefined) {
      return RowStatus.none;
    }

    if (
      (!semver.valid(currentVersion) || !semver.valid(latestVersion))
      && (!semver.validRange(currentVersion) || !semver.validRange(latestVersion))) {
      return RowStatus.highlight;
    }

    currentVersion = semver.minVersion(currentVersion).version;
    latestVersion = semver.minVersion(latestVersion).version;

    const diff = semver.diff(currentVersion, latestVersion);

    switch (diff) {
      case 'patch': return RowStatus.alert;
      case 'minor': return RowStatus.caution;
      case 'major': return RowStatus.warning;
      case 'beta':
      case 'premajor':
      case 'prerelease':
        return RowStatus.highlight;
      default: return RowStatus.success;
    }
  }
}
