// sort array of objects by id
export const sortById = (arr) => arr.sort((a, b) => Number(a.id) - Number(b.id))