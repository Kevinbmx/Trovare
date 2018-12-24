<template>
    <div id="add" class="wrapper wrapper-content fadeInRight">
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5> {{title}}</h5>
                        <div class="ibox-tools">
                            <a href="#" class="collapse-link">
                                <i class="fas fa-chevron-down"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="m-b-md">
                                     <router-link class="btn btn-warning min-letter" v-bind:to="{name: 'mainProduct'}"><i class="fas fa-arrow-left"></i> Lista de productos</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                              <section class="section">
                                <div class="">
                                    <div class="columns">
                                        <div class="column is-8 is-offset-2">
                                            <horizontal-stepper :steps="demoSteps" @completed-step="completeStep"
                                                                @active-step="isStepActive" @stepper-finished="alert">
                                            </horizontal-stepper>
      

                                        </div>
                                    </div>
                                </div>
                              </section>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import HorizontalStepper from 'vue-stepper';
import Treeselect from '@riophae/vue-treeselect'

    // This components will have the content for each stepper step.
    import StepOne from './stepOne.vue';
    import StepTwo from './stepTwo.vue';
    import StepThree from './stepThree.vue';

    export default {
        components: {
            HorizontalStepper,

    // Treeselect

        },
        name: 'app',
        data(){
          return {
            title:'crear nuevo Producto',
            demoSteps: [
              {
                icon: 'create',
                name: 'producto',
                title: 'producto',
                // subtitle: 'Subtitle sample',
                component: StepOne,
                completed: false

              },
              {
                icon: 'description',
                name: 'variante',
                title: 'variante',
                // subtitle: 'Subtitle sample',
                component: StepTwo,
                completed: false
              },
            //   {
            //       icon:'description',
            //       name:'descipcion',
            //       title:'descripcion',
            //       component:StepThree,
            //       completed:false
            //   }
            ],
            //category:[],
            normalizer(node) {
              return {
                label: node.name,
              }
            },
          }
        },
       mounted(){
            this.removeCollapse();
        },
     
        methods: {
            //menu collapse 
            removeCollapse(){
                $("#Moduleinventario").addClass("active");
                $("#listModuleinventario").addClass("active");
                $("#articles").addClass("active");
            },
            // Executed when @completed-step event is triggered
            completeStep(payload) {
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        step.completed = true;
                    }
                })
            },
            // Executed when @active-step event is triggered
            isStepActive(payload) {
                this.demoSteps.forEach((step) => {
                    if (step.name === payload.name) {
                        if(step.completed === true) {
                            step.completed = false;
                        }
                    }
                })
            },
        
            // Executed when @stepper-finished event is triggered
            async alert(payload) {
                await this.$store.dispatch('addProductSubmit',this.$store.state.auth.token)
                await this.$store.dispatch('addAttributeSubmit')
                await this.$store.dispatch('addValueSubmit')
                await this.$store.dispatch('addAttributeValueSubmit')
                await this.$store.dispatch('addPosibleProductSubmit',this.$store.state.auth.token)
                await this.$store.dispatch('addBlendAttributeValueSubmit')
                console.log('termino')
            }
        }
    }
</script>

