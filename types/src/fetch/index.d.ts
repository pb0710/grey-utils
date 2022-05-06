declare type Callback = (arg: any) => Promise<any>
declare type Handler = {
	fulfill: Callback
	fail: Callback
}
declare class Interceptors {
	handlers: Handler[]
	constructor()
	use(fulfill: Callback, fail: Callback): this
	each(callback: (handler: Handler) => void): this
}
export interface Config {
	url?: string
	baseUrl?: string
	method?: 'get' | 'post'
	headers?: object
}
export default class Fetch {
	defaults: Config
	interceptors: {
		request: Interceptors
		response: Interceptors
	}
	constructor(defaults: Config)
	static create(conf: Config): Fetch
	request<T>(urlOrConf?: string | Config, conf?: Config): Promise<T>
}
export {}
