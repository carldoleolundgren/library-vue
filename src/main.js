import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faArrowUp, faTrash, faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export const eventBus = new Vue();

library.add(faArrowUp)
library.add(faTrash)
library.add(faEdit)
library.add(faPlusSquare)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  store,
  beforeCreate() { this.$store.commit('loadLibrary');},
  render: h => h(App)
})
