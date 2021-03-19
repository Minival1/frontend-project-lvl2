import _ from 'lodash';

const stylish = (tree) => {

    return tree.flatMap(format).join("\n");
}

let spaces = 2;
let tab = " ";

const format = (obj) => {

    const {key, currentValue, oldValue, type} = obj;
    
    if (type === "added") {
        return `+ ${key}: ${stringify(currentValue)}`;
    }
    if (type === "deleted") {
        return `- ${key}: ${stringify(currentValue)}`;
    }
    if (type === "equal") {
        return `${tab} ${key}: ${stringify(currentValue)}`;
    }
    if (type === "modify") {
        return `- ${key}: ${stringify(oldValue)}\n+ ${key}: ${stringify(currentValue)}`;
    }
    if (type === "compared") {
        return `${tab} ${key}: {\n${stylish(currentValue)}\n}`;
    }
}

function stringify(value) {
    if (_.isObject(value)) {
        return `{\n${helper(Object.entries(value))}\n}`;
    }
    return value;
}

function helper(arr) {
    return arr.flatMap(([key, value]) => {
        if (_.isObject(value)) {
            return `${key}: {\n${helper(Object.entries(value))}\n}`;
        }
        return `${key}: ${value}`;
    }).join("\n");
}

function setGap(count) {
	return tab.repeat(count);
}

export default stylish;