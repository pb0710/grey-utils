import is from '.'

describe('object', () => {
	it('null is not object', () => {
		expect(is.object(null)).toBe(false)
	})
	it('[] is not object', () => {
		expect(is.object([1, 2, 3])).toBe(false)
	})
	it('function is not object', () => {
		expect(is.object((a: number, b: number) => a + b)).toBe(false)
	})
	it('{} is object', () => {
		expect(is.object({})).toBe(false)
	})
	it('Object is object', () => {
		expect(is.object(Object.create(null))).toBe(false)
	})
})
