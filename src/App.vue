<template>
  <div id="app">
    <appHeader></appHeader>
    <appLibrary></appLibrary>
  </div>
</template>

<script>
import Header from './components/Header'
import Library from './components/Library'

export default {
  components: {
    appHeader: Header,
    appLibrary: Library,
  }
}
</script>

<style>

</style>
