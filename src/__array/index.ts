export function forEach<T, S>(arr: T[], callback: (item: T, index: number, arr: T[]) => S): void {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i, arr)
	}
}

export function map<T, S>(arr: T[], callback: (item: T, index: number, arr: T[]) => S): S[] {
	const result = []
	for (let i = 0; i < arr.length; i++) {
		result.push(callback(arr[i], i, arr))
	}
	return result
}

export function reduce<T>(arr: T[], callback: (pre: T, cur: T, index: number, arr: T[]) => T, initial: T): T {
	let result = initial
	let pre: T
	for (let i = 0; i < arr.length; i++) {
		pre = result
		result = callback(pre, arr[i], i, arr)
	}
	return result
}
