import { join } from 'path';
import { existsSync } from 'fs';
import { PackageUpgraderConfig } from '..';

export default function runAdvisor() {
  const configPath = join(process.cwd(), '/.package-upgrade.js');
  const packagePath = join(process.cwd(), '/package.json');

  if (!existsSync(configPath)) {
    console.error('This project does not have a pacakge-upgrade-advisor config!');
    console.log('Run "package-upgrade-advisor init" to setup config.');

    process.exit(1);
  }

  // eslint-disable-next-line import/no-dynamic-require
  const config : PackageUpgraderConfig = require(configPath);
  const packageInfo = require(packagePath);

  config.run(packageInfo);
}
