import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (format, tree) => {
  const formats = {
    plain: () => plain(tree),
    stylish: () => stylish(tree),
    json: () => json(tree),
  };
  return formats[format]();
};
