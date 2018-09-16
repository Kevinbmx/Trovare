<template>
  <div class="wrapper wrapper-content fadeInRight">
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
              <h5>{{nameLabel}}</h5>
              <div class="ibox-tools">
                <!-- <button type="button" class="btn btn-link" data-toggle="popover" title="info" data-content="seleccione uno o varias categorias para que se habilite la opcion de a;adir,editar o eliminar"><i class="fas fa-info-circle"></i></button> -->
                <!-- <button class="btn btn-link" data-toggle="tooltip" data-placement="top" title="seleccione uno o varias categorias para que se habilite la opcion de a;adir,editar o eliminar"><i class="fas fa-info-circle"></i></button> -->
                  <a href="#" class="collapse-link">
                      <i class="fas fa-chevron-down"></i>
                  </a>
              </div>
          </div>
          <div class="ibox-content">
            <div class="row">
                <div class="col-md-12">
                    <div class="m-b-xs">
                      <!-- <router-link class="btn btn-xs btn-primary" v-bind:to="{path: '/create'}">
                        <i class="fas fa-user-plus"></i> Nuevo Usuario
                      </router-link> -->
                    </div>
                </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="m-b-xs">
                  <a  v-show="getsize()== 0"  @click  ="addCategory" class="btn btn-primary min-letter" data-toggle="modal" data-target="#categoryModal" href="#"><i class="fas fa-user-plus"></i> New category</a>
                  <a  v-show="getsize()> 0" @click="addParent" class="btn btn-success min-letter" data-toggle="modal" data-target="#categoryModal" href="#"><i class="fas fa-male"></i> add parent</a>
                  <a  v-show="getsize()==1 " @click="addChildren" class="btn btn-info min-letter"  data-toggle="modal" data-target="#categoryModal" href="#"><i class="fas fa-child"></i> add children</a>
                  <a  v-show="getsize()== 1" @click="deleteCategory" class="btn btn-danger min-letter" href="#"><i class="fas fa-trash-alt"></i>delete</a>
                </div>
                <!-- =============================modal=========================  -->
                <div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="categoryModalLabel">{{nameModal}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                       <form @submit.prevent="categorySubmit()">
                            <div  v-if="serverError" class="alert alert-danger">
                              <div v-for="(value,key) in serverError" :key="key">
                                {{value[0]}}
                              </div>
                            </div>

                            <div class="form-group">
                              <input type="text" name="nameCategory" id="nameCategory"
                              class="form-control" placeholder="name Category"
                              v-model="nameCategory" :class="{ 'is-invalid': errors.has('nameCategory') }"
                              v-validate="'required'">
                              <span class="text-danger">{{ errors.first('nameCategory') }}</span>
                            </div>
                                <button class="btn btn-primary block full-width m-b">
                                  save
                                  <div class="lds-ring-container"
                                    v-if="loading">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div>
                                    </div>
                                  </div>
                              </button>
                       </form>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ================================================================ -->
                <div class="lds-ring-container"
                  v-if="loading">
                  <div class="lds-ring"><div></div><div></div><div></div><div></div>
                  </div>
                </div>
                <ul>
                  <node-tree v-for="(child,index) in getCategory" :key="index" :node="child"></node-tree>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * TODO:
 *
 *
 * FIXME:
 * -arreglar el chequeo automatico cuando creas , añadis nuevo padre, y creas hijo
 * -arreglar el chequeo automatico cuando se quiere chequear en una raiz no correspondiente
*/
import NodeTree from "./nodeTree";
export default {
  data: () => ({
    nameLabel : "Arbol de Categorias",
    nameModal:"",
    nameCategory:'',
    serverError: '',
    successMessage: '',
    nameMethod:'',
    loading: false,
  }),
  components: {
    NodeTree
  },
  created(){
      this.$store.dispatch('retrieveCategory')
  },
  computed:{
     getCategory() {
    return this.$store.getters.getCategory
    },
  },
  methods:{
     getsize(){
      return this.$store.getters.getsize
    },
    addCategory(){
      this.nameMethod="addCategory"
      this.nameModal="New Category"
    },
    addParent(){
      this.nameMethod="addParent"
      this.nameModal="Add Parent"
    },
    addChildren(){
      this.nameMethod="addChildren"
      this.nameModal="Add Children"
    },
    deleteCategory(){
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteCategory')
          this.$swal(
            'Eliminado!',
            'tu categoria ha sido eliminada.',
            'success'
          )
        }else{
           this.$swal(
            'Cancelado!',
            'tu categoria esta a salvo.',
            'error'
          )
        }
      })
    },
    categorySubmit(){
      if (this.nameMethod ==="addCategory")
      {
        this.$store.dispatch('addCategorySubmit',
        {
          name: this.nameCategory,
          parent_id: 0,
        })
        .then(response =>{
          console.log(response)
        })
       this.hideBeforeSubmit()
      }
      else if(this.nameMethod ==="addParent")
      {
        this.$store.dispatch('addParentSubmit',
        {
          name: this.nameCategory,
        })
       this.hideBeforeSubmit()
      }
      else
      {
        this.$store.dispatch('addChildrenSubmit',
        {
          name: this.nameCategory,
        })
        this.hideBeforeSubmit()
      }
    },

    hideBeforeSubmit(){
        this.nameCategory = ''
        $('#categoryModal').modal('hide')
    }




  }
};
</script>

<style>
  /* ul, li{
    margin-top: 10px;
    margin-bottom: 10px;

  } */
</style>
