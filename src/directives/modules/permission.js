import store from "../../store"
import { isOverlap } from "@/utils"
const permission = (el, binding) => {
    if (el) {
        let allows = binding.value
        if (!Array.isArray(allows)) {
            el.parentNode && el.parentNode.removeChild(el)
        } else {
            const userPermissions = store.getters['user/permissions'] || []
            if (!userPermissions.includes('*')) {
                if (!isOverlap(allows, userPermissions)) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        }
    }
}

export default permission