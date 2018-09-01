<template>
  <div >
    <form @submit.prevent="Submit()">
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
    </form>
  </div>
</template>

<script>
import NodeTree from "./nodeTree";

export default {
  props: {
    treeData: Object
  },
  components: {
    NodeTree
  }
};
</script>

<style>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
