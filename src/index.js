import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const file1_read = fs.readFileSync(filepath1, "utf-8");
    const file2_read = fs.readFileSync(filepath2, "utf-8");

    const file1 = JSON.parse(file1_read);
    const file2 = JSON.parse(file2_read);

    const allKeys = _.uniqBy([...Object.keys(file1), ...Object.keys(file2)]).sort();
    
    const result = allKeys.reduce((acc, key) => {
        // ЕСЛИ ВО 2 ОБЪЕКТЕ ЕСТЬ ЭТОТ КЛЮЧ
        if (file2.hasOwnProperty(key)) {
            // И ЕСЛИ КЛЮЧИ ДВУХ ОБЪЕКТОВ НЕ РАВНЫ И В 1 ОБЪЕКТЕ ОН ЕСТЬ
            if (file2[key] !== file1[key] && file1.hasOwnProperty(key)) {
                // ОТОБРАЖЕНИЕ ИЗМЕНЕНИЯ ОБЪЕКТА
                acc.push(`${setSpaces(2)}- ${key}: ${file1[key]}`);
                acc.push(`${setSpaces(2)}+ ${key}: ${file2[key]}`);
                return acc;
            // И ЕСЛИ КЛЮЧИ ДВУХ ОБЪЕКТОВ НЕ РАВНЫ И В 1 ОБЪЕКТЕ ЕГО НЕТ
            } else if (file2[key] !== file1[key] && !file1.hasOwnProperty(key)) {
                // ОТОБРАЖЕНИЕ ДОБАВЛЕНИЯ ЭЛЕМЕНТА
                acc.push(`${setSpaces(2)}+ ${key}: ${file2[key]}`);
                return acc;
            }
            // ОТОБРАЖЕНИЕ ОДИНАКОВОГО ЭЛЕМЕНТА
            acc.push(`${setSpaces(4)}${key}: ${file1[key]}`);
            return acc;
        } else {
            // ОТОБРАЖЕНИЕ УДАЛЕНИЯ ЭЛЕМЕНТА
            acc.push(`${setSpaces(2)}- ${key}: ${file1[key]}`);
            return acc;
        }
    }, []).join("\n");
    
    console.log(`{\n${result}\n}`);
}

function setSpaces(count) {
    return " ".repeat(count);
}

export default genDiff;