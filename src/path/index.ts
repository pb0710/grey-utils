export function join(...paths: string[]): string {
	return paths.reduce((pre, cur) => {
		let path = cur.trim()
		if (path.startsWith('/')) {
			path = path.slice(1)
		}
		if (path.endsWith('/')) {
			path = path.slice(0, path.length - 1)
		}
		return `${pre}/${path}`
	}, '')
}

export default {
	join
}
