import { forEach, map, reduce } from '.'

describe('array', () => {
	it('map', () => {
		expect(map([1, 2, 3, 4], String)).toEqual(['1', '2', '3', '4'])

		expect(map([1, 2, 3, 4], item => 2 * item)).toEqual([2, 4, 6, 8])

		expect(map(['q', 'w', 'e', 'r'], (_item, index) => index)).toEqual([0, 1, 2, 3])
	})

	it('forEach', () => {
		let sum = 0
		forEach([1, 2, 3, 4], item => {
			sum += item
		})
		expect(sum).toBe(10)
	})

	it('reduce', () => {
		expect(reduce([1, 2, 3, 4], (pre, cur) => pre + cur, 0)).toBe(10)

		expect(reduce(['w', 'e', 'r'], (pre, cur) => `${pre}${cur}`, 'q')).toBe('qwer')
	})
})
