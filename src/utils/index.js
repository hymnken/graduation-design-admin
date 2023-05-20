// getToken 函数用于获取存储在本地存储（localStorage）中的 token 值，如果没有找到则返回空字符串。
// uuid 函数生成一个随机的短唯一标识符（UUID），使用 Math.random() 生成一个随机数，并将其转换为36进制字符串，然后截取后8位作为标识符。
// isOverlap 函数用于判断两个数组是否存在重叠元素。参数 a 和 b 分别表示两个数组，allowEmpty 表示是否允许数组为空（默认为 false）。
// 函数首先创建一个映射对象 map，将数组 a 中的元素作为键存储在映射对象中。然后通过遍历数组 b，判断其中是否存在任何一个元素在 map 中存在，
// 如果存在则返回 true，表示存在重叠元素；否则返回 false，
// 表示不存在重叠元素。如果 allowEmpty 为 true，并且数组 a 或数组 b 为空，则直接返回 false，表示不存在重叠元素。

export const getToken = () => {
  return localStorage.getItem('token') || ''
}

export const uuid = () => {
  return Math.random().toString(36).substr(-8)
}

export const isOverlap = (a = [], b = [], allowEmpty = false) => {
  if (allowEmpty && (!a.length || !b.length)) return false
  let map = a.reduce((r, i) => ((r[i] = true), r), {})
  return b.some((i) => map[i])
}
