<template>

 <div class="pt-3 pb-3 pl-3 pr-3 text-left">
  <div class="row">
    <!-- <div v-if="ifCanAddVariante()" class="col-md-3">
      <button @click="addNewAttribute" class="btn btn-primary">nuevo atributo</button>
    </div> -->
  </div>
  <div class="row">
    <!-- <div class="col-md-12">
      <label class="form__label">Atributo </label>
    </div> -->
    <div class="col-md-12">
       <div class="card mt-3" v-for="(variante, index1) in $v.variantes.$each.$iter">
        <div class="card-body">
          <h4>Variante {{index1}}</h4>
         <div class="row">
           <div class="col-md-6">
              <div class="" :class="{ 'form-group--error': variante.attributeName.$error }">
               
                <input type="text" placeholder="ej:color" v-model.trim="variante.attributeName.$model" v-focus  class="form__input">
              </div>
              <div class="error" v-if="!variante.attributeName.required">Name is required.</div>
              <div class="error" v-if="!variante.attributeName.minLength">Name must have at least {{ variante.attributeName.$params.minLength.min }} letters.</div>
            </div>
          </div>
          <h5>valores</h5>
          <div class="row">
            <div class="col-md-3" v-for="(value,index) in variante.value.$each.$iter" >
              <span class="float-right" @click="deleteValue(index1,index)" style="cursor:pointer">x</span>
              <div class="" :class="{ 'form-group--error': value.valueName.$error }">
                 <!-- <autocomplete :suggestions="llenarValueOfDataBase()" v-model="value.valueName.$model" ></autocomplete> -->
                 <!-- <autocomplete :nameVuexState="$store.state.product.valueOfDataBase"v-model:id="value.id.$model"  v-model:value="value.valueName.$model" ></autocomplete> -->
     
                <input name="attributeName" 
                v-focus
                type="text" 
                class="form__input" 
                v-model.trim="value.valueName.$model"
                placeholder="ej: rojo"
                @keyup.enter="addNewValue(index1,value.valueName)"
                >
              </div>
              <div class="error" v-if="!value.valueName.required">Name is required.</div>
              <div class="error" v-if="!value.valueName.minLength">Name must have at least {{ value.valueName.$params.minLength.min }} letters.</div>
            </div>
                 <span @click="addNewValue(index1,value.valueName)" style="cursor:pointer">add</span>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3" v-show="buttonAddVariante">
     <div class="col-md-12">
       <button @click="addVariantes"  class="btn btn-warning">aceptar variantes</button>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>possible products</h3>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Eliminar</th>
                    <th>Nombre Variante</th>
                    <th>Estado</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="possibleProduct in $v.arrayProductOfVariantes.$each.$iter ">
                 <td  class="text-center"><span @click="deletePossibleProduct(possibleProduct.$model.generateUUID);" style="cursor:pointer">x</span></td>
                 <td width="50%">
                 <input type="text" v-model.trim="possibleProduct.name.$model" class="form__input"  >
                 </td>
                 <td > 
                   <treeselect v-model="possibleProduct.$model.statusProduct_id" :maxHeight=100 :multiple="false" :options="statusProduct" :normalizer="normalizer"/>
                    <!-- <select class="form__input" v-model="possibleProduct.$model.statusProduct_id">
                      <option v-for="(status,index) in statusProduct" :selected="possibleProduct.$model.statusProduct_id" :value="status.id">
                        {{ status.statusName }}
                      </option>
                    </select> -->
                 
                </td>
                <td ><div :class="{ 'form-group--error': possibleProduct.price.$error }"><input type="number" v-model.trim="possibleProduct.price.$model" class="form__input"></div></td>
                <td><div :class="{ 'form-group--error': possibleProduct.quantity.$error }"><input type="number" v-model.trim="possibleProduct.quantity.$model" class="form__input"></div></td>
               </tr>
            </tbody>
        </table>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
        <button @click="confirmChildrenProduct" :disabled='confirmChildrenProductButton' class="btn btn-warning">confirmar</button>
    </div>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import { required, minLength } from 'vuelidate/lib/validators'
