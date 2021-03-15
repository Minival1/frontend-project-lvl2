import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __fixtures = '__fixtures__';

test('flat json', () => {
	const file1Path = path.resolve(__dirname, __fixtures, 'file1.json');
	const file2Path = path.resolve(__dirname, __fixtures, 'file2.json');

	const result = path.resolve(__dirname, __fixtures, 'result-flat.txt');
	const resultRead = fs.readFileSync(result, 'utf-8');

	expect(genDiff(file1Path, file2Path)).toBe(resultRead);
});
