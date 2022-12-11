import VueRouter from "vue-router"

import Main from '../pages/Main.vue'
import User from '../pages/User.vue'
import Home from '../pages/Home.vue'
import Mall from '../pages/Mall.vue'
// import Page1 from '../pages/Page1.vue'
// import Page2 from '../pages/Page2.vue'

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            name:'Main',
            path:'/',
            component:Main,
            children:[
                // {
                //     name:'Home',
                //     path:'/home',
                //     component:Home,
                // },
                // {
                //     name:'User',
                //     path:'/user',
                //     component:User,
                // },
                // {
                //     name:'Mall',
                //     path:'/mall',
                //     component:Mall
                // },
                // {
                //     name:'Page1',
                //     path:'/page1',
                //     component:() => import('../pages/Page1.vue')
                // },
                // {
                //     name:'Page2',
                //     path:'/page2',
                //     component:() => import('../pages/Page2.vue')
                // },
            ]
        },
        {
            name:'Login',
            path:'/login',
            component:() => import('../pages/Login.vue')
        }
    ]
})

export default router