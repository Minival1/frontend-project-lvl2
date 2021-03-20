#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from './index.js';

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

program
	.version('0.1')
	.description('Compares two configuration files and shows a difference.')
	.option('-f, --format [type]', 'output format', 'stylish')
	.arguments('<filepath1> <filepath2>')
	.action((filepath1, filepath2) => {
		const result = genDiff(filepath1, filepath2, program.format);
		console.log(result);
	});

program.parse(process.argv);
