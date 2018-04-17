import types from '../types'
import axios from 'axios'

const state = {
  menus: []
}

const getters = {
  menus (state) {
    return state.menus
  }
}

const actions = {
  getMenus ({commit, state}) {
    axios.get('/api/menus').then(response => {
      if (response.data.errno === 0) {
        commit(types.GET_MENUS, response.data.data)
      }
    }).catch(response => {
      console.log(response)
    })
  }
}

const mutations = {
  [types.GET_MENUS] (state, data) {
    state.menus = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
