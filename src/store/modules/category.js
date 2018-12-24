import axios from 'axios'
import {categoryUrl,addParent} from '../../packages/config'

const state = {
  categories :[],
  checkedCategories:[],
  firstParentId:''
}

const getters={
  getCategory(state) {
    return state.categories
  },

  getsize(){
    return state.checkedCategories.length
  }
}

const mutations = {
  retrieveCategory(state, allCategory) {
    state.categories = allCategory
  },

  checkedCategory(state,idCategory){
    state.checkedCategories.push(
       idCategory
    )
    state.firstParentId = idCategory.parent_id
  },

  unCheckedCategory(state, idCategory){
    const index = state.checkedCategories.findIndex(item =>  item.id == idCategory)
    // console.log('index: ', index)
    if(index >= 0){
      state.checkedCategories.splice(index, 1)
    }
    if(state.checkedCategories.length==0){
      state.firstParentId = ''
    }
  },

  addCategorySubmit(state, Categories){
    state.categories = Categories
},

  addParentSubmit(state, Categories){
    state.categories = Categories
    state.checkedCategories = []
    state.firstParentId = ''
  },

  addChildrenSubmit(state, Categories){
    state.categories = Categories
    state.checkedCategories = []
    state.firstParentId = ''
  },

  deleteCategory(state, Categories){
    // const index = state.categories.findIndex(item => item.id == idCategory)
    // if(index >= 0){
    //   state.categories.splice(index, 1)
    //   state.checkedCategories=[]
    // }
    state.categories = Categories
    state.checkedCategories = []
    state.firstParentId = ''
  },

}

const actions = {
    retrieveCategory (context){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get(categoryUrl)
        .then(response => {
          console.log(response.data)
          context.commit('retrieveCategory', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    checkedCategory(context,id){
      return new Promise((resolve, reject) => {
        axios.get(categoryUrl +'/'+id)
        .then(response=>{
          if (state.checkedCategories.length <1){
            context.commit('checkedCategory', response.data)
          }
          else{
            if(state.firstParentId === response.data.parent_id){
              context.commit('checkedCategory', response.data)
              resolve(response)
            }else{
              resolve(false)
            }
          }
        })
        .catch(error =>{
          console.log(error)
          reject(error)
        })
      })
      // context.commit('checkedCategory', id)
    },

    verifyCheckCategory(){

    },

    unCheckedCategory(context, id) {
      context.commit('unCheckedCategory', id)
    },

    addCategorySubmit(context,data){
      axios.post(categoryUrl, {
        name: data.name,
        parent_id: data.parent_id,
      })
      .then(response => {
        context.commit('addCategorySubmit', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    addParentSubmit(context, data){
      const checkedCategories = context.state.checkedCategories
      const parent_id = state.firstParentId
      // console.log(checkedCategories)
      axios.post(addParent,
      {
          checkedCategories: checkedCategories,
          name: data.name,
          parent_id:parent_id,
      })
        .then(response => {
          // console.log(response)
          context.commit('addParentSubmit',response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    addChildrenSubmit(context, data){
      const checkedCategories = context.state.checkedCategories
      // console.log(checkedCategories)
      axios.post(categoryUrl,
      {
          name: data.name,
          parent_id:checkedCategories[0].id,
      })
        .then(response => {
          // console.log(response)
          context.commit('addChildrenSubmit',response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteCategory(context){
      const checkedCategories = context.state.checkedCategories
      axios.delete(categoryUrl +'/'+ checkedCategories[0].id)
        .then(response => {
          context.commit('deleteCategory', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
}


export default{
  state, getters, mutations, actions
}
