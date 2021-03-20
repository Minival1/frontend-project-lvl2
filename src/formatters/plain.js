import _ from 'lodash';

const helper = (value) => (_.isObject(value) ? '[complex value]' : value);

const createPath = (path, key) => (path.length > 0 ? path.concat(`.${key}`) : key);

const format = (tree, path = '') => {
	function travel(obj) {
		const {
			key,
			currentValue,
			oldValue,
			type,
		} = obj;

		const fullPath = createPath(path, key);

		const types = {
			added: () => `Property '${fullPath}' was added with value: ${helper(currentValue)}`,
			deleted: () => `Property '${fullPath}' was removed`,
			equal: () => '',
			modify: () => `Property '${fullPath}' was updated. From ${helper(oldValue)} to '${helper(currentValue)}'`,
			compared: () => format(currentValue, fullPath),
		};

		return types[type]();
	}

	return tree.flatMap(travel).filter((item) => item !== '').join('\n');
};

export default (tree) => `\n${format(tree)}\n`;
