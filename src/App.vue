<template>
  <div>
    <div id="wrapper" v-if="LoggedIn">
          <navigation :name="username"></navigation>
          <div id="page-wrapper" class="gray-bg">
              <navbar  ></Navbar>
              <router-view></router-view>
              <footers ></footers>
          </div>
        <!-- <pre style="colo:white;">{{userStore}}</pre> -->
      </div>
      <router-view v-if="!LoggedIn"></router-view>

    </div>
</template>

<script>
// import {mapState} from 'vuex'
import Navbar from './components/administration/layouts/Navbar.vue'
import Navigation from './components/administration/layouts/Navigation.vue'
import Footers from './components/administration/layouts/Footers.vue'
export default {
  data(){
    return{
      username:'kevin'
    }
  },
  components: {
   'navbar': Navbar,
    'navigation': Navigation,
    'footers': Footers,
  },

  computed:{
    LoggedIn(){
      return this.$store.getters.loggedIn
    }
    // ...mapState({
    //   userStore:state => state.userStore
    // })
  },

  created(){
    // console.log('fue creado')
    // const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    // this.$store.dispatch('setUserObject', userObj)
  }
}
</script>

<style lang="scss">

  @import url("./assets/css/bootstrap-3-3-7.css");
  @import url("./assets/css/normalize.css");
  @import url("./assets/css/fontawesome-all.css");
  @import url("./assets/css/defaultAdmin.css");
  @import url("./assets/css/animate.css");
  @import url("./assets/css/vue-treeselect.min.css");

  // @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  @import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');

  // @import url("./assets/css/toastr.css");
  @import url("./assets/css/default.css");

// CSS Spinner

  .lds-ring-container {
    position: absolute;
    right: 50%;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    margin: -23px;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


</style>
