/**
 * 防抖
 */
export function debounce<F extends (...args: any) => void>(fn: F, wait?: number): (...args: Parameters<F>) => void {
	let timer: number
	return function (...args) {
		if (timer) clearTimeout(timer)
		timer = window.setTimeout(() => {
			fn.apply(this, args)
			timer = 0
		}, wait)
	}
}

/**
 * 节流
 */
export function throttle<F extends (...args: any) => void>(fn: F, wait = 0): (...args: Parameters<F>) => void {
	let lastTime = new Date().getTime()
	return function (...args) {
		const now = new Date().getTime()
		if (now - lastTime > wait) {
			lastTime = now
			fn.apply(this, args)
		}
	}
}

export function delay(duration = 0): Promise<void> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration)
	})
}

export function isNodeJSEnv(): boolean {
	return typeof process !== 'undefined' && process?.versions != null && process?.versions.node != null
}
