export const apiDomain = 'http://webtrovare.test/'
//---------------------AUTH--------------------------
export const loginUrl =  apiDomain + 'oauth/token'
export const userUrl = apiDomain + 'api/user'
export const loginUrlCustom = apiDomain + 'api/login'
export const logoutUrl = apiDomain + 'api/logout'
export const registertUrl = apiDomain + 'api/register'
//----------------------------------------------------
//-------------------CATEGORY-------------------------
export const categoryUrl = apiDomain + 'api/category'
export const addParent = apiDomain + 'api/addParent'
//----------------------------------------------------
//-------------------PRODUCT-------------------------
export const productUrl = apiDomain + 'api/product'
//-------------------ATTRIBUTE-------------------------
export const attributeUrl = apiDomain + 'api/attribute'
//-------------------VALUE-------------------------
export const valueUrl = apiDomain + 'api/value'
//----------------ATTRIBUTE-VALUE-------------------------
export const attributeValueUrl = apiDomain + 'api/attributeValue'

//----------------BLENDATTRIBUTEVALUE-------------------------
export const blendAttributeValueUrl = apiDomain + 'api/blendAttributeValue'

//-------------------STATUS-PRODUCT-----------------------
export const statusProductUrl = apiDomain + 'api/statusProduct'


//----------------------------------------------------
export const getHeader = function (){
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers ={
    'accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.access_token
  }
return headers
}
