import LoginPage from './components/administration/authentication/Login'
import MainPage from './components/administration/mainPage'
import RegisterPage from './components/administration/authentication/Register'
import Logout from './components/administration/authentication/Logout'
import Category from './components/administration/category/index'

const routes = [
  {
    path: '/login',
    component : LoginPage,
    name:'login',
    props:true,
    meta:{
      visitor:true
    }
  },
  {
    path: '/register',
    component : RegisterPage,
    name:'register',
    meta:{
      visitor:true
    }
  },
  {
    path: '/logout',
    component : Logout,
    name:'logout',
    meta:{
      requiresAuth:true
    }

  },
  {
    path: '/mainpage',
    component:MainPage,
    name:'mainpage',
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/category',
    component:Category,
    name:'category',
    meta:{
      requiresAuth:true
    }
  }

]


export default routes
