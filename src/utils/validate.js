export const isMobile = (mobile) =>{
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)
}

export const isPassword = (password) =>{
    return /^(\w){6,20}$/.test(password)
}

export const isNickname = nickname =>{
    return /^[\u4E00-\u9FA5\uF900-\uFA2D|\w]{3,10}$/.test(nickname)
}

export const isPrice = price =>{
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(price)
}