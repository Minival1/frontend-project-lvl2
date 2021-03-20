import _ from 'lodash';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const createTree = (obj1, obj2) => {
  const allKeys = _.sortBy(_.uniqBy([...Object.keys(obj1), ...Object.keys(obj2)]));

  const travel = (key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, currentValue: createTree(value1, value2), type: 'compared' };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, currentValue: value1, type: 'deleted' };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, currentValue: value2, type: 'added' };
    }
    if (value1 === value2) {
      return { key, currentValue: value1, type: 'equal' };
    }
    if (value1 !== value2) {
      return {
        key, oldValue: value1, currentValue: value2, type: 'modify',
      };
    }
    return undefined;
  };

  return allKeys.map(travel);
};

const genDiff = (filepath1, filepath2, format) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const tree = createTree(file1, file2);

  if (format !== 'stylish' && format !== 'json' && format !== 'plain') {
    return formatter('stylish', tree);
  }

  return formatter(format, tree);
};

export default genDiff;
