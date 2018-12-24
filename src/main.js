import Vue from 'vue'
import vueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store/store'
import routes from './routes'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2';

import CxltToastr from 'cxlt-vue2-toastr'
import Vuelidate from 'vuelidate'


const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

import App from './App'
// import LoginPage from './components/administration/authentication/Login'
// import MainPage from './components/administration/mainPage'
// import RegisterPage from './components/administration/authentication/Register'
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(vueRouter)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueSweetalert2);
Vue.use(Vuelidate)

Vue.use(CxltToastr, toastrConfigs)
Vue.component('app',App)

// Vue.use(jQuery)
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

// const routes = [
//   {
//     path: '/',
//     component : LoginPage,
//     name:'login',
//     meta:{
//       visitor:true
//     }
//   },
//   {
//     path: '/register',
//     component : RegisterPage,
//     name:'register',
//     meta:{
//       visitor:true
//     }
//   },
//   {
//     path: '/mainpage',
//     component:MainPage,
//     name:'mainpage',
//     meta:{
//       requiresAuth:true
//     }
//   } {
//     path: '/mainpage',
//     component:MainPage,
//     name:'mainpage',
//     meta:{
//       requiresAuth:true
//     }
//   }

// ]

const router = new VueRouter({
  mode:'history',
  routes
})

// router.beforeEach((to,from,next)=>{
//   if(to.matched.some(record => record.meta.visitor)) {
//     // console.log(authUser.access_token)
//     if (store.getters.loggedIn) {
//       next({name:'mainpage'})
//     } else {
//       next()
//     }
//   }
//    else if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.loggedIn) {
//       next()
//     } else {
//       // next({name:'login'})
//       // next();
//       next({
//         name: 'login',
//       })
//     }
//   }else{
//     next()
//   }

// })
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'mainpage',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.directive('click-outside', {
  bind: function(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }
      
      console.warn(warn)
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },
  
  unbind: function(el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null

  }
})
export const strict = false
new Vue({
  router: router,
  store: store,
}).$mount('#app')
