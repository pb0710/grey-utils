import { join } from '.'

describe('path join', () => {
	it('a,b,c => /a/b/c', () => {
		expect(join('a', 'b', 'c')).toBe('/a/b/c')
	})
	it('abc,xyz => /abc/xyz', () => {
		expect(join('abc', 'xyz')).toBe('/abc/xyz')
	})
	it('/q,w/,e,/r => /q/w/e/r', () => {
		expect(join('/q', 'w/', 'e', '/r')).toBe('/q/w/e/r')
	})
	it('/ab/c,x/y,z/ => /ab/c/x/y/z', () => {
		expect(join('/ab/c', 'x/y', 'z/')).toBe('/ab/c/x/y/z')
	})
})
