import Vue from 'vue'
import Vuex from 'vuex'

import menus from './modules/menus.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menus
  }
})
