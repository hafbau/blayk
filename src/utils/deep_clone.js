export default (obj) => Object.assign({}, JSON.parse(JSON.stringify(obj)));

export function isDeepEqual(obj1, obj2) { return JSON.stringify(obj1) === JSON.stringify(obj2) };

export function isEmptyObject(obj) { return isDeepEqual(obj, {}) };
