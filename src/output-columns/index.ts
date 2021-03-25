import semver from 'semver';
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
    return detail.arboristNode.version;
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

  private getCurrentVersion(detail: PackageDetail) : string | undefined {
    const packageName = detail.arboristNode?.resolve(this.packageName);

    return packageName?.version;
  }

  private getLatestVersion(detail: PackageDetail) : string {
    const packageData = detail.npmDetails.versions[detail.arboristNode.version];

    return packageData?.version;
  }

  getRowText(detail: PackageDetail): string {
    const currentVersion = this.getCurrentVersion(detail);

    if (currentVersion === undefined) {
      return 'N/A';
    }

    return `${currentVersion} ~> ${this.getLatestVersion(detail)}`;
  }

  getStatus(detail: PackageDetail): 'success' | 'alert' | 'caution' | 'warning' | 'highlight' {
    throw new Error('Method not implemented.');
  }
}
