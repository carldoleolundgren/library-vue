<template>
  <div>
    <table class="table table-striped table-hover table-responsive">
      <thead>
        <tr>
          <th class="col-3">Title</th>
          <th class="col-3">Author</th>
          <th class="col-2">Pages</th>
          <th class="col-2">Read?</th>
          <th class="col-2"> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in library" :key="book.title">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td class="small-column"> {{ book.pages }} </td>
          <td class="small-column"> {{ book.readStatus }} </td>
          <td class="small-column"> 
            <button class="btn btn-danger" @click="deleteBook">Delete</button> 
          </td>
        </tr>
      </tbody>
    <button class="btn btn-primary" @click="addBookWindowOpen = true">Add New Book</button>
    </table>
    <appAddBook :isOpen="addBookWindowOpen"></appAddBook>
  </div>
</template>

<script>
import AddBook from './AddBook'
import { eventBus } from '../main'

export default {
  data() {
    return {
      addBookWindowOpen: false
    }
  },
  computed: {
    library() {
      return this.$store.state.library;
    }
  },
  methods: {
    deleteBook() {
      let targetTitle = event.target.parentNode.parentNode.firstChild.innerText;
      let index = this.$store.state.library.findIndex(book => book.title == targetTitle);
      
      this.$store.state.library.splice(index, 1);
    }
  },
  components: {
    appAddBook: AddBook
  },
  created() {
    eventBus.$on('addBookWindowClosed', (closed) => {
      this.addBookWindowOpen = closed;
    })
  }
}
</script>

<style scoped>
table {
  width: 90%;
  margin: auto;
}

th {
  border-bottom: 1px solid black;
}

.small-column {
  width: 10%;
  text-align: center;
}

.wide-column {
  width: 30%;
}
</style>