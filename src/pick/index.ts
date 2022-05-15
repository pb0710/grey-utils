export default function pick<T extends object, S extends keyof T>(obj: T, ...keys: S[]): Pick<T, S> {
	return keys.reduce<any>((pre, key) => {
		pre[key] = obj[key]
		return pre
	}, {})
}
