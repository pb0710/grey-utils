/* eslint-disable @typescript-eslint/ban-types */

function isUndefined(arg: unknown): arg is undefined {
	return arg === undefined
}

function isNull(arg: unknown): arg is null {
	return arg === null
}

function isObject(arg: unknown): arg is object {
	return Object.prototype.toString.call(arg) === '[object Object]'
}

function isArray(arg: unknown): arg is unknown[] {
	return Array.isArray(arg)
}

function isFunction(arg: unknown): arg is Function {
	return typeof arg === 'function'
}

function isString(arg: unknown): arg is string {
	return typeof arg === 'string'
}

function isBoolean(arg: unknown): arg is boolean {
	return typeof arg === 'boolean'
}

export default {
	undefined: isUndefined,
	null: isNull,
	object: isObject,
	array: isArray,
	function: isFunction,
	string: isString,
	boolean: isBoolean
}
