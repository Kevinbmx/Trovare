export const apiDomain = 'http://webtrovare.test:8000/'
//---------------------AUTH--------------------------
export const loginUrl =  apiDomain + 'oauth/token'
export const userUrl = apiDomain + 'api/user'
export const loginUrlCustom = apiDomain + 'api/login'
export const logoutUrl = apiDomain + 'api/logout'
export const registertUrl = apiDomain + 'api/register'
//----------------------------------------------------
//-------------------CATEGORY-------------------------
export const categoryUrl = apiDomain + 'api/category'
// export const categorByIdyUrl = apiDomain + 'api/CategoryById'


// export const addCategoryUrl = apiDomain + 'api/category'
// export const deleteCategoryUrl = apiDomain + 'api/category/'
// export const CategoryByIdUrl = apiDomain + 'api/category'


//----------------------------------------------------
export const getHeader = function (){
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers ={
    'accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.access_token
  }
return headers
}