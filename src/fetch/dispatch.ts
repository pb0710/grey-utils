import { Config } from '.'

function fakeFetch(): Promise<object> {
	return new Promise((res, rej) => {
		setTimeout(() => {
			if (Math.random() > 0.5) res({ code: 200, data: {} })
			else rej({ code: 500, msg: '' })
		}, 0)
	})
}

export default function dispatch(conf: Config) {
	console.log('conf: ', conf)
	return fakeFetch()
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err)
		})
}
