import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';
import {productUrl,attributeUrl,valueUrl,attributeValueUrl,blendAttributeValueUrl} from '../../packages/config'

const strict = true
const state = {
    // interval : null,
    // vari:[],
    productObj:{
        generateUuid:'',
        id:'',
        name: 'casco fly modelo gpdf year 2015',
        modelo: 'gpdf',
        quantity:2,
        brand:'fly',
        price:300.5,
        // category_id:['2'],
        category_id:null,
        peso:10,
        alto:10,
        ancho:25,
        fondo:25,
        parent_id:0,
        estado_id:0,
        statusProduct_id:null
        // uniqueCode:'',
    },
    variantes:[
        {
          attributeId:'',
          attributeIdGenerate:'',
          attributeName:'color',
          value:[{
            id:'',
            valueId:'',
            valueName:'rojo'
          },
          ]
        }],
    attribute:[],
    value:[],
    attributeValue:[],
    blendAttributeValue:[],
    arrayPossibleProduct:[],
    valueOfDataBase:[]
}

const getters={
    getField,
    filterValueByName: state => name => state.valueOfDataBase.filter(value => value.name === name),
 
}

const mutations = {
    updateField,

    //------------llenado de producto------------
    generateUuid(state,AddProductObj){
        state.productObj.generateUuid = AddProductObj
    },
    NameProduct (state, AddProductObj) {
        state.productObj.name = AddProductObj
    },
    modeloProduct (state, AddProductObj) {
        state.productObj.modelo = AddProductObj
    },
    quantityProduct (state, AddProductObj) {
        state.productObj.quantity = AddProductObj
    },
    brandProduct (state, AddProductObj) {
        state.productObj.brand = AddProductObj
    },
    priceProduct (state, AddProductObj) {
        state.productObj.price = AddProductObj
    },
    category_idProduct (state, AddProductObj) {
        state.productObj.category_id = AddProductObj
    },
    pesoProduct (state, AddProductObj) {
        state.productObj.peso = AddProductObj
    },
    altoProduct (state, AddProductObj) {
        state.productObj.alto = AddProductObj
    },
    anchoProduct (state, AddProductObj) {
        state.productObj.ancho = AddProductObj
    },
    fondoProduct (state, AddProductObj) {
        state.productObj.fondo = AddProductObj
    },
    parent_idProduct (state, AddProductObj) {
        state.productObj.parent_id = AddProductObj
    },
    //------------------------------------------
    //---------------possible variante------------------
    // updateVariantes(state,  )

    confirmPossibleProduct(state,product){
        state.arrayPossibleProduct = product
    },

    addAttribute(state,attribute){
        state.attribute = attribute
    },
    
    addValue(state,value){
        state.value = value
    },

    addAttributeValue(state,attributeValue){
        state.attributeValue = attributeValue
    },

    addBlendAttributeValue(state,blendAttributeValue){
        state.blendAttributeValue = blendAttributeValue
    },
    //creando en la base de datos
    addProductSubmit(state,response){
        console.log(response)
        state.productObj.id = response.objProduct.id
        // state.productObj.category_id = response.category_id
        state.productObj.generateUuid = response.objProduct.uniqueCode
    },
    addAttributeSubmit(state, response){
        state.attribute[response.indexAttribute].id = response.idAttribute
    },
    addValueSubmit(state, response){
        state.value[response.indexValue].id = response.idValue
    },

    //a;adiendo al getter de value of data base

    getterValueOfDataBase(state, response){
        state.valueOfDataBase = response
    },


    
    addAttributeValueSubmit(state,objAttributeVaule){
        state.attributeValue[objAttributeVaule.indexAttributeValue][objAttributeVaule.index].id = objAttributeVaule.id
    },
    addPosibleProductSubmit(state,response){
        state.arrayPossibleProduct[response.index].id = response.id
    },
}

