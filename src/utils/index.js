export const getToken = () => {
    return localStorage.getItem('token') || ''
}

export const uuid = () => {
    return Math.random().toString(36).substr(-8)
}

export const isOverlap = (a = [], b = [], allowEmpty = false) => {
    if (allowEmpty && (!a.length || !b.length)) return false
    let map = a.reduce((r, i) => (r[i] = true, r), {})
    return b.some(i => map[i])
}