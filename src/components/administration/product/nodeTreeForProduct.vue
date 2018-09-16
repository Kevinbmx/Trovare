<template>
<div>
  <li>
    <div :class="{bold: isFolder}">
      <input type="radio"  :value="node.id" :v-model="gender" >
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
  }
};
</script>
