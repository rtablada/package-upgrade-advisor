import semver from 'semver';
import { PackageDetail } from '../package-detail';

export abstract class OutputColumn {
  abstract headerText : string;

  abstract getRowText(detail : PackageDetail) : string;

  abstract getStatus(detail: PackageDetail) :
    undefined
    | 'success'
    | 'alert'
    | 'caution'
    | 'warning'
    | 'highlight';
}

export class PackageNameColumn extends OutputColumn {
  headerText: string = 'Package';

  getRowText(detail: PackageDetail): string {
    return detail.packageName;
  }

  getStatus = () => undefined;
}

export class RequiredVersionColumn extends OutputColumn {
  headerText = 'Required Version';

  getRowText(detail: PackageDetail): string {
    return detail.version;
  }

  getStatus = () => undefined;
}

export class LatestVersionColumn extends OutputColumn {
  changeStatus: boolean;

  constructor(changeStatus = false) {
    super();
    this.changeStatus = changeStatus;
  }

  headerText = 'Latest Version Available';

  getRowText(detail: PackageDetail): string {
    return detail.npmDetails['dist-tags'].latest;
  }

  getStatus(detail: PackageDetail) :
    undefined | 'success' | 'alert' | 'caution' | 'warning' | 'highlight' {
    if (!this.changeStatus) {
      return undefined;
    }

    const currentVersion = detail.version;
    const latestVersion = detail.npmDetails['dist-tags'].latest;

    if (!semver.valid(currentVersion) || !semver.valid(latestVersion)) {
      return 'highlight';
    }

    const diff = semver.diff(currentVersion, latestVersion);

    switch (diff) {
      case 'patch': return 'alert';
      case 'minor': return 'caution';
      case 'major': return 'warning';
      case 'beta':
      case 'premajor':
      case 'prerelease':
        return 'highlight';
      default: return 'success';
    }
  }
}
