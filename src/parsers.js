import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export default (filepath) => {
    const extension = path.extname(filepath);
    const fileRead = fs.readFileSync(filepath, 'utf-8');

    if (extension === ".json") {
        return JSON.parse(fileRead);
    }
    if (extension === ".yaml") {
        return YAML.parse(fileRead);
    }
    throw new Error('this extension is not supported, please use files with extension .json or .yaml');
}