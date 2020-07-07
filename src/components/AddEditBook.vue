<template>
  <transition name="fade">
    <div class="modal-backdrop"
    v-if="isOpen"
    :class="{open: isOpen}"
    @click.self="closeModalWindow"
    >
      <form >
        <slot name="modalHeader"></slot>
        <p class="text-danger" v-if="errorsPresent">Please complete all fields</p>
        <!-- <br> <p>Editing Book: {{isEditingBook}} | Edit Key: {{ editKey }} | Edit Index: {{ editIndex }}</p> -->
        <input type="text" placeholder="Title" v-model="title"/> <br>
        <input type="text" placeholder="Author" v-model="author"/> <br>
        <input type="number" placeholder="Number of pages" v-model="pages"/> <br>
        <div id="read-status">
          <p id="read-question">Have you read it?</p>
          <select id="read-selector" v-model="readStatus"> 
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Reading">Reading</option>
            </select>
        </div> <br>
        <button class="btn btn-success" type="submit" v-if="isEditingBook" @click.prevent="saveChanges()">Save Changes</button>
        <button class="btn btn-primary" type="submit" v-else @click.prevent="addBook()">Add Book</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { eventBus } from '../main'

export default {
  props: {
    isOpen: Boolean,
    isEditingBook: Boolean,
    editKey: null
  },
  data() {
    return {
      title: '',
      author: '',
      pages: null,
      readStatus: 'No',
    }
  },
  computed: {
    library() {
      return this.$store.state.library
    },
    id() {
      return this.title.toLowerCase() + this.author.toLowerCase() + this.pages
    },
    editIndex() {
      let editIndex = this.$store.state.library.findIndex(book => book.id == this.editKey);
      
      if (this.isEditingBook) {
        /* eslint-disable*/        
        this.title = this.$store.state.library[editIndex].title;
        this.author = this.$store.state.library[editIndex].author;
        this.pages = this.$store.state.library[editIndex].pages;
        this.readStatus = this.$store.state.library[editIndex].readStatus;
        /* esline-enable */
      }
      return editIndex;
    },
    errorsPresent() {
      if (this.title === '' || this.author === '' || this.pages == null || this.pages == 0) {
        return true; 
      } else {
        return false;
      }
    },
  },
  methods: {
    addBook() {
      if (this.errorsPresent) {
        return;
      } else if (this.$store.state.library.findIndex(book => book.id == this.id) !== -1) {
        alert('This book already exists in your library - please enter another.');
        return;
      } else {
        this.$store.commit(
          'addBook', 
          { 
            title: this.title, 
            author: this.author, 
            pages: this.pages, 
            readStatus: this.readStatus,
            id: this.id
          }
        );
        this.$store.commit('storeLibrary');
        console.log(this.$store.state.library)
        this.title = '';
        this.author = ''; 
        this.pages = '';
        this.readStatus = 'No';
        this.closeModalWindow();
      }
    },
    saveChanges() {
      if (this.errorsPresent) {
        return;
      } else if (this.$store.state.library.findIndex(book => book.id == this.id) !== -1) {
        alert('This book already exists in your library - please enter another.');
        return;
      } else {
        this.$store.state.library[this.editIndex].title = this.title;
        this.$store.state.library[this.editIndex].author = this.author;
        this.$store.state.library[this.editIndex].pages = this.pages;
        this.$store.state.library[this.editIndex].readStatus = this.readStatus;
        this.$store.state.library[this.editIndex].id = this.id;

        this.$store.commit('storeLibrary');
        this.closeModalWindow();
      }
    },    
    closeModalWindow() {
      this.title = '';
      this.author = ''; 
      this.pages = '';
      this.readStatus = 'No';
      eventBus.$emit('modalWindowOpen', false)
    }
  },
  created() {
    console.log('created')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style scoped>
.modal-backdrop {
  background: rgba(250, 250, 250, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

form {
  width: 30rem;
  background: rgb(255, 255, 255);
  padding: 1.5rem 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  z-index: 10;
}

form > input {
  width: 100%;
  margin: 1% 0%;
}

.modal-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: rgb(100, 100, 100);
}
.modal-body {
  color: rgb(180, 180, 180);
}

.fade-enter-active, .fade-leave-active {
  transition: 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter .modal-dialog, .fade-leave-to .modal-dialog {
  transform: translateY(-20%);
}

p, select {
  display: inline-block;
}

select {
  float: right;
}
</style>