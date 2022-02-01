import { is } from '..'

export default function cls(...args: any[]): string {
	return args
		.flat(Infinity)
		.map((arg): string => {
			if (is.boolean(arg)) return ''
			if (is.string(arg)) return arg.trim()
			if (is.array(arg) || is.object(arg))
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