import {statusProductUrl,valueUrl} from '../../../packages/config'
import Autocomplete from '../../CustomComponent/InputAutocomplete'

const NewProductObj = require('./MField.js')
const notMinus = (value) => value >= 0.01
// import {newProductObj} from './MField.js'
const focus = {
    inserted(el) {
      el.focus()
    },
  }
export default {
  props: ['clickedNext', 'currentStep'],
   directives: { focus },
  data() {
    return{
      // selected: '0',
      statusProduct: [],
      variantes:[
        {
          // attributeId:'',
          attributeIdGenerate:'',
          attributeName:'',
          value:[{
            id:'',
            valueId:'',
            valueName:''
          },
          ]
        }],
      attribute:[],
      value:[],
      attributeValue:[],
      blendAttributeValue:[],



      // estadoProducto:['Nuevo','2da Mano-casi nuevo','2da mano-muy bueno'],
      buttonAddVariante:false,
      arrayProductOfVariantes:[],
      confirmChildrenProductButton:true,
      // joinAtributoValor:null,
      // joinBlendAttributeValue:[],
      // map : null,
       normalizer(node) {
      return {
        label: node.statusName,
      }
    }
    }
  },
  beforeMount(){
    this.$store.dispatch('getterValueOfDataBase')
  },
  mounted(){
    this.variantes[0].attributeIdGenerate=this.generateUUID(),
    this.variantes[0].value[0].valueId=this.generateUUID()
    // if(!this.$v.$invalid) {
    //     this.$emit('can-continue', {value: true});
    // } else {
    //     this.$emit('can-continue', {value: false});
    // }
  },
   created(){
     this.fillStatusProductUrl()

   },
  validations: {
    variantes:{
      required,
      $each: {
        // attributeId:{required},
        attributeIdGenerate:{required},
        attributeName:{required,  minLength: minLength(3),},
        value:{
          required,
          $each:{
            // id:{required},
            valueId:{required},
            valueName:{required, minLength: minLength(1),}
          }
        }
      }
    },
    arrayProductOfVariantes:{
      required,
      $each:{
        name:{required},
        statusProduct_id:{required},
        price:{required,notMinus},
        quantity:{required,notMinus}
      }
    }
  },
  watch: {
     $v: {
        handler: function (val) {
          // console.log(val.arrayProductOfVariantes.$invalid)
        if(!val.variantes.$invalid) {
          this.buttonAddVariante = true
        //     this.$emit('can-continue', {value: true});
        } else {
           this.buttonAddVariante = false
        //     this.$emit('can-continue', {value: false});
        //     setTimeout(()=> {
        //         this.$emit('change-next', {nextBtnValue: false});
        //     }, 3000)
        }
        if(!val.arrayProductOfVariantes.$invalid){
          console.log('entra',val.arrayProductOfVariantes)
          this.confirmChildrenProductButton = false
        }else{
          console.log('tambien',val.arrayProductOfVariantes)
          this.confirmChildrenProductButton = true
        }
      },
      deep: true
    },
     clickedNext(val) {
    //  console.log('entra')
      if(val === true) {
        
          this.$v.variantes.$touch();
      }
    }
   },
   components: {
    Treeselect,
    Autocomplete 
    // NodeTree
  },
   computed:{
    //  selectedStatus () {
    //   return this.statusProduct.find(status => status.id === this.selected)
    // }
   },
  methods:{
  	// onChange () {
	  //   this.$emit('input', this.selectedStatus)
    // },
    fillStatusProductUrl(){
      axios.get(statusProductUrl,{
        }).then(response =>{
        //  console.log(response.data)
            this.statusProduct = response.data
        }).catch(error =>{
              console.log('atributo: ',error)
        })
    },

  generateUUID() { 
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return newGuid;
  },
  separateVariantes(){
    this.attribute = []
    this.value = []
    this.attributeValue = []
    this.blendAttributeValue = []
    for (let x = 0; x < this.variantes.length; x++) {
       let objAttribute={
          id:null,
          idGenerate:this.generateUUID(),
          name:this.variantes[x].attributeName
        }
      this.attribute.push(objAttribute)   
      let row=[]
      for (let y = 0; y < this.variantes[x].value.length; y++) {
         let objValue={
          id:null,
          idGenerate:this.generateUUID(),
          value:this.variantes[x].value[y].valueName
        }
        this.value.push(objValue)   
        let objAttributeValue={
          id:null,
          idGenerate:this.generateUUID(),
          idGenerateAttribute:objAttribute.idGenerate,
          idGenerateValue:objValue.idGenerate
        }
        row.push(objAttributeValue)
      }   
       this.attributeValue.push(row)    
    }
    if(this.attributeValue.length > 1){
        // console.log(this.attributeValue)
        const atributoValor1= this.attributeValue[0]
        const atributoValor2= this.attributeValue[1]
      for (let x = 0; x < atributoValor1.length; x++) {
        for (let y = 0; y < atributoValor2.length; y++) {
          let objBlendAttributeValue={
          idGenerate:this.generateUUID(),
          idAttributeA:atributoValor1[x].idGenerate,
          idAttributeB:atributoValor2[y].idGenerate,
          idProduct:null
        }
        this.blendAttributeValue.push(objBlendAttributeValue)
        }
      }
    }else{
      const atributoValor1= this.attributeValue[0]
            //  console.log(atributoValor1)
      for (let x = 0; x < atributoValor1.length; x++) {
        let objBlendAttributeValue={
          idGenerate:this.generateUUID(),
          idAttributeA:atributoValor1[x].idGenerate,
          idAttributeB:null,
          idProduct:null
        }
        this.blendAttributeValue.push(objBlendAttributeValue)
      }
    }
  },

  unionProductoAtributoValor(){
      for (let y = 0; y < this.blendAttributeValue.length; y++) {
        // console.log(this.arrayProductOfVariantes[y].generateUUID)
          this.blendAttributeValue[y].idProduct = this.arrayProductOfVariantes[y].generateUUID     
      } 
  },



    // joinAttributeValue(){
    //   this.joinAtributoValor = []
    //   for(let x = 0; x < this.variantes.length; x++)
    //   {
    //     // let row = []
    //     for(let y=0; y < this.variantes[x].value.length;y++){
    //       let objectVariationValue = {
    //         atributoValorIdGenerate:this.generateUUID(),

    //         attributeId:'',
    //         attributeIdGenerate:this.variantes[x].attributeIdGenerate,
    //         attributeName : this.variantes[x].attributeName,

    //         valueId:'',
    //         valueIdGenerate:this.variantes[x].value[y].valueId,
    //         valueName : this.variantes[x].value[y].valueName,
    //       }
    //       // row.push(objectVariationValue)
    //       this.joinAtributoValor.push(objectVariationValue)
    //     }
    //     // this.joinAtributoValor.push(row) 
    //   }
    // },
    // joinBlendAttributeValue(){
    //   for (let x = 0; x < this.joinAtributoValor.length; x++) {
    //     for (let y = 0; y < this.joinAtributoValor[x].length; y++) {
    //        let objectBlendAttributeValue = {
    //          attributeId: this.jo

    //        }
    //       this.joinBlendAttributeValue.push()

    //     }
    //   }
    // },
    // crearMatriz(){
    //   this.map = []
    //   if(this.joinAtributoValor.length >1){
    //     let objJoinVarianteValorUno = this.joinAtributoValor[0]
    //     let objJoinVarianteValorDos = this.joinAtributoValor[1]
    //     console.log(objJoinVarianteValorUno.attributeName)
    //     for (let y = 0; y < objJoinVarianteValorUno.length; y++) {
    //       let row = []
    //       for (let x = 0; x < objJoinVarianteValorDos.length; x++) {
    //         let field = new Field(x, y,objJoinVarianteValorDos[x].atributoValorId,objJoinVarianteValorUno[y].atributoValorId)
    //         row.push(field)
    //       }
    //       this.map.push(row)
    //     }
    //   }else{
    //       let objJoinVarianteValor = this.joinAtributoValor[0]
    //      for (let y = 0; y < objJoinVarianteValor.length; y++) {
    //         let field = new Field(y, 0,objJoinVarianteValor[y].atributoValorId,null)
    //       this.map.push(field)
    //     }
    //   }
    // },
    ifCanAddVariante(){
      if(this.variantes.length>=2){
        return false
      }else{
        return true
      }
    },
    addVariantes(){
      this.separateVariantes()
      // this.joinAttributeValue()
      this.createProductVariante()
      this.unionProductoAtributoValor()
      

      // this.crearMatriz()
    },

    createProductVariante(){
      this.arrayProductOfVariantes = []
      // const objectStore = this.$store.state.product.productObj
      // for (let x = 0; x < this.joinAtributoValor.length; x++) {
      //       let newProductObj = new NewProductObj(this.generateUUID(),objectStore.id,objectStore.name+' ('+this.joinAtributoValor[x].attributeName +', '+this.joinAtributoValor[x].valueName+')',objectStore.modelo, 10,objectStore.brand,10,
      //                             objectStore.category_id,objectStore.peso,objectStore.alto,objectStore.ancho,objectStore.fondo,objectStore.parent_id,objectStore.generateUuid,0,null,null)
      //       this.arrayProductOfVariantes.push(newProductObj)
        
      // }
      const objectStore = this.$store.state.product.productObj
      if(this.variantes.length >1){
        const atributoValor1= this.variantes[0]
        const atributoValor2= this.variantes[1]
        for (let x = 0; x < atributoValor1.value.length; x++) {
          for (let y = 0; y < atributoValor2.value.length; y++) {
             let newProductObj = new NewProductObj(this.generateUUID(),objectStore.id,objectStore.name+' ('+atributoValor1.value[x].valueName +', '+atributoValor2.value[y].valueName+')',objectStore.modelo, 10,objectStore.brand,10,
                                  objectStore.category_id,objectStore.peso,objectStore.alto,objectStore.ancho,objectStore.fondo,objectStore.parent_id,objectStore.generateUuid,objectStore.statusProduct_id)
            this.arrayProductOfVariantes.push(newProductObj)
          }          
        }
      }else{
        const atributoValor1= this.variantes[0]
        // console.log(atributoValor1)
        for (let x = 0; x < atributoValor1.value.length; x++) {
            let newProductObj = new NewProductObj(this.generateUUID(),objectStore.id,objectStore.name+' ('+atributoValor1.value[x].valueName+')',objectStore.modelo, 10,objectStore.brand,10,
                                objectStore.category_id,objectStore.peso,objectStore.alto,objectStore.ancho,objectStore.fondo,objectStore.parent_id,objectStore.generateUuid,objectStore.statusProduct_id)
          this.arrayProductOfVariantes.push(newProductObj)
        }   
      }
    },

    addNewAttribute(){
      this.variantes.push({
          attributeId:0,
          attributeIdGenerate:this.generateUUID(),
          attributeName:'' ,
          value:[{
            id:'',
            valueId:this.generateUUID(),
            valueName:''
          }]
      })
    },
    addNewValue(index,text){
        this.variantes[index].value.push({
        id:'',
        valueId:this.generateUUID(),
        valueName:''
        })

    },
    deleteAttribute(index){
      this.variantes.splice(index,1)
    },
    deleteValue(index1,index){
       this.variantes[index1].value.splice(index,1)
    },
    
 indexWhere(array, conditionFn) {
  const item = array.find(conditionFn)
  return array.indexOf(item)
},
// countRelatedAttribute(idAttributeA){
//   return 
// },
    deletePossibleProduct(indexs){
      let objFindBlendattribute= this.blendAttributeValue.find(item => item.idProduct === indexs)
      // console.log(objFindBlendattribute)
      if(objFindBlendattribute.idAttributeA!==null && objFindBlendattribute.idAttributeB!==null){
        let attributeValue1 = this.blendAttributeValue.filter(item => item.idAttributeA === objFindBlendattribute.idAttributeA)
        if(attributeValue1.length===2){
          let indexarrayProductOfVariantes = this.indexWhere(this.arrayProductOfVariantes,item =>item.generateUUID===objFindBlendattribute.idProduct)
          let indexBlendAttributeValue = this.indexWhere(this.blendAttributeValue,item =>item.idProduct===objFindBlendattribute.idProduct)
          
          this.arrayProductOfVariantes.splice(indexarrayProductOfVariantes,1)
          this.blendAttributeValue.splice(indexBlendAttributeValue,1)
        }else{
          //  confirm('se eliminara los posibles productos, la relacion de atributos y el valor')
          let indexarrayProductOfVariantes = this.indexWhere(this.arrayProductOfVariantes,item =>item.generateUUID===objFindBlendattribute.idProduct)
          let indexBlendAttributeValue = this.indexWhere(this.blendAttributeValue,item =>item.idProduct===objFindBlendattribute.idProduct)
          let indexAttributeValue = this.indexWhere(this.attributeValue[0],item =>item.idGenerate===objFindBlendattribute.idAttributeA)
          let obJAttributeValue= this.attributeValue[0].find(item => item.idGenerate ===objFindBlendattribute.idAttributeA)
          let indexValue = this.indexWhere(this.value,item =>item.idGenerate === obJAttributeValue.idGenerateValue)
          
          this.arrayProductOfVariantes.splice(indexarrayProductOfVariantes,1)
          this.blendAttributeValue.splice(indexBlendAttributeValue,1)
          this.attributeValue[0].splice(indexAttributeValue,1)
          this.value.splice(indexValue,1)
        }
      }else{
        let objFindArrayProduct = this.indexWhere(this.arrayProductOfVariantes,item =>item.generateUUID===objFindBlendattribute.idProduct)
        let objFindAttributeA = this.indexWhere(this.attributeValue[0],item =>item.idGenerate===objFindBlendattribute.idAttributeA)
        let objFindValue = this.indexWhere(this.value,item =>item.idGenerate === objFindAttributeA.idGenerateValue)

        this.arrayProductOfVariantes.splice(objFindArrayProduct,1)
        this.attributeValue[0].splice(objFindAttributeA,1)
        this.value.splice(objFindValue,1)
      }
    },
    confirmChildrenProduct(){
      this.$store.dispatch('addAttribute',this.attribute)
      this.$store.dispatch('addValue',this.value)
      this.$store.dispatch('addAttributeValue',this.attributeValue)
      this.$store.dispatch('addBlendAttributeValue',this.blendAttributeValue)
      this.$store.dispatch('confirmPossibleProduct',this.arrayProductOfVariantes)
      //  this.confirmChildrenProductButton = true
      this.$emit('can-continue', {value: true});
    },
    llenarValueOfDataBase(){
     return this.$store.state.product.valueOfDataBase
    }
    // rndStr(len) {
    // 	let text = " "
    // 	let chars = "abcdefghijklmnopqrstuvwxyz"
    //   for( let i=0; i < len; i++ ) {
		// 		text += chars.charAt(Math.floor(Math.random() * chars.length))
    //   }
		// 	return text
		// }
  }

}
</script>

<style>
  .form__input{
     margin-bottom: 0px;
  }
  .form-group {
    margin-bottom: 3%;
  }
</style>
