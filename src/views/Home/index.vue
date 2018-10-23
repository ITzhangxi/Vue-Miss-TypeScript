<template>
  <div class="home">
    I am home
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({})
  export default class Index extends Vue {
    name: string = 'Home'
  }
</script>

<style scoped lang="less">

</style>
