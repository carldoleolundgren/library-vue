import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    library: [
      {title: 'Three Body Problem',
      author: 'Cixin Liu',
      pages: 303,
      readStatus: 'Yes'},
      {title: 'Death\'s End',
      author: 'Cixin Liu',
      pages: 433,
      readStatus: 'Yes'},
    ]
  },
  mutations: {
    addBook(state, payload) {
      state.library.push(payload)
    },
    storeLibrary() {
      let librarySerialized = JSON.stringify(this.state.library);
      localStorage.setItem('storedLibrary', librarySerialized);
      console.log(librarySerialized)
    },
    loadLibrary() {
      if (JSON.parse(localStorage.getItem('storedLibrary'))) {
        this.state.library = JSON.parse(localStorage.getItem('storedLibrary'));
      }
      //this.state.library = [];
    }
  }
});