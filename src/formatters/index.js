import plain from './plain.js';
import stylish from './stylish.js';

export default (format,tree) => {
    const formats = {
        plain: () => plain(tree),
        stylish: () => stylish(tree)
    }
    return formats[format]();
}