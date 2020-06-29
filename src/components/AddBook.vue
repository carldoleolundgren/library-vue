<template>
  <transition name="fade">
    <div class="modal-backdrop"
    v-if="isOpen"
    :class="{open: isOpen}"
    @click.self="closeAddBookWindow"
    >
      <form >
        <h3>Add a new book:</h3>
        <input type="text" placeholder="Title" required v-model="title"/> <br>
        <input type="text" placeholder="Author" required v-model="author"/> <br>
        <input type="number" placeholder="Number of pages" required v-model="pages"/> <br>
        <div id="read-status">
          <p id="read-question">Have you read it?</p>
          <select id="read-selector" v-model="readStatus"> 
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Reading">Reading</option>
            </select>
        </div> <br>
        <button class="btn btn-primary" type="submit" @click.prevent="addBook(); closeAddBookWindow();">Add Book 2</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { eventBus } from '../main'

export default {
  props: {
    isOpen: Boolean,
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
  },
  methods: {
    addBook() {
      this.$store.commit(
        'addBook', 
        { title: this.title, author: this.author, pages: this.pages, readStatus: this.readStatus}
        );
      this.title = '';
      this.author = ''; 
      this.pages = '';
      this.readStatus = '';
    },
    closeAddBookWindow() {
      eventBus.$emit('addBookWindowClosed', false)
    }
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