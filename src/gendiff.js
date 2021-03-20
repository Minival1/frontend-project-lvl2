#!/usr/bin/env node
import commander from 'commander';
import genDiff from './index.js';

commander
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = commander.opts();
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

commander.parse(process.argv);
