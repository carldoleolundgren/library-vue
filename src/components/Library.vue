<template>
  <div>
    <input type="text" class="form-control" placeholder="Search by title or author" v-model="filterText">
    <table class="table table-striped table-hover table-responsive">
      <thead class="">
        <tr>
          <th class="col-md-3">
            Title 
            <font-awesome-icon icon="arrow-up" />
          </th>
          <th class="col-md-2">
            Author
            <font-awesome-icon icon="arrow-up" />
          </th>
          <th class="col-md-2">
            Pages
            <font-awesome-icon icon="arrow-up" />
          </th>
          <th class="col-md-2">
            Read?
            <font-awesome-icon icon="arrow-up" />
          </th>
          <th class="col-md-1"> </th>
          <th class="col-md-1"> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredLibrary" :key="book.title + book.author + book.pages">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td class=""> {{ book.pages }} </td>
          <td class=""> {{ book.readStatus }} </td>
          <td class=""> 
            <button class="btn btn-danger btn-sm" :id="book.id" @click="deleteBook">
              <font-awesome-icon icon="trash" :id="book.id"/>  
            </button> 
          </td>
          <td class=""> 
            <button class="btn btn-info btn-sm" @click="editBook" :id="book.id">
              <font-awesome-icon icon="edit" :id="book.id"/>    
            </button> 
          </td>
        </tr>
      </tbody>
    <br>
    <button class="btn btn-primary" @click="modalWindowOpen = true">
      <font-awesome-icon icon="plus-square" />    
      New Book</button>
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
    filteredLibrary() {
      return this.library.filter((el) => {
        return el.title.toLowerCase().match(this.filterTextLowercase) ||
              el.author.toLowerCase().match(this.filterTextLowercase)
      })
    },
    filterTextLowercase() {
      return this.filterText.toLowerCase();
    },
    modalHeaderText() {
      if (this.editWindowOpen) { 
        return 'Edit book:'
      } else {
        return 'Add a book:'
      }
    },
  },
  methods: {
    deleteBook() {
      let index = this.$store.state.library.findIndex(book => book.id == event.target.id);
      this.$store.state.library.splice(index, 1);
      this.$store.commit('storeLibrary');
    },
    editBook() {
      //console.log(event.target.parentNode.parentNode.childNodes[4].innerText.toLowerCase())
      this.modalWindowOpen = true;
      this.editWindowOpen = true;
      this.editKey = event.target.id
    }
  },
  components: {
    appAddEditBook: AddEditBook
  },
  created() {
    eventBus.$on('modalWindowOpen', (closed) => {
      this.modalWindowOpen = closed;
      this.editWindowOpen = closed;
      this.editKey = closed;
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
  white-space: nowrap
}

.wide-column {
  width: 30%;
}
</style>