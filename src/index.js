import _ from 'lodash';
import stylish from './formatters/stylish.js';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {

	const file1 = parser(filepath1);
	const file2 = parser(filepath2);

	// console.log(JSON.stringify(createTree(file1, file2), null, 4));
	// console.log(createTree(file1, file2));
	console.log(stylish(createTree(file1, file2)));
	// stylish(createTree(file1, file2));
};

const createTree = (obj1, obj2) => {
	const allKeys = _.uniqBy([...Object.keys(obj1), ...Object.keys(obj2)]).sort();

	const travel = (key) => {
		const value1 = obj1[key];
		const value2 = obj2[key];

		if (_.isObject(value1) && _.isObject(value2)) {
			return {key, currentValue: createTree(value1, value2), type: "compared"};
		}

		if (_.has(obj1, key) && !_.has(obj2, key)) {
			return { key, currentValue: value1, type: "deleted" };
		}
		if (!_.has(obj1, key) && _.has(obj2, key)) {
			return { key, currentValue: value2, type: "added" };
		}
		if (value1 === value2) {
			return { key, currentValue: value1, type: "equal" };
		}
		if (value1 !== value2) {
			return {key, oldValue: value1, currentValue: value2, type: "modify" };
		}
	}

	return allKeys.map(travel);
}

export default genDiff;


// const formattedResult = `{\n${result.join('\n')}\n}`;

// const formattedLine = `{${result.join('')}}`;

// console.log(formattedResult);
