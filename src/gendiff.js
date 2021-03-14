#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "./index.js";

const program = new Command();

program
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })

program.parse(process.argv);