const actions = {
    confirmPossibleProduct (context,possiProduct){
        context.commit('confirmPossibleProduct', possiProduct)
    },
    addAttribute(context,attribute){
        context.commit('addAttribute', attribute)
    },

    addValue(context,value){
        context.commit('addValue', value)
    },

    addAttributeValue(context,attributeValue){
        context.commit('addAttributeValue', attributeValue)
    },

    addBlendAttributeValue(context,blendAttributeValue){
        context.commit('addBlendAttributeValue', blendAttributeValue)
    },
    //a;adiendo al getter de value of data base

    getterValueOfDataBase(context){
        axios.get(valueUrl)
        .then(response => {
          console.log('value',response.data)
          context.commit('getterValueOfDataBase', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        
    },
    //creando en la base de datos
    async addProductSubmit(context,auth){
        console.log(auth)
        try{
            const data = state.productObj
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth
            let response = await axios.post(productUrl, {
              name:             data.name,
              modelo:           data.modelo,
              quantity:         data.quantity,
              brand:            data.brand,
              price:            data.price,
              category_id:      data.category_id,
              peso:             data.peso,
              alto:             data.alto,
              ancho:            data.ancho,
              fondo:            data.fondo,
              parent_id:        0,
              statusProduct_id: null,
            })
                console.log(response.data)
                context.commit('addProductSubmit', response.data)
        }catch(ex){
          console.log(ex)
        }
      },
    async addAttributeSubmit(context){
        for (let index = 0; index < state.attribute.length; index++) {
            try{
                let response = await axios.post(attributeUrl,{
                    name: state.attribute[index].name
                })
                let obj = {
                    idAttribute : response.data.AttributeId,
                    indexAttribute : index 
                }
                context.commit('addAttributeSubmit', obj)
            }
            catch(ex){
                // return 
              console.log(ex)
            }
        }
    },
    async addValueSubmit(context){
        for (let index = 0; index < state.value.length; index++) {
            try{
                let response = await axios.post(valueUrl,{
                    value: state.value[index].value
                })
                let objValue = {
                    idValue : response.data.valueId,
                    indexValue : index 
                }
                context.commit('addValueSubmit', objValue)
            }
            catch(ex){
                // return 
              console.log(ex)
            }
        }
    },
    async addAttributeValueSubmit(context){
        if(state.attributeValue.length==2){
            const attributeValor1 = state.attributeValue[0]
            const attributeValor2 = state.attributeValue[1]
            for (let x = 0; x < attributeValor1.length; x++) {
                try{
                    const objAttribute =  state.attribute.find(item => item.idGenerate ===attributeValor1[x].idGenerateAttribute)
                    const objValue =state.value.find(item => item.idGenerate ===attributeValor1[x].idGenerateValue)
                    let response = await axios.post(attributeValueUrl, {
                            attribute_id:objAttribute.id,
                            value_id:objValue.id
                        })
                        let objAttributeVaule = {
                            indexAttributeValue: 0,
                            index : x,
                            id: response.data.attributeValueId
                        }
                        console.log(response.data)
                        context.commit('addAttributeValueSubmit', objAttributeVaule)
                }
                catch(ex){
                    // return 
                  console.log(ex)
                }
            }
            for (let x = 0; x < attributeValor2.length; x++) {
                try{
                    const objAttribute =  state.attribute.find(item => item.idGenerate ===attributeValor1[x].idGenerateAttribute)
                    const objValue =state.value.find(item => item.idGenerate ===attributeValor1[x].idGenerateValue)
                    let response = await axios.post(attributeValueUrl, {
                            attribute_id:objAttribute.id,
                            value_id:objValue.id
                        })
                        let objAttributeVaule = {
                            indexAttributeValue: 1,
                            index : x,
                            id: response.data.attributeValueId
                        }
                        console.log(response.data)
                        context.commit('addAttributeValueSubmit', objAttributeVaule)
                }
                catch(ex){
                    // return 
                  console.log(ex)
                }
            }
        }else{
            const attributeValor1 = state.attributeValue[0]
            for (let x = 0; x < attributeValor1.length; x++) {
                const objAttribute = state.attribute.find(item => item.idGenerate === attributeValor1[x].idGenerateAttribute)
                const objValue = state.value.find(item => item.idGenerate === attributeValor1[x].idGenerateValue)
                try{
                    let response = await axios.post(attributeValueUrl, {
                        attribute_id : objAttribute.id,
                        value_id : objValue.id 
                    })
                    let objAttributeVaule = {
                        indexAttributeValue: 0,
                        index : x,
                        id: response.data.attributeValueId
                    }
                    // console.log(response.data)
                    context.commit('addAttributeValueSubmit', objAttributeVaule)
                }
                catch(ex){
                    // return 
                  console.log(ex)
                }
           
            }
        }
    },
    async addPosibleProductSubmit(context,auth){
        const data = state.productObj
        console.log('add posible product',state.arrayPossibleProduct)
        for (let index = 0; index < state.arrayPossibleProduct.length; index++) {
          try{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth
              let response = await axios.post(productUrl, {
                  name:             state.arrayPossibleProduct[index].name,
                  modelo:           state.arrayPossibleProduct[index].modelo,
                  quantity:         state.arrayPossibleProduct[index].quantity,
                  brand:            state.arrayPossibleProduct[index].brand,
                  price:            state.arrayPossibleProduct[index].price,
                  category_id:      state.arrayPossibleProduct[index].category_id,
                  peso:             state.arrayPossibleProduct[index].peso,
                  alto:             state.arrayPossibleProduct[index].alto,
                  ancho:            state.arrayPossibleProduct[index].ancho,
                  fondo:            state.arrayPossibleProduct[index].fondo,
                  parent_id:        data.id,
                  statusProduct_id: state.arrayPossibleProduct[index].statusProduct_id,
                })
                let objPosibleProducto = {
                    index : index,
                    id: response.data.objProduct.id
                }
                context.commit('addPosibleProductSubmit', objPosibleProducto)
                // console.log(response.data.objProduct.name)
          }catch(ex){
            console.log(ex)
          }
        }
    },
    async addBlendAttributeValueSubmit(context){
        // console.log(state.blendAttributeValue)
        for (let x = 0; x < state.blendAttributeValue.length; x++) {
            const objProductFound =  state.arrayPossibleProduct.find(item => item.generateUUID ===state.blendAttributeValue[x].idProduct)
            console.log(objProductFound)
            const objAttributeA =  state.attributeValue[0].find(item => item.idGenerate ===state.blendAttributeValue[x].idAttributeA)
            if(state.blendAttributeValue[x].idAttributeB===null){
                let response = await axios.post(blendAttributeValueUrl, {
                    product_id :objProductFound.id,
                    atributoValor_id:objAttributeA.id,
                    atributoValorB_id:null,
                    uniqueCode:objProductFound.generateUUID
                })
                console.log(response)

            }else{
                const objAttributeB =  state.attributeValue[1].find(item => item.idGenerate ===state.blendAttributeValue[x].idAttributeB)
                let response = await axios.post(blendAttributeValueUrl, {
                    product_id :objProductFound.id,
                    atributoValor_id:objAttributeA.id,
                    atributoValorB_id:objAttributeB.id,
                    uniqueCode:objProductFound.generateUUID
                })
                console.log(response)
                // console.log(objAttributeA)
                // console.log(objAttributeB)
            }
        }
        
    },
    
}


export default{
    strict, state, getters, mutations, actions
}
