export default function cls(...args: any[]): string {
	return args
		.flat(Infinity)
		.map((arg): string => {
			if (typeof arg === 'boolean') return ''
			if (typeof arg === 'string') return arg.trim()
			if (typeof arg === 'object' && arg !== null)
				return Object.keys(arg).reduce((pre, cur, i) => {
					if (!arg[cur]) return pre
					if (i === 0) return cur
					return `${pre} ${cur.trim()}`
				}, '')
			return ''
		})
		.filter(Boolean)
		.join(' ')
}
