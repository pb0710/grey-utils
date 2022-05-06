export declare function isUndefined(arg: unknown): arg is undefined
export declare function isNull(arg: unknown): arg is null
export declare function isObject(arg: unknown): arg is Record<string, any>
export declare function isArray(arg: unknown): arg is any[]
export declare function isFunction(arg: unknown): arg is Function
export declare function isString(arg: unknown): arg is string
export declare function isNumber(arg: unknown): arg is number
export declare function isBoolean(arg: unknown): arg is boolean
declare const _default: {
	undefined: typeof isUndefined
	null: typeof isNull
	object: typeof isObject
	array: typeof isArray
	function: typeof isFunction
	string: typeof isString
	number: typeof isNumber
	boolean: typeof isBoolean
	all: {
		undefined: (args: unknown[]) => args is undefined[]
		null: (args: unknown[]) => args is null[]
		object: (args: unknown[]) => args is Record<string, any>[]
		array: (args: unknown[]) => args is any[][]
		function: (args: unknown[]) => args is Function[]
		string: (args: unknown[]) => args is string[]
		number: (args: unknown[]) => args is number[]
		boolean: (args: unknown[]) => args is boolean[]
	}
}
export default _default
