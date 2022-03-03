/* eslint-disable @typescript-eslint/ban-types */

export function isUndefined(arg: unknown): arg is undefined {
	return arg === undefined
}

export function isNull(arg: unknown): arg is null {
	return arg === null
}

export function isObject(arg: unknown): arg is Record<string, any> {
	return Object.prototype.toString.call(arg) === '[object Object]'
}

export function isArray(arg: unknown): arg is any[] {
	return Array.isArray(arg)
}

export function isFunction(arg: unknown): arg is Function {
	return typeof arg === 'function'
}

export function isString(arg: unknown): arg is string {
	return typeof arg === 'string'
}

export function isNumber(arg: unknown): arg is number {
	return typeof arg === 'number'
}

export function isBoolean(arg: unknown): arg is boolean {
	return typeof arg === 'boolean'
}

export default {
	undefined: isUndefined,
	null: isNull,
	object: isObject,
	array: isArray,
	function: isFunction,
	string: isString,
	number: isNumber,
	boolean: isBoolean,
	all: {
		undefined: (args: unknown[]): args is undefined[] => args.every(isUndefined),
		null: (args: unknown[]): args is null[] => args.every(isNull),
		object: (args: unknown[]): args is Record<string, any>[] => args.every(isObject),
		array: (args: unknown[]): args is any[][] => args.every(isArray),
		function: (args: unknown[]): args is Function[] => args.every(isFunction),
		string: (args: unknown[]): args is string[] => args.every(isString),
		number: (args: unknown[]): args is number[] => args.every(isNumber),
		boolean: (args: unknown[]): args is boolean[] => args.every(isBoolean)
	}
}
