import LoginPage from './components/administration/authentication/Login'
import MainPage from './components/administration/mainPage'
import RegisterPage from './components/administration/authentication/Register'
import Logout from './components/administration/authentication/Logout'

import Category from './components/administration/category/index'

import Product from './components/administration/product/index'
import ProductForm from './components/administration/product/form'

const routes = [
  //----------------------------------Registro y login-----------------------------------------
  {path: '/login', component : LoginPage, name:'login', props:true, meta:{visitor:true}},
  {path: '/register', component : RegisterPage, name:'register', meta:{visitor:true}},
  {path: '/logout', component : Logout, name:'logout', meta:{requiresAuth:true}},
  //----------------------------------Main Page-----------------------------------------
  {path: '/mainpage', component:MainPage, name:'mainPage', meta:{requiresAuth:true}},
  //-----------------------------------Category-----------------------------------------
  {path: '/category', component:Category, name:'mainCategory', meta:{requiresAuth:true}},
  //-----------------------------------Product-----------------------------------------
  {path: '/product', component:Product, name:'mainProduct', meta:{requiresAuth:true}},
  {path: '/product/create', component:ProductForm, name:'createProduct', meta:{requiresAuth:true}},
  {path: '/product/:id/edit', component:ProductForm, name: 'editProduct', meta: {requiresAuth:true, mode: 'edit'}},
  //-----------------------------------Attribute-----------------------------------------

]


export default routes
