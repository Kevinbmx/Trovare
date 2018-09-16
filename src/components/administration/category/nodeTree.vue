<template>
<div>
  <li>
    <div :class="{bold: isFolder}">
      <input type="checkbox" @click="addListChecked($event)" :id="node.id" :value="node.id"  v-model="checkedCategories">
      {{ node.name }}
      <a  @click="toggle" v-if="isFolder">[{{ open ? '-' : '+' }}]</a>
    </div>
    <ul v-show="open" v-if="isFolder">
      <node
        v-for="(node,index) in node.children"
        :key="index"
        :node="node">
      </node>
    </ul>
  </li>
  </div>
</template>

<script>
export default {
  name: "node",
  data: function () {
    return {
      open: false,
      checkedCategories:false,
      categoryIds:[]
    }
  },
  props: {
    node: Object
  },
  computed: {
    isFolder: function () {
      return this.node.children &&
        this.node.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },

    changeType: function () {
      if (!this.isFolder) {
        this.$set(this.node, 'children', [])
        this.addChild()
        this.open = true
      }
    },

    addChild: function () {
      this.node.children.push({
        name: 'new stuff'
      })
    },

    addListChecked:function(e){
      if (e.target.checked) {
        this.$store.dispatch('checkedCategory', e.target.value)
        .then(response =>{
          if(!response){
            this.$swal({
              type: 'warning',
              title: 'chequeo incorrecto',
              text: 'debes de chequear de la misma raiz!'
            });
            $(e.target).prop("checked", false)
          }
        })
      }else{
        this.$store.dispatch('unCheckedCategory', e.target.value)
      }
    },
  }
};
</script>

<style>
  li{
    list-style: none;
  }
</style>
