import config from '@/config'
const avatar = (el, binding) => {
  if (el) {
    const src = el.getAttribute('src')
    if (src && !src.startsWith('http')) {
      el.setAttribute('src', config.baseUrl + src)
    }
    if (!src) {
      el.setAttribute('src', 'https://img1.baidu.com/it/u=2837540877,4216710974&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')
    }
    el.style.background = '#eee'
  }
}

export default avatar
