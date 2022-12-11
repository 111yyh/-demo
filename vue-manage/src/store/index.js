import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import router from '../router'

Vue.use(Vuex)

const actions = {

}
const mutations = {
    collapseMenu(state){
        state.isCollapse = !state.isCollapse
    },
    selectMenu(state,value){
        if(value.name !== 'Home'){
            state.currentMenu = value
            const result = state.tabsList.findIndex(item => item.name === value.name)
            if (result === -1) {
                state.tabsList.push(value)
            }
        }else {
            state.currentMenu = null
        }
    },
    closeTag(state,value){
        const result = state.tabsList.findIndex(item => item.name === value.name)
        state.tabsList.splice(result,1)
    },
    setToken(state,value){
        state.token = value
        Cookie.set('token',value)
    },
    clearToken(state){
        state.token = ''
        Cookie.remove('token')
    },
    getToken(state){
        state.token = state.token || Cookie.get('token')
    },
    setMenu(state, value){
        state.menu = value
        Cookie.set('menu', JSON.stringify(value))
    },
    clearMenu(state){
        state.menu = ''
        Cookie.remove('menu')
    },
    addMenu(state){
        if (!Cookie.get('menu')) {
            return
        }
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu
        const menuArray = []
        menu.forEach(item => {
            if (item.children) {
                item.children = item.children.map(item => {
                    item.component = () => import(`../pages/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            } else {
                item.component = () => import(`../pages/${item.url}`)
                menuArray.push(item)
            }
        })
        //路由的动态添加
        menuArray.forEach(item => {
            router.addRoute('Main',item)
        })
    }
}
const state = {
    isCollapse:false,
    tabsList:[
        {
            path:'/home',
            name:'Home',
            label:'首页',
            icon:'home'
        }
    ],
    currentMenu:null,
    menu:[],
    token:'',
}
const getters = {

}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})