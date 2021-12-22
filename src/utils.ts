export const removeSubset = (sup: string[], sub: string[]) => {
	const toRemove = new Set(sub)
	const result = sup.filter((str) => !toRemove.has(str))

	return result
}
