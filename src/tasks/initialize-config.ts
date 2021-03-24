import { copyFileSync } from 'fs';
import { join } from 'path';

export default function initializeConfig() {
  copyFileSync(join(__dirname, '/../../_templates/config.js'), './.package-upgrade.js');
}
