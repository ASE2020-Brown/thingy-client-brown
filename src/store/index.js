import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: {
      namespaced: true,

      state: () => ({
        username: 'xxx',
      }),

      getters: {

      },

      actions: {
        login: (context, name) => {
          context.commit('setName', name);
        }
      },

      mutations: {
        setName(state, name) {
          state.username = name;
        },
      },
    }
  }
})
