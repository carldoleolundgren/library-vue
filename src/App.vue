<template>
  <div id="app">
    <appLibrary></appLibrary>
    <appAddBook></appAddBook>
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
