import { PackageDetail } from '../package-detail';
import { OutputColumn, OutputOptions, RowStatus } from './output-column';

export class DependencyColumn extends OutputColumn {
  packageName: string;

  constructor(packageName: string, options: OutputOptions) {
    super(options);
    this.packageName = packageName;
  }

  get headerText() {
    return this.packageName;
  }

  private getCurrentVersion(detail: PackageDetail): string | undefined {
    return this.getVersion(detail, detail.arboristNode.version);
  }

  private getLatestVersion(detail: PackageDetail): string {
    const latestVersion = detail.npmDetails['dist-tags'].latest;
    return this.getVersion(detail, latestVersion);
  }

  private getVersion(detail: PackageDetail, version: string): string {
    const packageData = detail.npmDetails.versions[version];

    return (packageData?.dependencies ?? {})[this.packageName]
      || (packageData?.devDependencies ?? {})[this.packageName];
  }

  getRowText(detail: PackageDetail): string {
    const currentVersion = this.getCurrentVersion(detail);

    if (currentVersion === undefined) {
      return 'N/A';
    }

    return `${currentVersion} ~> ${this.getLatestVersion(detail)}`;
  }

  getStatus(detail: PackageDetail): RowStatus {
    const currentVersion = this.getCurrentVersion(detail);

    if (currentVersion === undefined) {
      return RowStatus.none;
    }

    const latestVersion = this.getLatestVersion(detail);

    return this.getSemverStatus(currentVersion, latestVersion);
  }
}
