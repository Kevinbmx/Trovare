<template>

 <div class="elemento">

<div class="row">
  <div class="col-md-6">

    <!-- <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input class="form__input" v-model.trim="$v.name.$model"/>
    </div>

  <div class="error" v-if="!$v.name.required">Field is required</div>
  <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div> -->

    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input type="text" name="name" class="form__input" v-model.trim="$v.name.$model">

    </div>
    <div class="error" v-if="!$v.name.required">este campo es requerido</div>
    <div class="error" v-if="!$v.name.minLength">el nombre debe tener al menos {{$v.name.$params.minLength.min}} letras.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.modelo.$error }">
     <label class="form__label">Modelo</label>
      <input name="modelo"  type="text" class="form__input"  v-model.trim="$v.modelo.$model">
    </div>
    <div class="error" v-if="!$v.modelo.required">este campo es requerido</div>


    <div class="form-group" :class="{ 'form-group--error': $v.brand.$error }">
     <label class="form__label">Marca</label>
      <input name="brand"  type="text" class="form__input"   v-model.trim="$v.brand.$model">
    </div>
    <div class="error" v-if="!$v.brand.required">este campo es requerido</div>

    <div class="form-group" :class="{ 'form-group--error': $v.quantity.$error }">
        <label class="form__label">Cantidad</label>
        <input name="quantity" class="form__input"  type="number"  v-model.trim="$v.quantity.$model" >
    </div>
    <div class="error" v-if="!$v.quantity.required">este campo es requerido</div>
    <div class="error" v-if="!$v.quantity.notMinus">este campo debe de ser positiva o mayo a 0.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.price.$error }">
      <label class="form__label">Precio</label>
      <input name="price"  class="form__input" step="0.01"  type="number"  v-model.trim="$v.price.$model" >
    </div>
    <div class="error" v-if="!$v.price.required">este campo es requerido</div>
    <div class="error" v-if="!$v.price.notMinus">este campo debe de ser positiva o mayo a 0.</div>

  </div>


  <div class="col-md-6">
    <div class="form-group" :class="{ 'form-group--error': $v.category_id.$error }">
     <label class="form__label">Elija una categoria</label>
      <treeselect v-model.trim="$v.category_id.$model" :multiple="false" :options="category" :normalizer="normalizer"   />
    </div>
    <div class="error" v-if="!$v.category_id.required">este campo es requerido</div>

    <div class="form-group" :class="{ 'form-group--error': $v.peso.$error }">
      <label class="form__label">peso</label>
      <input name="peso"  class="form__input" type="number"  v-model.trim="$v.peso.$model" >
    </div>
    <div class="error" v-if="!$v.peso.required">este campo es requerido</div>
    <div class="error" v-if="!$v.peso.notMinus">este campo debe de ser positiva o mayo a 0.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.alto.$error }">
      <label class="form__label">alto</label>
      <input name="alto"  class="form__input" type="number" v-model.trim="$v.alto.$model" >
    </div>
    <div class="error" v-if="!$v.alto.required">este campo es requerido</div>
    <div class="error" v-if="!$v.alto.notMinus">este campo debe de ser positiva o mayo a 0.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.ancho.$error }">
      <label class="form__label">ancho</label>
      <input name="ancho" class="form__input" type="number" v-model.trim="$v.ancho.$model" >
    </div>
      <div class="error" v-if="!$v.ancho.required">este campo es requerido</div>
      <div class="error" v-if="!$v.ancho.notMinus">este campo debe de ser positiva o mayo a 0.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.fondo.$error }">
     <label class="form__label">fondo</label>
      <input name="fondo" class="form__input" type="number" v-model.trim="$v.fondo.$model" >
    </div>
    <div class="error" v-if="!$v.fondo.required">este campo es requerido</div>
    <div class="error" v-if="!$v.fondo.notMinus">este campo debe de ser positiva o mayo a 0.</div>
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
// const currentDate = moment(new Date()).startOf('day')
// const minDate = window.vuelidate.withParams({minDate: currentDate.format('DD.MM.YYYY')}, value => moment(value, 'DD.MM.YYYY', true).isSameOrAfter(currentDate))
const notMinus = (value) => value >= 1

export default {

  data() {
    return {
      name: '',
      modelo: '',
      quantity:'',
      brand:'',
      price:'',
      category_id:['46'],
      peso:'',
      alto:'',
      ancho:'',
      fondo:'',
      parent_id:0,
      // uniqueCode:'',
      category:[],
      normalizer(node) {
      return {
        label: node.name,
      }
    },
    }
  },
  validations: {
    name:       {required, minLength: minLength(10)},
    modelo:     {required},
    quantity:   {required, notMinus},
    brand:      {required},
    price:      {required, notMinus},
    category_id:{required},
    peso:       {required, notMinus},
    alto:       {required, notMinus},
    ancho:      {required, notMinus},
    fondo:      {required, notMinus},
    parent_id:  {required}
  },
  watch: {
    $v: {
        handler: function (val) {
            if(!val.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        },
        deep: true
    },
    clickedNext(val) {
        if(val === true) {
            this.$v.form.$touch();
        }
    }
},
components: {
    Treeselect
    // NodeTree
  },
mounted() {
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

  }
}

</script>

<style>
.elemento {
    padding:0 4% 0 4%;
    text-align: left;
}
</style>
