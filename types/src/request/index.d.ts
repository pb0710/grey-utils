export declare type Fn = (...s: any[]) => any
declare class Interceptor {
	private fulfillFns
	private failFns
	fulfill?: Fn
	fail?: Fn
	constructor()
	use<T extends Fn, S extends Fn>(fulfill: T, fail: S): this
}
declare class CancelToken {
	static source(): {
		token: AbortSignal
		cancel(): void
	}
}
interface Config extends Omit<RequestInit, 'body'> {
	parse?: 'json' | 'blob' | 'arrayBuffer' | 'text'
	url?: string
	params?: Record<string, any>
	data?: Record<string, any>
}
interface BaseConfig extends Omit<Config, 'url'> {
	baseURL?: string
}
export default class Async {
	private baseConf
	interceptors: {
		request: Interceptor
		response: Interceptor
	}
	CancelToken: typeof CancelToken
	constructor(baseConf?: BaseConfig)
	fetch<R>(conf: Config): Promise<R>
	private getInfo
	private getInit
	get<R>(url: string, conf?: Config): Promise<R>
	post<R>(url: string, data: Record<string, any>, conf?: Config): Promise<R>
	put<R>(url: string, data: Record<string, any>, conf?: Config): Promise<R>
	delete<R>(url: string, conf?: Config): Promise<R>
}
export {}
