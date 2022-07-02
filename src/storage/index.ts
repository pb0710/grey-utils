import is from '../is'

class Storage {
	public store: globalThis.Storage
	constructor(type: 'local' | 'session') {
		this.store = window[`${type}Storage`]
	}

	public get<T>(key: string): T | string | null {
		const val = this.store.getItem(key)

		if (is.null(val)) return null

		let result: T | string
		try {
			result = JSON.parse(val)
		} catch (err) {
			result = val
		}
		return result
	}

	public set<T>(key: string, val: T): void {
		this.store.setItem(key, JSON.stringify(val))
	}

	public remove(key: string): void {
		this.store.removeItem(key)
	}

	public clear() {
		this.store.clear()
	}
}

const storage = {
	local: new Storage('local'),
	session: new Storage('session')
}
export default storage
