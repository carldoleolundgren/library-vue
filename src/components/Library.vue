<template>
  <div>
    <input type="text" class="form-control" placeholder="Search by title or author" v-model="filterText">
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
        <tr v-for="book in filteredTitles" :key="book.title + book.author + book.pages">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td class="small-column"> {{ book.pages }} </td>
          <td class="small-column"> {{ book.readStatus }} </td>
          <td class="small-column"> 
            <button class="btn btn-danger btn-sm" :id="book.id" @click="deleteBook">Delete</button> 
          </td>
          <td class="small-column"> 
            <button class="btn btn-info btn-sm" @click="editBook" :id="book.id">Edit</button> 
          </td>
        </tr>
      </tbody>
    <br>
    <button class="btn btn-primary" @click="modalWindowOpen = true">Add New Book</button>
    </table>
    <appAddEditBook :isOpen="modalWindowOpen" :isEditingBook="editWindowOpen" :editKey="editKey">
      <h3 slot="modalHeader">{{ modalHeaderText }}</h3>
    </appAddEditBook>
  </div>
</template>

<script>
import AddEditBook from './AddEditBook'
import { eventBus } from '../main'

export default {
  data() {
    return {
      modalWindowOpen: false,
      editWindowOpen: false,
      editKey: null,
      filterText: ''
    }
  },
  computed: {
    library() {
      return this.$store.state.library;
    },
    filteredTitles() {
      return this.library.filter((el) => {
        return el.title.toLowerCase().match(this.filterText) ||
              el.author.toLowerCase().match(this.filterText)
      })
    },
    modalHeaderText() {
      if (this.editWindowOpen) { 
        return 'Edit book:'
      } else {
        return 'Add a book:'
      }
    }
  },
  methods: {
    deleteBook() {
      let index = this.$store.state.library.findIndex(book => book.id == event.target.id);
      this.$store.state.library.splice(index, 1);
      this.$store.commit('storeLibrary');
    },
    editBook() {
      //console.log('edit')
      this.modalWindowOpen = true;
      this.editWindowOpen = true;
      this.editKey = event.target.id;
    }
  },
  components: {
    appAddEditBook: AddEditBook
  },
  created() {
    eventBus.$on('modalWindowOpen', (closed) => {
      this.modalWindowOpen = closed;
      this.editWindowOpen = closed;
    })
  }
}
</script>

<style scoped>
input {
  width: 90%;
  border-radius: 25px;
  margin: auto;
  margin-bottom: 2%;
}

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