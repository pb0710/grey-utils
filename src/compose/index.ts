export type Func = (...s: any[]) => any
export default function compose(...fns: Func[]): Func {
	if (fns.length === 0) return <T>(s: T) => s
	if (fns.length === 1) return fns[0]
	return fns.reduce(
		(pre, cur) =>
			(...args) =>
				pre(cur(...args))
	)
}
