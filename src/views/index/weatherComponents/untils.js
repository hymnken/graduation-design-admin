// 转换url
export function getImageUrl(name) {
  return require(`@/assets/images/icon/${name}.png`).default
}

// 转换周
export function getFormatWeek(day) {
  const dateObject = new Date(day)

  let week = ''
  switch (dateObject.getDay()) {
    case 0:
      week = '周日'
      break
    case 1:
      week = '周一'
      break
    case 2:
      week = '周二'
      break
    case 3:
      week = '周三'
      break
    case 4:
      week = '周四'
      break
    case 5:
      week = '周五'
      break
    case 6:
      week = '周六'
      break
  }

  return week
}
