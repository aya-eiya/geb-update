export const isNumber = (a) => typeof value === 'number' && isFinite(a)
export default {
  eq: (a, b) => a === b,
  checkRels: (rels, noData) => {
    if(rels === undefined) return noData
    if(!Array.isArray(rels)) return noData
    return true
  },
  checkRel: (one, noData) => one !== undefined || noData,
}
