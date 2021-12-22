import { removeSubset } from './utils'

describe('utils', () => {
	describe('removeSubset', () => {
		it('removes fields from superset', () => {
			const superset = ['a', 'b']
			const subset = ['b']
			const expectedResult = ['a']

			const actualResult = removeSubset(superset, subset)
			expect(actualResult).toEqual(expectedResult)
		})

		it('removes all fields from superset', () => {
			const superset = ['a', 'b']
			const subset = ['a', 'b']
			const expectedResult = []

			const actualResult = removeSubset(superset, subset)
			expect(actualResult).toEqual(expectedResult)
		})
	})
})
