/* eslint-disable @typescript-eslint/ban-types */

function isObject(arg: unknown): arg is object {
	return Object.prototype.toString.call(arg) === '[object Object]'
}

function isArray(arg: unknown): arg is any[] {
	return Array.isArray(arg)
}

function isFunction(arg: unknown): arg is Function {
	return typeof arg === 'function'
}

export default {
	object: isObject,
	array: isArray,
	function: isFunction
}
