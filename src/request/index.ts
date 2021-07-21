import compose from '../compose'
import omit from '../omit'

export type Func = (...s: any[]) => any
class Interceptor {
	private fulfillFns: Func[]
	private failFns: Func[]
	public fulfill?: Func
	public fail?: Func
	constructor() {
		this.fulfillFns = []
		this.failFns = []
	}

	public use<T extends Func, S extends Func>(fulfill: T, fail: S): this {
		this.fulfillFns.push(fulfill)
		this.failFns.push(fail)
		this.fulfill = compose(...this.fulfillFns)
		this.fail = compose(...this.failFns)
		return this
	}
}

class CancelToken {
	public static source() {
		const controller = new AbortController()
		const { signal } = controller
		return {
			token: signal,
			cancel() {
				controller.abort()
			}
		}
	}
}

interface Config extends Omit<RequestInit, 'body'> {
	parse?: 'json' | 'blob' | 'formData' | 'arrayBuffer' | 'text'
	url?: string
	params?: { [key: string]: any }
	data?: { [key: string]: any }
}
interface BaseConfig extends Omit<Config, 'url'> {
	baseURL?: string
}
export default class Async {
	private baseConf: BaseConfig
	public interceptors: {
		request: Interceptor
		response: Interceptor
	}
	public CancelToken: typeof CancelToken
	constructor(baseConf: BaseConfig = {}) {
		this.baseConf = baseConf
		this.interceptors = {
			request: new Interceptor(),
			response: new Interceptor()
		}
		this.CancelToken = CancelToken
	}

	public fetch<R>(conf: Config): Promise<R> {
		const { parse = 'json' } = conf

		const info = this.getInfo(conf)
		let init: RequestInit
		try {
			init = this.getInit(conf)
		} catch (error) {
			return Promise.reject(error)
		}

		return fetch(info, init)
			.then(
				response => {
					if (!response.ok) {
						return Promise.reject(response)
					}
					return response[parse]()
				},
				error => {
					if (error.name === 'AbortError') {
						// We know it's been canceled!
					}
					const reason = this.interceptors.response.fail?.(error) ?? error
					return Promise.reject(reason)
				}
			)
			.then(this.interceptors.response.fulfill)
	}

	private getInfo(conf: Config): string {
		const { baseURL, url, params = {} } = { ...this.baseConf, ...conf }
		const realUrl = `${baseURL}${url}`
		const qs = Object.keys(params).reduce((pre, cur) => pre + `&${cur}=${params[cur]}`, '')
		const prefix = qs && !realUrl.includes('?') ? '?' : ''
		return realUrl + prefix + qs
	}

	private getInit(conf: Config): RequestInit {
		const { data = {} } = conf
		let realConf: Config & BaseConfig = { ...this.baseConf, ...conf }
		try {
			realConf = this.interceptors.request.fulfill?.(realConf) ?? realConf
			realConf = omit(realConf, 'baseURL', 'url', 'data')
			return { ...realConf, body: JSON.stringify(data) }
		} catch (error) {
			throw this.interceptors.request.fail?.(error) ?? error
		}
	}

	public get<R>(url: string, conf: Omit<Config, 'url'>): Promise<R> {
		return this.fetch<R>({ ...conf, url, method: 'GET' })
	}

	public post<R>(url: string, conf: Omit<Config, 'url'>): Promise<R> {
		return this.fetch<R>({ ...conf, url, method: 'POST' })
	}

	public put<R>(url: string, conf: Omit<Config, 'url'>): Promise<R> {
		return this.fetch<R>({ ...conf, url, method: 'PUT' })
	}

	public delete<R>(url: string, conf: Omit<Config, 'url'>): Promise<R> {
		return this.fetch<R>({ ...conf, url, method: 'DELETE' })
	}
}
