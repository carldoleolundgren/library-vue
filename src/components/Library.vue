<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="col-xs-3">Title</th>
          <th class="col-xs-3">Author</th>
          <th class="col-xs-2">Pages</th>
          <th class="col-xs-2">Read?</th>
          <th class="col-xs-2"> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in library" :key="book.title">
          <td> {{ book.title }} </td>
          <td> {{ book.author }} </td>
          <td class="small-column"> {{ book.pages }} </td>
          <td class="small-column"> {{ book.readStatus }} </td>
          <td class="small-column"> <button>Delete</button> </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    library() {
      return this.$store.state.library;
    }
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