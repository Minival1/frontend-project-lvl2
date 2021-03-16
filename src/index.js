import _ from 'lodash';
import parser from './parsers.js';

function setSpaces(count) {
	return ' '.repeat(count);
}

const genDiff = (filepath1, filepath2) => {

	const file1 = parser(filepath1);
	const file2 = parser(filepath2);

	const allKeys = _.uniqBy([...Object.keys(file1), ...Object.keys(file2)]).sort();

	const result = allKeys.reduce((acc, key) => {
		// ЕСЛИ ВО 2 ОБЪЕКТЕ ЕСТЬ ЭТОТ КЛЮЧ
		if (Object.prototype.hasOwnProperty.call(file2, key)) {
			// И ЕСЛИ КЛЮЧИ ДВУХ ОБЪЕКТОВ НЕ РАВНЫ И В 1 ОБЪЕКТЕ ОН ЕСТЬ
			if (file2[key] !== file1[key] && Object.prototype.hasOwnProperty.call(file1, key)) {
				// ОТОБРАЖЕНИЕ ИЗМЕНЕНИЯ ОБЪЕКТА
				acc.push(`${setSpaces(2)}- ${key}: ${file1[key]}`);
				acc.push(`${setSpaces(2)}+ ${key}: ${file2[key]}`);
				return acc;
				// И ЕСЛИ КЛЮЧИ ДВУХ ОБЪЕКТОВ НЕ РАВНЫ И В 1 ОБЪЕКТЕ ЕГО НЕТ
			} if (file2[key] !== file1[key] && !Object.prototype.hasOwnProperty.call(file1, key)) {
				// ОТОБРАЖЕНИЕ ДОБАВЛЕНИЯ ЭЛЕМЕНТА
				acc.push(`${setSpaces(2)}+ ${key}: ${file2[key]}`);
				return acc;
			}
			// ОТОБРАЖЕНИЕ ОДИНАКОВОГО ЭЛЕМЕНТА
			acc.push(`${setSpaces(4)}${key}: ${file1[key]}`);
			return acc;
		}
		// ОТОБРАЖЕНИЕ УДАЛЕНИЯ ЭЛЕМЕНТА
		acc.push(`${setSpaces(2)}- ${key}: ${file1[key]}`);
		return acc;
	}, []);

	const formattedResult = `{\n${result.join('\n')}\n}`;

	const formattedLine = `{${result.join('')}}`;

	console.log(formattedResult);

	return formattedLine;
};

export default genDiff;
