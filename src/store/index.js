import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload.user;
    },
  },
  actions: {
    setCurrentUser({ commit }) {
      try {
        const user = {
          id: "<un super id>",
          name: "kamhan",
          games: [
            // TODO: pensez à bien faire des référence
            "<une reference à une partie>",
          ],
        };
        commit("SET_CURRENT_USER", { user });
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
