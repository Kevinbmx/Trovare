<template>
    <div class="wrapper wrapper-content fadeInRight">
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
                                     <router-link class="btn btn-warning min-letter" v-bind:to="'/'"><i class="fas fa-arrow-left"></i> Lista de Usuarios</router-link>
                                    <!-- <a href="{{url('/admin/user')}}" class="btn btn-warning min-letter"><i class="fas fa-arrow-left"></i> Lista de Usuarios</a> -->
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
                                                                @active-step="isStepActive" @stepper-finished="alert"
                                            >
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
    // import StepThree from './stepTwo.vue';

    export default {
        components: {
            HorizontalStepper,
    // Treeselect

        },
        data(){
          return {
            title:'crear nuevo Usuario',
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
            ],
            category:[],
            normalizer(node) {
              return {
                label: node.name,
              }
            },
          }
        },
        methods: {
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
            alert(payload) {
                alert('end')
            }
        }
    }
</script>
