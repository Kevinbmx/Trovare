<template>

 <div class="pt-3 pb-3 pl-3 pr-3 text-left">

<div class="row">
  <div class="col-md-6">

    <!-- <div class="form-group" :class="{ 'form-group--error': $v.productObjname.$error }">
      <label class="form__label">Title</label>
      <input class="form__input" v-model.trim="$v.productObjname.$model"/>
    </div>

  <div class="error" v-if="!$v.productObjname.required">Field is required</div>
  <div class="error" v-if="!$v.productObjname.minLength">Name must have at least {{$v.productObjname.$params.minLength.min}} letters.</div> -->

    <!-- <div class="form-group" :class="{ 'form-group--error': $v.productObjname.$error }"> -->
    <div class="form-group" :class="{ 'form-group--error': $v.nameProduct.$error }">
      <label class="form__label">Titulo</label>
      <input  class="form__input" type="text" v-model.trim="$v.nameProduct.$model">
      </div>
      <div class="error" v-if="!$v.nameProduct.required">este campo es requerido</div>
    <div class="error" v-if="!$v.nameProduct.minLength">el nombre debe tener al menos {{$v.nameProduct.$params.minLength.min}} letras.</div>
      <!-- {{$store.state.productObj.name}} -->

       <!-- <input name="name"  type="text" class="form__input" @input="updateName" v-model.trim="$v.productObjname.$model"> -->
    <!-- </div>
    <div class="error" v-if="!$v.productObjname.required">este campo es requerido</div>
    <div class="error" v-if="!$v.productObjname.minLength">el nombre debe tener al menos {{$v.productObjname.$params.minLength.min}} letras.</div> -->

    <div class="form-group" :class="{ 'form-group--error': $v.modeloProduct.$error }">
     <label class="form__label">Modelo</label>
      <input name="modelo"  type="text" class="form__input"   v-model.trim="$v.modeloProduct.$model">
    </div>
    <div class="error" v-if="!$v.modeloProduct.required">este campo es requerido</div>


    <div class="form-group" :class="{ 'form-group--error': $v.brandProduct.$error }">
     <label class="form__label">Marca</label>
      <input name="brand"  type="text" class="form__input" v-model.trim="$v.brandProduct.$model">
    </div>
    <div class="error" v-if="!$v.brandProduct.required">este campo es requerido</div>

    <div class="form-group" :class="{ 'form-group--error': $v.quantityProduct.$error }">
        <label class="form__label">Cantidad</label>
        <input name="quantity" class="form__input"  type="number" v-model.trim="$v.quantityProduct.$model" >
    </div>
    <div class="error" v-if="!$v.quantityProduct.required">este campo es requerido</div>
    <div class="error" v-if="!$v.quantityProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.priceProduct.$error }">
      <label class="form__label">Precio</label>
      <input name="price"  class="form__input" step="0.01"  type="number"  v-model.trim="$v.priceProduct.$model" >
    </div>
    <div class="error" v-if="!$v.priceProduct.required">este campo es requerido</div>
    <div class="error" v-if="!$v.priceProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>

  </div>


   <div class="col-md-6">
    <div class="form-group" :class="{ 'form-group--error': $v.category_idProduct.$error }">
      <label class="form__label">Elija una categoria</label>
       <treeselect v-model="$v.category_idProduct.$model" :multiple="false" :options="category" :normalizer="normalizer"   />
     </div>
     <div class="error" v-if="!$v.category_idProduct.required">este campo es requerido</div>

     <div class="form-group" :class="{ 'form-group--error': $v.pesoProduct.$error }">
       <label class="form__label">peso</label>
       <input name="peso"  class="form__input" type="number" v-model.trim="$v.pesoProduct.$model" >
     </div>
     <div class="error" v-if="!$v.pesoProduct.required">este campo es requerido</div>
     <div class="error" v-if="!$v.pesoProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>

     <div class="form-group" :class="{ 'form-group--error': $v.altoProduct.$error }">
       <label class="form__label">alto</label>
       <input name="alto"  class="form__input" type="number" v-model.trim="$v.altoProduct.$model" >
     </div>
     <div class="error" v-if="!$v.altoProduct.required">este campo es requerido</div>
     <div class="error" v-if="!$v.altoProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>

     <div class="form-group" :class="{ 'form-group--error': $v.anchoProduct.$error }">
       <label class="form__label">ancho</label>
       <input name="ancho" class="form__input" type="number" v-model.trim="$v.anchoProduct.$model" >
     </div>
       <div class="error" v-if="!$v.anchoProduct.required">este campo es requerido</div>
       <div class="error" v-if="!$v.anchoProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>

     <div class="form-group" :class="{ 'form-group--error': $v.fondoProduct.$error }">
      <label class="form__label">fondo</label>
       <input name="fondo" class="form__input" type="number" v-model.trim="$v.fondoProduct.$model" >
     </div>
     <div class="error" v-if="!$v.fondoProduct.required">este campo es requerido</div>
     <div class="error" v-if="!$v.fondoProduct.notMinus">este campo debe de ser positiva o mayo a 0.</div>
     </div>


