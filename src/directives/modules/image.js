import config from "@/config"
const image =  (el, binding) =>{
    if(el){
        const src = el.getAttribute('src')
        if(src && !src.startsWith('http')){
            el.setAttribute('src',config.baseUrl +'/'+ src)
        }
    }
}

export default image