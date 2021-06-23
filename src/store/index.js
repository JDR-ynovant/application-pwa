import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { postMessage } from "../service/swCommunication";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentGame: null,
    currentGrid: null,
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentGame(state) {
      return state.currentGame;
    },
    getCurrentGrid(state) {
      return state.currentGrid;
    },
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload.user;
    },
    ADD_GAME(state, payload) {
      state.currentUser.games.push(payload.game);
    },
    SET_CURRENT_GAME(state, payload) {
      state.currentGame = payload.game;
    },
    SET_CURRENT_grid(state, payload) {
      state.currentGrid = payload.grid;
    },
    START_GAME(state, payload) {
      const index = state.currentUser.games.findIndex(
        (game) => game.id === payload.gameId
      );
      state.currentUser.games[index].status = "started";
    },
    REINITIALIZE_CURRENT_STATE(state) {
      state.currentGame = null;
      state.currentGrid = null;
    },
    ADD_TURN(state, payload) {
      const index = state.currentUser.games.findIndex(
        (game) => game.id === payload.gameId
      );
      state.currentUser.games[index].turns.push(payload.turn);
    },
  },
  actions: {
    reinitializeCurrentState({ commit }) {
      commit("REINITIALIZE_CURRENT_STATE");
    },
    async setCurrentUser({ commit }, userName) {
      try {
        const response = await this._vm.axios.post(
          "https://candy-fight.marmog.cloud/api/users",
          { name: userName }
        );
        if (response.status === 201) {
          const user = response.data;
          commit("SET_CURRENT_USER", { user });
          postMessage({ kind: "subscription", user });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addGame({ commit }, gameParam) {
      try {
        const response = await this._vm.axios.post(
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
    async setCurrentGame({ commit }, gameId) {
      try {
        const response = await this._vm.axios.get(
          `https://candy-fight.marmog.cloud/api/games/${gameId}`,
          {
            headers: {
              "X-User": this.state.currentUser.id,
            },
          }
        );
        if (response.status === 200) {
          const game = response.data;
          commit("SET_CURRENT_GAME", { game });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async startGame({ commit }, gameId) {
      try {
        const response = await this._vm.axios.post(
          `https://candy-fight.marmog.cloud/api/games/${gameId}/start`,
          {},
          {
            headers: {
              "X-User": this.state.currentUser.id,
              id: gameId,
            },
          }
        );
        if (response.status === 200) {
          commit("START_GAME", { gameId });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async setCurrentGrid({ commit }, gridId) {
      try {
        const response = await this._vm.axios.get(
          `https://candy-fight.marmog.cloud/api/grids/${gridId}`,
          {
            headers: {
              "X-User": this.state.currentUser.id,
            },
          }
        );
        if (response.status === 200) {
          const grid = response.data;
          commit("SET_CURRENT_grid", { grid });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async applyTurn({ commit }, { gameId, turn }) {
      commit("ADD_TURN", { gameId, turn });
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
});
