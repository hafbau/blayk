/**
* Resolves object path, given as dot delimited string.
* @example
* // returns 3
* resolveObjectPath({ a: { b: 3 }, c: 4 }, "a.b");
* @param {Object} obj - The object whose path is to be resolved.
* @param {string} path - A dot(.) delimited string.
* @returns {*} - Returns the value at the object's path.
**/

import deepClone from './deep_clone';

export function get(obj, path) {
    return path
        .split(".")
        .reduce((resolved, key) => resolved[key], obj);
}

export function set(obj, path, value) {
    if (!value) return obj;
    obj = deepClone(obj);
    const pathArray = path.split(".");

    pathArray.reduce((resolved, key, id) => {
        if (id === pathArray.length - 1) resolved[key] = value;
        return resolved[key]
    }, obj);

    return obj;
}

