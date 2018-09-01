<template>
  <div class="middle-box text-center  animated fadeInDown">
    <div class="ibox-content">
      <h2>Registrate a Trovare</h2>
      <form class="form m-t" @submit.prevent="validateBeforeSubmit">

        <!-- <div v-if="successMessage" class="alert alert-success">
          {{successMessage}}
        </div> -->

        <div  v-if="serverError" class="alert alert-danger">
          <div v-for="(value,key) in serverError" :key="key">
            {{value[0]}}
          </div>
        </div>

        <div class="form-group">
          <input type="text" name="name" id="name"
           class="form-control" placeholder="name"
           v-model="name" :class="{ 'is-invalid': errors.has('name') }"
           v-validate="'required'">
          <span class="text-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="form-group">
          <input type="text" name="email" id="email"
          class="form-control" placeholder="email"
          :class="{ 'is-invalid': errors.has('email') }"
          v-model="email" v-validate="'required|email'" >
          <span class="text-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group mb-more">
          <input type="password" name="password"
           id="password" class="form-control"
           placeholder="password"  v-model="password"
           :class="{ 'is-invalid': errors.has('password') }"
           v-validate="'required|min:6'" >
          <span class="text-danger">{{ errors.first('password') }}</span>
        </div>
        <div class="form-group mb-0">
           <button class="btn btn-primary block full-width m-b">
                Login
                <div class="lds-ring-container"
                  v-if="loading">
                  <div class="lds-ring"><div></div><div></div><div></div><div></div>
                  </div>
                </div>
            </button>
          <!-- <input type="submit" class="btn btn-primary block full-width m-b" value="Guardar"> -->
          <router-link :to="{name:'login'}">quieres ingresar?</router-link>
          <!-- <a href="#"><small>quieres ingresar?</small></a> -->
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
   data() {
    return {
      name: '',
      email: '',
      password: '',
      serverError: '',
      successMessage: '',
      loading: false,
    }
  },
    methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.register()
        }
      })
    },
    register() {
      this.loading = true
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.loading = false
          this.successMessage = 'Registered Successfully!'
          this.$router.push({ name: 'login', params: {
             dataSuccessMessage: this.successMessage } })
          // this.$router.push({ name: 'login' })
          this.$toast.success({
            title: this.successMessage,
            message: 'You can login here'
          })
        })
        .catch(error => {
            this.loading = false
          // this.serverErrors = Object.values(error.response.data.errors)
            this.serverError=Object.values
            (error.response.data.errors)
        })
      }
    }
  }

</script>

