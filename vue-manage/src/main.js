import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import http from 'axios'
import '../api/mock'

Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.use(ElementUI)
Vue.use(VueRouter)

router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.token
  if (!token && to.name !== 'Login') {
    next({name:'Login'})
  } else if (token && to.name === 'login') {
    next({name:'Home'})
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
