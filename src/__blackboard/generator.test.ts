describe('generator', () => {
	it('should iterable', () => {
		function* gen() {
			yield 1
			yield 2
			yield 3
		}

		const results = []
		for (const i of gen()) {
			results.push(i)
		}
		expect(results).toEqual([1, 2, 3])
	})

	it('should controllable', () => {
		function* gen() {
			yield 1
			yield 2
			yield 3
			return []
		}
		const i = gen()
		const res1 = i.next()
		expect(res1.done).toBe(false)
		expect(res1.value).toBe(1)

		const res2 = i.next()
		expect(res2.done).toBe(false)
		expect(res2.value).toBe(2)

		const res3 = i.next()
		expect(res3.done).toBe(false)
		expect(res3.value).toBe(3)

		const res4 = i.next()
		expect(res4.done).toBe(true)
		expect(res4.value).toEqual([])
	})

	it('should execute order', () => {
		let count = 0
		function* gen() {
			expect(++count).toBe(2)
			yield 1
			expect(++count).toBe(4)
			yield 2
			expect(++count).toBe(6)
			yield 3
		}
		const i = gen()
		expect(++count).toBe(1)
		i.next()
		expect(++count).toBe(3)
		i.next()
		expect(++count).toBe(5)
		i.next()
		expect(++count).toBe(7)
	})
})
