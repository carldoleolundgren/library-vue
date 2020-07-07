<template>
  <div>
    <input type="text" class="form-control" placeholder="Search by title or author" v-model="filterText">
    <table class="table table-striped table-hover table-responsive">
      <thead>
          <th class="title" @click="sortLibrary('title')">
            Title 
            <transition name="rotate">
              <font-awesome-icon 
                icon="arrow-up"
                v-show="currentSort === 'title'"
                :style="{transform: currentSortDir === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}"
              />
            </transition>
          </th>
          <th class="author" @click="sortLibrary('author')">
            Author
            <transition name="rotate">
              <font-awesome-icon 
                icon="arrow-up" 
                v-show="currentSort === 'author'"
                :style="{transform: currentSortDir === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}"              
              />
            </transition>
          </th>
          <th class="small-col" @click="sortLibrary('pages')">
            Pages
            <transition name="rotate">
              <font-awesome-icon 
                icon="arrow-up" 
                v-show="currentSort === 'pages'"
                :style="{transform: currentSortDir === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}"              
              />
            </transition>
          </th>
          <th class="small-col" @click="sortLibrary('readStatus')">
            Read?
            <transition name="rotate">
              <font-awesome-icon 
                icon="arrow-up" 
                v-show="currentSort === 'readStatus'"
                :style="{transform: currentSortDir === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'}"              
              />
            </transition>
          </th>
          <th class="small-col"> </th>
          <th class="small-col"> </th>
      </thead>
      <tbody>
        <tr v-for="book in filteredLibrary" :key="book.title + book.author + book.pages">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td> {{ book.pages }} </td>
          <td> {{ book.readStatus }} </td>
          <td> 
            <button class="btn btn-danger btn-sm" :id="book.id" @click="deleteBook">
              <font-awesome-icon icon="trash" style="pointer-events:none" :id="book.id"/>  
            </button> 
          </td>
          <td> 
            <button class="btn btn-info btn-sm" @click="editBook" :id="book.id">
              <font-awesome-icon icon="edit" style="pointer-events:none" :id="book.id"/>    
            </button> 
          </td>
        </tr>
      </tbody>
    <br>
    <button class="btn btn-primary" @click="modalWindowOpen = true">
      <font-awesome-icon icon="plus-square" style="pointer-events: none"/>    
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
      filterText: '',
      currentSort:'name',
      currentSortDir:'asc'
    }
  },
  computed: {
    library() {
      return this.$store.state.library;
    },
    sortedLibrary() {
      return this.library.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    filteredLibrary() {
      return this.sortedLibrary.filter((el) => {
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
      /* console.log(event.target.id)
      console.log(this.$store.state.library.findIndex(book => book.id == event.target.id)) */
      let index = this.$store.state.library.findIndex(book => book.id == event.target.id);
      //console.log(index)
      this.$store.state.library.splice(index, 1);
      this.$store.commit('storeLibrary');
    },
    editBook() {
      this.modalWindowOpen = true;
      this.editWindowOpen = true;
      this.editKey = event.target.id
    },
    sortLibrary(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  },
  components: {
    appAddEditBook: AddEditBook,
  },
  created() {
    eventBus.$on('modalWindowOpen', (closed) => {
      this.modalWindowOpen = closed;
      this.editWindowOpen = closed;
      this.editKey = closed;
    })
    eventBus.$on('arrowSwitched', (newSort) => {
      this.sortAtoZ = newSort;
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
  margin: auto;
  width: 90%;
}

th {
  white-space: nowrap;
  cursor: pointer;
}

.title {
  width: 40%;
}
.author {
  width: 30%;
}
.small-col {
  width: 10%;
}

.wide-column {
  width: 30%;
}
</style>