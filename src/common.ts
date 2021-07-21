/**
 * 防抖
 */
// export function debounce(fn: Callback, wait = 0): Callback {
// 	let timer: number
// 	return (...args) => {
// 		if (args.length) {
// 			const [{ event }] = args
// 			// react的event是合成对象，先转化
// 			event?.persist?.()
// 		}
// 		clearTimeout(timer)
// 		timer = window.setTimeout(() => {
// 			fn(...args)
// 		}, wait)
// 	}
// }

type Arg<F> = F extends (...args: (infer A)[]) => void ? A : never
export function debounce<F extends (...args: Arg<F>[]) => void>(
	fn: F,
	wait?: number
): (...args: Arg<F>[]) => void {
	let timer: number
	return (...args: Arg<F>[]) => {
		if (timer) clearTimeout(timer)
		timer = window.setTimeout(() => {
			fn(...args)
			timer = 0
		}, wait)
	}
}

/**
 * 节流
 */
export function throttle<F extends (...args: Arg<F>[]) => void>(
	fn: F,
	wait = 0
): (...args: Arg<F>[]) => void {
	let lastTime = new Date().getTime()
	return (...args: Arg<F>[]) => {
		const now = new Date().getTime()
		if (now - lastTime > wait) {
			lastTime = now
			fn(...args)
		}
	}
}
