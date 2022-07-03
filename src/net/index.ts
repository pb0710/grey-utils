import compose from '../compose'
import omit from '../omit'
import { join } from '../path'

export type Middleware = (...s: any[]) => any
class Interceptor {
	private fulfillFns: Middleware[]
	private failFns: Middleware[]
	public fulfill?: Middleware
	public fail?: Middleware
	constructor() {
		this.fulfillFns = []
		this.failFns = []
	}

	public use<T extends Middleware, S extends Middleware>(fulfill: T, fail: S): this {
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
	parse?: 'json' | 'blob' | 'arrayBuffer' | 'text'
	url?: string
	params?: Record<string, any>
	data?: Record<string, any>
}
interface BaseConfig extends Omit<Config, 'url'> {
	baseURL?: string
}
export default class Net {
	private baseConf: BaseConfig
	public interceptors: {
		request: Interceptor
		response: Interceptor
	}
	public CancelToken: typeof CancelToken
	constructor(baseConf: BaseConfig = {}) {
		this.baseConf = { mode: 'cors', ...baseConf }
		this.interceptors = {
			request: new Interceptor(),
			response: new Interceptor()
		}
		this.CancelToken = CancelToken
	}

	public async fetch<R>(conf: Config): Promise<R> {
		const { parse = 'json' } = conf

		const integratedConf: Config & BaseConfig = { ...this.baseConf, ...conf }
		const info = this.getInfo(integratedConf)
		let init: RequestInit
		try {
			init = this.getInit(integratedConf)
		} catch (error) {
			return Promise.reject(error)
		}

		return await fetch(info, init)
			.then(
				response => (response.ok ? response[parse]() : Promise.reject(response)),
				error => {
					if (error.name === 'AbortError') {
						// We know it's been canceled!
						// TODO:
					}
					const reason = this.interceptors.response.fail?.(error) ?? error
					return Promise.reject(reason)
				}
			)
			.then(this.interceptors.response.fulfill)
	}

	private getInfo(conf: Config & BaseConfig): string {
		const { baseURL = '', url = '', params = {} } = conf
		const integratedUrl = join(baseURL, url)
		const qs = Object.keys(params).reduce((pre, cur, i) => `${pre}${i === 0 ? '' : '&'}${cur}=${params[cur]}`, '')
		const prefix = qs && !integratedUrl.includes('?') ? '?' : ''
		return integratedUrl + prefix + qs
	}

	private getInit(conf: Config & BaseConfig): RequestInit {
		const { data } = conf
		let confClone = { ...conf }
		try {
			confClone = this.interceptors.request.fulfill?.(confClone) ?? confClone
			confClone = omit(confClone, 'baseURL', 'url', 'data')
			return data ? { ...confClone, body: JSON.stringify(data) } : confClone
		} catch (error) {
			throw this.interceptors.request.fail?.(error) ?? error
		}
	}

	public get<R>(url: string, conf?: Config): Promise<R> {
		return this.fetch({ ...conf, url, method: 'GET' })
	}

	public post<R>(url: string, data: object, conf?: Config): Promise<R> {
		return this.fetch({ ...conf, url, data, method: 'POST' })
	}

	public put<R>(url: string, data: object, conf?: Config): Promise<R> {
		return this.fetch({ ...conf, url, data, method: 'PUT' })
	}

	public delete<R>(url: string, conf?: Config): Promise<R> {
		return this.fetch({ ...conf, url, method: 'DELETE' })
	}
}
