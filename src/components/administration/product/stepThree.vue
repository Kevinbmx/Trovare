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
       <div class="card mt-3" v-for="(variante, index1) in variantes">
        <div class="card-body">
          <h4>Variante </h4>
         <div class="row">
           <div class="col-md-6">
              <div class="" :class="{ 'form-group--error': variante.attributeName.$error }">
               
                <input type="text" placeholder="ej:color" v-model="variante.attributeName" v-focus  class="form__input">
              </div>
              <!-- <div class="error" v-if="!variante.attributeName.required">Name is required.</div>
              <div class="error" v-if="!variante.attributeName.minLength">Name must have at least {{ variante.attributeName.$params.minLength.min }} letters.</div> -->
            </div>
          </div>
          <h5>valores</h5>
          <div class="row">
            <div class="col-md-3" v-for="(value,index) in variante.value" >
              <span class="float-right" @click="deleteValue(index1,index)" style="cursor:pointer">x</span>
              <div class="" :class="{ 'form-group--error': value.valueName.$error }">
                 <!-- <autocomplete :nameVuexState="$store.state.product.valueOfDataBase"v-model:id="value.id"  v-model:value="value.valueName" ></autocomplete> -->
                 <input 
                v-focus
                type="text" 
                class="form__input" 
                v-model="value.valueName"
                placeholder="ej: rojo"
                @keyup.enter="addNewValue(index1,value.valueName)"
                >
              </div>
              <!-- <div class="error" v-if="!value.valueName.required">Name is required.</div>
              <div class="error" v-if="!value.valueName.minLength">Name must have at least {{ value.valueName.$params.minLength.min }} letters.</div> -->
            </div>
                 <span @click="addNewValue(index1,value.valueName)" style="cursor:pointer">add</span>

          </div>
        </div>
      </div>
    </div>
  </div>
 
 </div>
</template>

<script>
import Autocomplete from '../../CustomComponent/InputAutocomplete'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex';
import { mapMultiRowFields } from "vuex-map-fields";
const focus = {
    inserted(el) {
      el.focus()
    },
  }
export default {
  props: ['clickedNext', 'currentStep'],
   directives: { focus },
  // validations: {
  //   variantes:{
  //     required,
  //     $each: {
  //       // attributeId:{required},
  //       attributeIdGenerate:{required},
  //       attributeName:{required, minLength: minLength(3)},
  //       value:{
  //         required,
  //         $each:{
  //           id:{required},
  //           valueId:{required},
  //           valueName:{required,minLength: minLength(3)}
  //         }
  //       }
  //     }
  //   }
  //   },
     computed: {
    ...mapMultiRowFields(["variantes"]),
 
  },
    components: {
    Autocomplete 
  },
    watch: {
     $v: {
        handler: function (val) {
          // console.log(val.arrayProductOfVariantes.$invalid)
        if(!val.variantes.$invalid) {
          this.buttonAddVariante = true
            this.$emit('can-continue', {value: true});
        } else {
           this.buttonAddVariante = false
            this.$emit('can-continue', {value: false});
            setTimeout(()=> {
                this.$emit('change-next', {nextBtnValue: false});
            }, 3000)
        }
        
      },
      deep: true
    },
     methods: {
    // We're using the native Vuex function
    // `mapMutations()` to map our mutation
    // for adding a new address row, to a
    // method with the same name as the mutation.
    ...mapMutations(['updateField']),
  },
     clickedNext(val) {
    //  console.log('entra')
      if(val === true) {
        
          this.$v.variantes.$touch();
      }
    }
   },
}
</script>

<style>

</style>
