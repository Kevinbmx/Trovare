<template>
<div>
  <li>
    <div
      :class="{bold: isFolder}"

      >
      <input type="checkbox" @click="addListChecked($event)" :id="node.id" :value="node.id"  v-model="checkedCategories">

      <!-- <label for="checkbox">{{ checked }}</label> -->
      {{ node.name }}
      <a  @click="toggle" v-if="isFolder">[{{ open ? '-' : '+' }}]</a>
    </div>
   <!-- {{node.name}} -->
    <ul v-show="open" v-if="isFolder">
      <node
        v-for="(node,index) in node.children"
        :key="index"
        :node="node"
      >
      </node>
      <!-- <li class="add" @click="addChild">+</li> -->
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
      // checked: false,
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
        // console.log(e.target.checked)
        // $(e.target).prop("checked", false)
        // e.target.checked ='false'
      //  this.checkedCategories = false
        // console.log(e.target.checked)

        this.$store.dispatch('checkedCategory', e.target.value)
        .then(response =>{
          // if(response.data){
          //   $(e.target).prop("checked", false)
          //   console.log('no se puede agregar')
          // }
          console.log(response.data )
        })
      }else{
          //  console.log(e)
        this.$store.dispatch('unCheckedCategory', e.target.value)

      }
      // console.log(this.checkedCategories)
    },

  }
};
</script>

<style>
li{
  list-style: none;
}
</style>
