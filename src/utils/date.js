import dayjs from 'dayjs'

export const dateFormat = (date,flag) =>{
    if(flag){
        return dayjs.unix(date).format('YYYY-MM-DD HH:mm:ss')
    }else{
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
}