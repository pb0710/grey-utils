/**
 * 防抖
 */
declare type Arg<F> = F extends (...args: (infer A)[]) => void ? A : never
export declare function debounce<F extends (...args: Arg<F>[]) => void>(
	fn: F,
	wait?: number
): (...args: Arg<F>[]) => void
/**
 * 节流
 */
export declare function throttle<F extends (...args: Arg<F>[]) => void>(
	fn: F,
	wait?: number
): (...args: Arg<F>[]) => void
export declare function delay(duration?: number): Promise<void>
export declare function isNodeJSEnv(): boolean
export {}
