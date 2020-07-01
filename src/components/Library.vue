<template>
  <div>
    <table class="table table-striped table-hover table-responsive">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Read?</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in library" :key="book.title">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td class="small-column"> {{ book.pages }} </td>
          <td class="small-column"> {{ book.readStatus }} </td>
          <td class="small-column"> 
            <button class="btn btn-danger btn-sm" @click="deleteBook">Delete</button> 
          </td>
          <td class="small-column"> 
            <button class="btn btn-info btn-sm" @click="editBook">Edit</button> 
          </td>
        </tr>
      </tbody>
    <br>
    <button class="btn btn-primary" @click="modalWindowOpen = true">Add New Book</button>
    </table>
    <appAddEditBook :isOpen="modalWindowOpen" :isEditingBook="editingBook"></appAddEditBook>
  </div>
</template>

<script>
import AddEditBook from './AddEditBook'
import { eventBus } from '../main'

export default {
  data() {
    return {
      modalWindowOpen: false,
      editingBook: false
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
      this.$store.commit('storeLibrary');
    },
    editBook() {
      //console.log('edit')
      this.modalWindowOpen = true;
      this.editingBook = true;
    }
  },
  components: {
    appAddEditBook: AddEditBook
  },
  created() {
    eventBus.$on('modalWindowOpen', (closed) => {
      this.modalWindowOpen = closed;
      this.editingBook = closed;
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