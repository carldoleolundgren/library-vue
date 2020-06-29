<template>
  <div class="left-container">
        <h3>Add Book to Library:</h3>
        <form>
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
            <button type="submit" @click.prevent="addBook">Add Book 2</button>
            <button id="save-btn">Save Changes</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      author: '',
      pages: null,
      readStatus: 'No'
    }
  },
  computed: {
    library() {
      return this.$store.state.library
    }
  },
  methods: {
    addBook() {
      this.$store.commit(
        'addBook', 
        { title: this.title, author: this.author, pages: this.pages, readStatus: this.readStatus}
        );
    }
  }
}
</script>

<style scoped>

</style>