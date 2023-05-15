

const USERINFO = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
const TOKEN = localStorage.getItem('token')

import { logout, login as userLogin } from "@/api/user.js"
const state = {
    userInfo: USERINFO || {},
    token: TOKEN || '',
}

const getters = {
    userInfo: state => state.userInfo,
    token: state => state.token,
    permissions: state => {
        if (!state.userInfo || !state.userInfo.permissions) return []
        if (state.userInfo.root) return ['*'];
        return state.userInfo.permissions
    }
}

const mutations = {
    // 设置用户信息
    SET_USERINFO(state, info) {
        const userInfo = Object.assign({}, info || {})
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        state.userInfo = userInfo
    },
    SET_TOKEN(state, token) {
        state.token = token
        localStorage.setItem('token', token)
    },
    UPDATE_USERINFO(state, info) {
        if (typeof info == 'object') {
            state.userInfo = Object.assign({}, state.userInfo, info)
        }
    }
}

const actions = {
    setUserInfo({ commit }, info) {
        commit('SET_USERINFO', info)
        commit('SET_TOKEN', info.token || '')
    },
    login({ commit, dispatch }, params) {
        return new Promise((r, j) => {
            userLogin(params).then(res => {
                commit('SET_USERINFO', res)
                commit('SET_TOKEN', res.token || '')
                r(res)
            }).catch(err => {
                j(err)
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(_ => {
                commit('SET_USERINFO', {})
                commit('SET_TOKEN', '')
                return resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}