import semver from 'semver';
import npm from 'npm';
import { NpmPackageDetails } from '../npm-interfaces/package-details';
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
    return detail.requestedVersion;
  }

  getStatus = () => undefined;
}

export class LatestVersionColumn extends OutputColumn {
  changeStatus: boolean;

  constructor(changeStatus = true) {
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

    const currentVersion = detail.requestedVersion;
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

export class DependencyColumn extends OutputColumn {
  packageName: string;

  changeStatus: boolean;

  constructor(packageName: string, changeStatus = true) {
    super();
    this.packageName = packageName;
    this.changeStatus = changeStatus;
  }

  get headerText() {
    return this.packageName;
  }

  private getDependencyVersion(detail: PackageDetail, version: string) {
    const versionInfo = detail.npmDetails.versions[version];

    return (versionInfo.dependencies ?? {})[this.packageName] ?? (versionInfo.devDependencies ?? {})[this.packageName] ?? 'N/A';
  }

  getRowText(detail: PackageDetail): string {
    return this.getDependencyVersion(detail, detail.requestedVersion);
  }

  getStatus(detail: PackageDetail): 'success' | 'alert' | 'caution' | 'warning' | 'highlight' {
    throw new Error('Method not implemented.');
  }
}
