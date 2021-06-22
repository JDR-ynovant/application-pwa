import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

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
    ADD_GAME(state, payload) {
      //todo array push
      console.log(payload);
      state.currentUser.games.push(payload);
    },
  },
  actions: {
    async setCurrentUser({ commit }, userName) {
      try {
        const response = await axios.post(
          "https://candy-fight.marmog.cloud/api/users",
          { name : userName }
        );
        if (response.status === 201) {
          const user = response.data;
          commit("SET_CURRENT_USER", { user });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addGame({ commit }, gameParam) {
      try {
        const response = await axios.post(
          "https://candy-fight.marmog.cloud/api/games",
          {
            name: gameParam.gameName,
            playerCount: parseInt(gameParam.playerCount),
          },
          {
            headers: {
              "X-User": this.state.currentUser.id,
            },
          }
        );

        if (response.status === 200) {
          const game = response.data;
          commit("ADD_GAME", { game });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin]
});
