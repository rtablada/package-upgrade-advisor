interface Users {
  [name: string]: boolean;
}

interface Time {
  modified: string;
  created: string;
  [versionNumber: string]: string;
}

interface Repository {
  type: string;
  url: string;
}

interface Dependencies {
  [packageName: string]: string;
}

interface Scripts {
  [scriptCommand: string]: string;
}
interface Emberaddon {
  after: string;
}
interface Dist {
  shasum: string;
  tarball: string;
}
interface NpmUser {
  name: string;
  email: string;
}
interface Bugs {
  url: string;
}

interface Directories {
}
interface NpmOperationalInternal {
  host: string;
  tmp: string;
}

interface VersionInfo {
  name: string;
  license: string;
  version: string;
  keywords: string[];
  scripts: Scripts;
  repository: Repository;
  devDependencies: Dependencies;
  dependencies: Dependencies;
  'ember-addon': Emberaddon;
  gitHead: string;
  description: string;
  bugs: Bugs;
  homepage: string;
  _id: string;
  _shasum: string;
  _from: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: NpmUser;
  dist: Dist;
  maintainers: NpmUser[];
  _npmOperationalInternal: NpmOperationalInternal;
  directories: Directories;
}

interface Versions {
  [versionNumber: string]: VersionInfo;
}

export interface PackageDetails {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  versions: Versions;
  readme: string;
  maintainers: NpmUser[];
  time: Time;
  homepage: string;
  keywords: string[];
  repository: Repository;
  bugs: Bugs;
  license: string;
  readmeFilename: string;
  users: Users;
}
