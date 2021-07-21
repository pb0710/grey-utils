import Async from '.'

const baseConf = {}
const async = new Async(baseConf)
async.interceptors.request.use(
	r => r,
	e => e
)
async.interceptors.response
	.use(
		r => r,
		e => e
	)
	.use(
		r => r,
		e => e
	)

it('sum', () => {
	expect(1 + 1).toBe(2)
})

// const source = async.CancelToken.source()
// async
// 	.fetch({
// 		url: 'ssss',
// 		signal: source.token
// 	})
// 	.then(
// 		res => {
// 			console.log('res: ', res)
// 		},
// 		err => {
// 			console.error('err: ', err)
// 		}
// 	)
// source.cancel()
