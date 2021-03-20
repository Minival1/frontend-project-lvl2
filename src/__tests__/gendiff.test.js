import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixtures = '__fixtures__';

test('recursion json', () => {
  const file1Path = path.resolve(__dirname, fixtures, 'file1-recursion.json');
  const file2Path = path.resolve(__dirname, fixtures, 'file2-recursion.json');

  const result = path.resolve(__dirname, fixtures, 'result-recursion.txt');
  const resultRead = fs.readFileSync(result, 'utf-8');

  const resultWithSpaces = genDiff(file1Path, file2Path, 'stylish');
  const resultNoSpaces = resultWithSpaces.replace(/\s/g, '');

  expect(resultNoSpaces).toBe(resultRead);
});

test('recursion yaml', () => {
  const file1Path = path.resolve(__dirname, fixtures, 'file1-recursion.yaml');
  const file2Path = path.resolve(__dirname, fixtures, 'file2-recursion.yaml');

  const result = path.resolve(__dirname, fixtures, 'result-recursion.txt');
  const resultRead = fs.readFileSync(result, 'utf-8');

  const resultWithSpaces = genDiff(file1Path, file2Path, 'stylish');
  const resultNoSpaces = resultWithSpaces.replace(/\s/g, '');

  expect(resultNoSpaces).toBe(resultRead);
});

test('plain json', () => {
  const file1Path = path.resolve(__dirname, fixtures, 'file1-recursion.json');
  const file2Path = path.resolve(__dirname, fixtures, 'file2-recursion.json');

  const result = path.resolve(__dirname, fixtures, 'result-plain.txt');
  const resultRead = fs.readFileSync(result, 'utf-8');

  const resultWithSpaces = genDiff(file1Path, file2Path, 'plain');
  const resultNoSpaces = resultWithSpaces.replace(/\s/g, '');

  expect(resultNoSpaces).toBe(resultRead);
});

test('plain yaml', () => {
  const file1Path = path.resolve(__dirname, fixtures, 'file1-recursion.yaml');
  const file2Path = path.resolve(__dirname, fixtures, 'file2-recursion.yaml');

  const result = path.resolve(__dirname, fixtures, 'result-plain.txt');
  const resultRead = fs.readFileSync(result, 'utf-8');

  const resultWithSpaces = genDiff(file1Path, file2Path, 'plain');
  const resultNoSpaces = resultWithSpaces.replace(/\s/g, '');
  expect(resultNoSpaces).toBe(resultRead);
});

test('format json', () => {
  const file1Path = path.resolve(__dirname, fixtures, 'file1-recursion.json');
  const file2Path = path.resolve(__dirname, fixtures, 'file2-recursion.json');

  const result = path.resolve(__dirname, fixtures, 'result-json.txt');
  const resultRead = fs.readFileSync(result, 'utf-8');

  const resultWithSpaces = genDiff(file1Path, file2Path, 'json');
  const resultNoSpaces = resultWithSpaces.replace(/\s/g, '');
  expect(resultNoSpaces).toBe(resultRead);
});
