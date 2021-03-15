import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __fixtures = "__fixtures__";

test("test flat json", () => {
    const file1_path = path.resolve(__dirname, __fixtures, "file1.json");
    const file2_path = path.resolve(__dirname, __fixtures, "file2.json");
    
    const result = path.resolve(__dirname, __fixtures, "result-flat.txt");
    const result_read = fs.readFileSync(result, "utf-8");

    expect(genDiff(file1_path, file2_path)).toBe(result_read);
});