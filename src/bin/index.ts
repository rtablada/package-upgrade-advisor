import yargs from 'yargs/yargs';
import initializeConfig from '../tasks/initialize-config';

const { hideBin } = require('yargs/helpers');

export default function execute() {
  const { argv } = yargs(hideBin(process.argv)).command('init', 'Initialize Config', () => {
  }, () => {
    initializeConfig();
  });
}