</div>
</div>

</template>

<script>

import Treeselect from '@riophae/vue-treeselect'
import { categoryUrl} from '../../../packages/config'
import { required, minLength, between } from 'vuelidate/lib/validators'
import Vue from 'vue'
import axios from 'axios'
// import { mapState } from 'vuex'
// const currentDate = moment(new Date()).startOf('day')
// const minDate = window.vuelidate.withParams({minDate: currentDate.format('DD.MM.YYYY')}, value => moment(value, 'DD.MM.YYYY', true).isSameOrAfter(currentDate))
const notMinus = (value) => value >= 0.01

export default {
 props: ['clickedNext', 'currentStep'],
  data() {
    return {
      // form:{
      //   name: 'casco fly modelo gpdf year 2015',
      //   modelo: 'gpdf',
      //   quantity:2,
      //   brand:'fly',
      //   price:300.5,
      //   //category_id:['46'],
      //   category_id:null,
      //   peso:10,
      //   alto:10,
      //   ancho:25,
      //   fondo:25,
      //   parent_id:0,
      //   // uniqueCode:'',
      // },
      category:[],
      normalizer(node) {
      return {
        label: node.name,
      }
    },
    }
  },
  validations: {
      nameProduct:        {required, minLength: minLength(10)},
      modeloProduct:      {required},
      quantityProduct:    {required, notMinus},
      brandProduct:       {required},
      priceProduct:       {required, notMinus},
      category_idProduct: {required},
      pesoProduct:        {required, notMinus},
      altoProduct:        {required, notMinus},
      anchoProduct:       {required, notMinus},
      fondoProduct:       {required, notMinus},
    //   parent_idProduct:  {required}
  },
  watch: {
    $v: {
        handler: function (val) {
        if(!val.$invalid) {
            this.$emit('can-continue', {value: true});
        } else {
            this.$emit('can-continue', {value: false});
            setTimeout(()=> {
                this.$emit('change-next', {nextBtnValue: false});
            }, 3000)
        }
      },
      deep: true
    },
    // clickedNext(val) {
    //  console.log('entra')
    //     if(val === true) {
    //         this.$v.productObj$touch();
    //     }
    // }
},
components: {
    Treeselect
    // NodeTree
  },
  computed:{
    nameProduct: {
      get () {
        return this.$store.state.product.productObj.name
      },
      set (value) {
        this.$store.commit('NameProduct', value)
      }
    },
     modeloProduct: {
      get () {
        return this.$store.state.product.productObj.modelo
      },
      set (value) {
        this.$store.commit('modeloProduct', value)
      }
    },
     quantityProduct: {
      get () {
        return this.$store.state.product.productObj.quantity
      },
      set (value) {
        this.$store.commit('quantityProduct', value)
      }
    },
     brandProduct: {
      get () {
        return this.$store.state.product.productObj.brand
      },
      set (value) {
        this.$store.commit('brandProduct', value)
      }
    },
     priceProduct: {
      get () {
        return this.$store.state.product.productObj.price
      },
      set (value) {
        this.$store.commit('priceProduct', value)
      }
    },
     category_idProduct: {
      get () {
        return this.$store.state.product.productObj.category_id
      },
      set (value) {
        this.$store.commit('category_idProduct', value)
      }
    },
     pesoProduct: {
      get () {
        return this.$store.state.product.productObj.peso
      },
      set (value) {
        this.$store.commit('pesoProduct', value)
      }
    },
     altoProduct: {
      get () {
        return this.$store.state.product.productObj.alto
      },
      set (value) {
        this.$store.commit('altoProduct', value)
      }
    },
     anchoProduct: {
      get () {
        return this.$store.state.product.productObj.ancho
      },
      set (value) {
        this.$store.commit('anchoProduct', value)
      }
    },
     fondoProduct: {
      get () {
        return this.$store.state.product.productObj.fondo
      },
      set (value) {
        this.$store.commit('fondoProduct', value)
      }
    },
     
  },
mounted() {
  this.$store.commit('generateUuid',this.generateUUID())
  // console.log(this.$store.state.product.productObj.name)
      if(!this.$v.$invalid) {
          this.$emit('can-continue', {value: true});
      } else {
          this.$emit('can-continue', {value: false});
      }
  },
  created(){
    var vm = this
      axios.get(categoryUrl)
      .then(function(response) {
        vm.category = response.data
      })
  },

  methods: {
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
