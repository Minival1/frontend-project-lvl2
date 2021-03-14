#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

const info = `
  Usage: gendiff [options]

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -h, --help           output usage information;
`

program
  .option("-h, --help")
  .version("0.01");
program.parse(process.argv);

const options = program.opts();

if (options.help) {
  console.log(info);
}