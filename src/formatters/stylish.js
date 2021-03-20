import _ from 'lodash';

const tabCount = 2;
const tab = '  ';

const helper = (arr, gap) => arr.flatMap(([key, value]) => {
  if (_.isObject(value)) {
    return `${tab.repeat(3)}${gap}${key}: {\n${helper(Object.entries(value), gap + tab.repeat(2))}\n${gap}${tab.repeat(3)}}`;
  }
  return `${gap}${tab.repeat(3)}${key}: ${value}`;
}).join('\n');

const stringify = (value, gap) => {
  if (_.isObject(value)) {
    return `{\n${helper(Object.entries(value), gap)}\n${gap}${tab}}`;
  }
  return value;
};

const format = (tree, tabs) => {
  function travel(obj) {
    const {
      key,
      currentValue,
      oldValue,
      type,
    } = obj;

    const distance = tab.repeat(tabs);

    const types = {
      added: () => `${distance}+ ${key}: ${stringify(currentValue, distance)}`,
      deleted: () => `${distance}- ${key}: ${stringify(currentValue, distance)}`,
      equal: () => `${distance}${tab}${key}: ${stringify(currentValue, distance)}`,
      modify: () => `${distance}- ${key}: ${stringify(oldValue, distance)}\n${distance}+ ${key}: ${stringify(currentValue, distance)}`,
      compared: () => `${distance}${tab}${key}: {\n${format(currentValue, tabs + tabCount)}\n${distance}${tab}}`,
    };

    return types[type]();
  }

  return tree.flatMap(travel).join('\n');
};

export default (tree) => `{\n${format(tree, 1)}\n}`;
