export const EleIndexOf = (el) =>{
    const index = [].indexOf.call(el.parentElement.children, el);
    return index
}