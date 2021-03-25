import yargs from 'yargs/yargs';
import initializeConfig from '../tasks/initialize-config';
import runAdvisor from '../tasks/run-advisor';

const { hideBin } = require('yargs/helpers');

export default function execute() {
  const { argv } = yargs(hideBin(process.argv))
    .command('init', 'Initialize Config', () => {
    }, () => {
      initializeConfig();
    })
    .command('$0', 'Run package-upgrade-advisor', () => {}, () => {
      runAdvisor();
    })
    .help();
}
