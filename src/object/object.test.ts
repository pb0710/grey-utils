import { isValueEqual } from '.'

describe('test value equality judgment', () => {
	it('should undefined be equal', () => {
		expect(isValueEqual(undefined, undefined)).toBe(true)
	})

	it('should null be equal', () => {
		expect(isValueEqual(null, null)).toBe(true)
	})

	it('should boolean be equal', () => {
		expect(isValueEqual(true, true)).toBe(true)
	})

	it('should boolean not be equal', () => {
		expect(isValueEqual(true, false)).toBe(false)
	})

	it('should number be equal', () => {
		expect(isValueEqual(999, 999)).toBe(true)
	})

	it('should number not be equal', () => {
		expect(isValueEqual(123, 456)).toBe(false)
	})

	it('should string be equal', () => {
		expect(isValueEqual('xyz', 'xyz')).toBe(true)
	})

	it('should string not be equal', () => {
		expect(isValueEqual('xyz', 'qwer')).toBe(false)
	})
})

describe('test reference equality judgment', () => {
	it('should array reference not be equal', () => {
		const arr1 = [1, 2, 3]
		const arr2 = [1, 2, 3]
		expect(arr1 === arr2).toBe(false)
	})

	it('should array value not be equal', () => {
		const arr1 = [1, 2, 3]
		const arr2 = [1, 2, 3]
		expect(isValueEqual(arr1, arr2)).toBe(true)
	})

	it('should array nested be equal', () => {
		const arr1 = [1, 2, [3, [4]]]
		const arr2 = [1, 2, [3, [4]]]
		expect(isValueEqual(arr1, arr2)).toBe(true)
	})

	it('should array nested not be equal', () => {
		const arr1 = [1, 2, [3, [4]]]
		const arr2 = [1, 2, [3, 4]]
		expect(isValueEqual(arr1, arr2)).toBe(false)
	})

	it('should object reference not be equal', () => {
		const obj1 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: null
		}
		const obj2 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: null
		}
		expect(obj1 === obj2).toBe(false)
	})

	it('should object value be equal', () => {
		const obj1 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: null
		}
		const obj2 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: null
		}
		expect(isValueEqual(obj1, obj2)).toBe(true)
	})

	it('should object value not be equal', () => {
		const obj1 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: null
		}
		const obj2 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: undefined
		}
		expect(isValueEqual(obj1, obj2)).toBe(false)
	})

	it('should object nested value be equal', () => {
		const obj1 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: {
				x: 123,
				y: [1, 2, 3],
				z: {
					q: false,
					w: true,
					e: 'xyz',
					r: []
				}
			}
		}
		const obj2 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: {
				x: 123,
				y: [1, 2, 3],
				z: {
					q: false,
					w: true,
					e: 'xyz',
					r: []
				}
			}
		}
		expect(isValueEqual(obj1, obj2)).toBe(true)
	})

	it('should object nested value not be equal', () => {
		const obj1 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: {
				x: 123,
				y: [1, 2, 3],
				z: {
					q: false,
					w: true,
					e: 'xyz',
					r: []
				}
			}
		}
		const obj2 = {
			a: false,
			b: 123,
			c: 'xyz',
			d: {
				x: 123,
				y: [1, 2, 3],
				z: {
					q: false,
					w: true,
					e: 'xyz',
					r: ['diff']
				}
			}
		}
		expect(isValueEqual(obj1, obj2)).toBe(false)
	})
})

describe('special situation', () => {
	it('should NaN native not be equal', () => {
		expect(NaN === NaN).toBe(false)
		expect(NaN == NaN).toBe(false)
	})

	it('should NaN value be equal', () => {
		expect(isValueEqual(NaN, NaN)).toBe(true)
	})
})
