import axios from 'axios'
import {categoryUrl} from '../../packages/config'

const state = {
  categories :[],
  CheckedCategoryIds:[],
}

const getters={
  getCategory(state) {
    return state.categories
  },

  getsize(){
    return state.CheckedCategoryIds.length
  }
}

const mutations = {
  retrieveCategory(state, allCategory) {
    state.categories = allCategory
  },

  checkedCategory(state,idCategory){
    state.CheckedCategoryIds.push(
       idCategory
    )
  },

  unCheckedCategory(state, idCategory){
    const index = state.CheckedCategoryIds.findIndex(item => item.id == idCategory)
    state.CheckedCategoryIds.splice(index, 1)
  },

  addCategorySubmit(state, Categories){
    state.categories = Categories
  },

  deleteCategory(state, idCategory){
    const index = state.categories.findIndex(item => item.id == idCategory)
    state.categories.splice(index, 1)
    state.CheckedCategoryIds=[]
  },

}

const actions = {
    retrieveCategory (context){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get(categoryUrl)
        .then(response => {
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

          if (state.CheckedCategoryIds.length <1){
            context.commit('checkedCategory', response.data)

          }
          else{
            // state.CheckedCategoryIds.forEach(todo => (todo.completed = checked))
            for(is in state.CheckedCategoryIds){
              console.log('element: '+is)
            }
            // state.CheckedCategoryIds.forEach(element => {
            //
            //   if (response.parent_id == element.parent_id){
            //     context.commit('checkedCategory', response.data)
            //   }else{

            //   }
            // });

            resolve(response)

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
        parent_id: 0,
      })
      .then(response => {
        axios.get(categoryUrl)
        .then(response => {
          context.commit('addCategorySubmit', response.data)
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    },

    addParentSubmit(context, data){
      const CategoryIds = state.CheckedCategoryIds
      // console.log(categoryUrl)
      axios.post(categoryUrl,
      {
          categoriesIds: CategoryIds,
          name: data.name
      })
        .then(response => {
          console.log(response)
          // context.commit('clearCompleted')
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteCategory(context){
      const idCategory = state.CheckedCategoryIds
      axios.delete(categoryUrl + idCategory)
        .then(response => {
          context.commit('deleteCategory', idCategory)
        })
        .catch(error => {
          console.log(error)
        })
    }
}


export default{
  state, getters, mutations, actions
}
