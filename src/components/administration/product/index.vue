<template>
  <div class="wrapper wrapper-content fadeInRight">
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
              <h5>{{title}}</h5>
              <div class="ibox-tools">
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
                <div class="table-responsive">
                  <data-viewer :source="source" :thead="thead" :filter="filter" :create="create" :name="name">
                      <template slot-scope="props">
                          <tr>
                              <td><router-link :to="'/' + props.item.id " class="btn btn-link text-warning img-buttons"><i class="fas fa-eye"></i></router-link></td>
                              <td>{{props.item.name}}</td>
                              <td>{{props.item.brand}}</td>
                              <td>{{props.item.modelo}}</td>
                              <td>{{props.item.quantity}}</td>
                              <td>{{props.item.price}} bs.</td>
                              <td>{{props.item.categories.name}}</td>
                              <td>{{props.item.peso}} kg</td>
                              <td>{{props.item.alto}} x {{props.item.ancho}} x {{props.item.fondo}} cm</td>
                              <!-- <td> {{props.item.hasChildren}} </td> -->
                              <td>{{props.item.created_at}}</td>
                          </tr>
                      </template>
                  </data-viewer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import DataViewer from '../../CustomComponent/DataViewer.vue'
    import {productUrl,categoryUrl} from '../../../packages/config'
    export default {
        name: 'ProductIndex',
        data() {
            return {
                title: 'Lista de productos',
                source: productUrl,
                create: {name:'createProduct'},
                name:'producto',
                thead: [
                    {title: 'ver'},
                    {title: 'Name', key: 'name', sort: true},
                    {title: 'marca', key: 'brand', sort: true},
                    {title: 'modelo', key: 'modelo', sort: true},
                    {title: 'cantidad', key: 'quantity', sort: true},
                    {title: 'price', key: 'price', sort: true},
                    {title: 'categoria Id', key: 'category_id', sort: true},
                    {title: 'peso', key: 'dimension'},
                    {title: 'dimension', key: 'fondo'},
                    // {title: 'tiene Hijo', key: 'hasChildren'},
                    {title: 'Created At', key: 'created_at', sort: true}
                ],
                filter: [
                    'id','uniqueCode', 'name', 'modelo'
                ]
            }
        },
        components: {
            DataViewer
        },
        mounted(){
            // this.removeCollapse();
        },
        methods: {
                //menu collapse 
            removeCollapse(){
                $("#Moduleinventario").addClass("active");
                $("#listModuleinventario").addClass("active");
                $("#articles").addClass("active");
            },
          findNameCategory($id){
             axios.get(categoryUrl+'/'+$id)
                .then(function(response) {
                  nameCategory = response.data.name
                })
                .catch(function(error) {
                  console.log(error)
                })
          },
          trueOrFalse(hasChildren){
              if(hasChildren){
                  return true
              }else{
                return false
              }
          }

      }
    }
</script>
