import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Axios from 'axios'
// import qs from 'qs'
// import { stat } from 'fs';
// const rootPath = process.env.NODE_ENV === 'production'?process.env.API_ROOT:''

Vue.use(Vuex)

// const types = {
// }

const state = {
  token: '',
}

const getters = {
  getToken(state) {
    return state.token
  },
}

const actions = {
  // 登录授权
  
}

const mutations = {
  
}

const middlewares = store => {
    store.subscribe((mutation, state) => {
  
    })
  }
  
  const module = {
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState(), middlewares]
  }
  const store = new Vuex.Store(module)
  export default store