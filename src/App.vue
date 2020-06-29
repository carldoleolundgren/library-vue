<template>
  <div id="app">
    <appHeader></appHeader>
    <appLibrary></appLibrary>
  </div>
</template>

<script>
import Header from './components/Header'
import Library from './components/Library'
import AddBook from './components/AddBook'

export default {
  components: {
    appHeader: Header,
    appLibrary: Library,
    appAddBook: AddBook
  }
}
</script>

<style>

</style>
