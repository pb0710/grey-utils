import Async from '.'

describe('request resource', () => {
	it('request real rest api', () => {
		const async = new Async({ baseURL: 'http://localhost:10086' })
		async.interceptors.request.use(
			c => {
				expect(typeof c).toBe('object')
				expect(c.baseURL).toBe('http://localhost:10086')
				expect(c.url).toBe('/search')
				expect(c.method).toBe('get')
				return c
			},
			e => e
		)
		async.interceptors.response
			.use(
				r => {
					expect(typeof r).toBe('object')
					return r
				},
				e => e
			)
			.use(
				r => {
					expect(typeof r).toBe('object')
					return r
				},
				e => e
			)
		const result = async
			.fetch({
				url: '/search',
				method: 'get',
				params: {
					userId: 123456,
					color: '999'
				}
			})
			.then(
				res => {
					expect(res && typeof res === 'object').toBe(true)
				},
				err => {
					expect(typeof err).toBe('object')
				}
			)
		expect(result).toBeInstanceOf(Promise)
	})

	// // 由于 nodejs v14 未实现 AbortController API（ReferenceError: AbortController is not defined）
	// // 暂不覆盖请求取消的用例
	// it('request cancellation', () => {
	// 	const async = new Async()
	// 	const source = async.CancelToken.source()
	// 	async
	// 		.fetch({
	// 			url: 'http://localhost:10086/search',
	// 			signal: source.token
	// 		})
	// 		.catch(err => {
	// 			expect(err.name).toBe('AbortError')
	// 		})
	// 	source.cancel()
	// })
})
