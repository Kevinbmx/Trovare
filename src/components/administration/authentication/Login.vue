<template>
   <div class="loginColumns animated fadeInDown">
        <div class="row">
        <div class="col-md-6">
            <h1 class="font-bold" >Bienvenido a Trovare</h1>
            <p>
                Administra todo acerca de la tienda online Trovare.
            </p>
            <p>
                prodra crear usuario, ver pedidos y asignar pedidos para su entrega.
            </p>

        </div>
        <div class="col-md-6">
            <div class="ibox-content">
                <h2>Trovare</h2>
                  <form v-on:submit.prevent="loginSubmit()">
                    <div v-if="successMessage" class="alert alert-success">
                      {{successMessage}}
                    </div>
                    <div v-if="serverError"
                     class="alert alert-danger">{{serverError}}</div>

                    <div class="form-group">
                        <input  type="email"
                                v-model="email"
                                class="form-control"
                                placeholder="email">
                    </div>
                    <div class="form-group">
                        <input  type="password"
                                v-model="password"
                                class="form-control"
                                placeholder="password">
                    </div>
                    <div class="form-group  mb-0">
                      <button class="btn btn-primary block full-width m-b">
                          Login
                          <div class="lds-ring-container"
                            v-if="loading">
                            <div class="lds-ring"><div></div><div></div><div></div><div></div>
                            </div>
                          </div>
                      </button>
                      <p class="text-muted text-center">
                              <small>No tienes cuenta?</small>
                      </p>
                      <router-link class="btn btn-sm btn-white btn-block" :to="{ name: 'register' }">register</router-link>
                      <!-- <a class="btn btn-sm btn-white btn-block" href="{{ route('register') }}">Create una cuenta</a> -->
                    </div>

                  </form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {loginUrl, getHeader,userUrl} from '../../../packages/config'
import {clientId ,clientSecret} from '../../../env'
export default {
  name:'login',
  props:{
    dataSuccessMessage:{
      type:String,
    }
  },
  data(){
        return{
            email: '',
            password:'',
            serverError:'',
            successMessage: this.dataSuccessMessage,
            loading: false,
        }
  },
  methods:{
    loginSubmit(){
      this.loading = true
      this.$store.dispatch('retrieveToken',{
        username:this.email,
        password:this.password,

      })
      .then(response =>{
         this.loading = false
        this.$router.push({name: 'mainpage'})
      })
      .catch(error =>{
         this.loading = false
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
      })
    }
  }

}
</script>



