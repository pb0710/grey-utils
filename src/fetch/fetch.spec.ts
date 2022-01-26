import Fetch from '.'

describe('interceptors', () => {
	it('should intercept', () => {
		const fetchInst = Fetch.create({
			baseUrl: 'v1',
			method: 'post'
		})
		fetchInst.interceptors.request
			.use(
				res => {
					expect(res).toMatchObject({
						url: '/v1/xyz',
						baseUrl: 'v1',
						method: 'post',
						headers: {}
					})
					return res
				},
				err => {
					return Promise.reject(err)
				}
			)
			.use(
				res => {
					expect(res).toMatchObject({
						url: '/v1/xyz',
						baseUrl: 'v1',
						method: 'post',
						headers: {}
					})
					return res
				},
				err => {
					return Promise.reject(err)
				}
			)

		fetchInst.interceptors.response
			.use(
				res => {
					expect(res).toEqual({ code: 200, data: {} })
					return res
				},
				err => {
					expect(err).toEqual({ code: 500, msg: '' })
					return Promise.reject(err)
				}
			)
			.use(
				res => {
					expect(res).toEqual({ code: 200, data: {} })
					return res
				},
				err => {
					expect(err).toEqual({ code: 500, msg: '' })
					return Promise.reject(err)
				}
			)

		fetchInst.request('xyz').then(
			result => {
				expect(result).toEqual({ code: 200, data: {} })
			},
			reason => {
				expect(reason).toEqual({ code: 500, msg: '' })
			}
		)
	})
})
