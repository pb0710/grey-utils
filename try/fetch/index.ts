import { is, join } from '../../src'
import dispatch from './dispatch'

type Callback = (arg: any) => Promise<any>
type Handler = { fulfill: Callback; fail: Callback }
class Interceptors {
	handlers: Handler[]
	constructor() {
		this.handlers = []
	}

	use(fulfill: Callback, fail: Callback) {
		this.handlers.push({ fulfill, fail })
		return this
	}

	each(callback: (handler: Handler) => void) {
		this.handlers.forEach(callback)
		return this
	}
}

export interface Config {
	url?: string
	baseUrl?: string
	method?: 'get' | 'post'
	headers?: object
}
export default class Fetch {
	defaults: Config
	interceptors: { request: Interceptors; response: Interceptors }
	constructor(defaults: Config) {
		this.defaults = defaults
		this.interceptors = {
			request: new Interceptors(),
			response: new Interceptors()
		}
	}

	static create(conf: Config) {
		return new Fetch({
			baseUrl: '',
			method: 'get',
			headers: {},
			...conf
		})
	}

	public request<T>(urlOrConf: string | Config = this.defaults, conf: Config = this.defaults) {
		let mergedConf: Config = {}
		let url = ''
		let config

		if (is.string(urlOrConf)) {
			url = urlOrConf
			config = conf
		} else if (is.object(urlOrConf)) {
			url = urlOrConf.url || ''
			config = urlOrConf
		}
		mergedConf = {
			...config,
			url: join(this.defaults.baseUrl, url)
		}

		const reqChain: Callback[] = []
		this.interceptors.request.each(handler => {
			reqChain.push(handler.fulfill, handler.fail)
		})
		const resChain: Callback[] = []
		this.interceptors.response.each(handler => {
			resChain.push(handler.fulfill, handler.fail)
		})
		const chain = [...reqChain, dispatch, undefined, ...resChain]

		let promise = Promise.resolve(mergedConf)
		while (chain.length) {
			promise = promise.then(chain.shift(), chain.shift())
		}
		return promise as Promise<T>
	}
}
