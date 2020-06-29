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
      {title: 'Butt\'s End',
      author: 'Cixin Liu',
      pages: 433,
      readStatus: 'Yes'},
    ]
  },
  mutations: {
    addBook(state, payload) {
      state.library.push(payload)
    }
  }

});