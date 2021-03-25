import { NpmPackageDetails } from './npm-interfaces/package-details';

export interface ArboristNode {
  version: string;
  name: string;
  parent : null | ArboristNode;
  children: Map<string, ArboristNode>
  package: any;
  path: string;
  realpath: string;
  location: string;
  isLink :boolean;
  isRoot :boolean;
  root : ArboristNode;
  isTop :boolean;
  top :ArboristNode;
  dev: boolean;
  optional: boolean;
  devOptional: boolean;
  peer: boolean;
  errors : any[];

  resolve(name : string) : ArboristNode;
}

export interface PackageDetail {
  packageName: string;
  requestedVersion: string;
  dependencyType: string;
  npmDetails: NpmPackageDetails | undefined;
  arboristNode: ArboristNode;
}
