function delay<T>(duration = 0, value: T): Promise<T> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value)
		}, duration)
	})
}

function getCurrentTime(): number {
	return new Date().getTime()
}
function getTimeDiff(start: number, end: number): number {
	return Math.round((end - start) / 100)
}
async function duration(callback: () => void): Promise<number> {
	const start = getCurrentTime()
	await callback() // 兼容 async callback
	const end = getCurrentTime()
	return getTimeDiff(start, end)
}

async function continuously<T>(taskList: (() => Promise<T>)[]): Promise<T[]> {
	const results = []
	for (const task of taskList) {
		const res = await task()
		results.push(res)
	}
	return results
}

function continuouslyWithoutAsync<T>(taskList: (() => Promise<T>)[], results: T[] = []): Promise<T[]> {
	const taskListClone = taskList.slice()
	const task = taskListClone.shift()
	return task
		? task().then(res => continuouslyWithoutAsync(taskListClone, [...results, res]))
		: Promise.resolve(results)
}

describe('promise', () => {
	it('reduce', async () => {
		delay(1000, 2).then(res => {
			expect(res).toBe(2)
		})
	})
})

describe('iterator', () => {
	const iterable: Iterable<number> = {
		*[Symbol.iterator]() {
			yield 1
			yield 2
			yield 3
		}
	}
	function* gen() {
		yield 1
		yield 2
		yield 3
	}
	it('should iterable', () => {
		expect([...iterable]).toEqual([1, 2, 3])
		let acc = 0
		for (const i of gen()) {
			expect(typeof i).toBe('number')
			acc += i
		}
		expect(acc).toBe(6)
	})
})

describe('for await of', () => {
	it('should iterate promise', () => {
		const taskList = [delay(100, 1), delay(200, 2), delay(300, 3)]

		expect(
			duration(async () => {
				for await (const task of taskList) {
					expect([1, 2, 3].includes(task)).toBe(true)
				}
			})
		).resolves.toBe(3) // 3
	})

	it('without await', () => {
		const taskList = [delay(100, 1), delay(200, 2), delay(300, 3)]

		expect(
			duration(async () => {
				for (const task of taskList) {
					expect([1, 2, 3].includes(await task)).toBe(true)
				}
			})
		).resolves.toBe(3) // 3
	})

	it('use fn', () => {
		const taskFnList = [() => delay(100, 1), () => delay(200, 2), () => delay(300, 3)]

		expect(
			duration(async () => {
				for (const task of taskFnList) {
					const res = await task()
					expect([1, 2, 3].includes(res)).toBe(true)
				}
			})
		).resolves.toBe(6) // 6
	})
})

describe('functional', () => {
	it('should continuously', async () => {
		const taskList = [() => delay(100, 1), () => delay(200, 2), () => delay(300, 3)]
		const _start = getCurrentTime()
		const results = await continuously(taskList)
		const _end = getCurrentTime()

		expect(getTimeDiff(_start, _end)).toBe(6) // 6
		expect(results).toEqual([1, 2, 3]) // [1,2,3]
	})

	it('should continuously without async', async () => {
		const taskList = [() => delay(100, 1), () => delay(200, 2), () => delay(300, 3)]
		const _start = getCurrentTime()
		const results = await continuouslyWithoutAsync(taskList)
		const _end = getCurrentTime()

		expect(getTimeDiff(_start, _end)).toBe(6) // 6
		expect(results).toEqual([1, 2, 3]) // [1,2,3]
	})
})
