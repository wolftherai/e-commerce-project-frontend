import { User } from '@/models/user'
import Vue from 'vue'
import Vuex, {Commit} from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new User()
  },
  getters: {
  },
  mutations: {
    SET_USER(state: {user: User}, user: User)
    {
      state.user= user;
    }
  },
  actions: {
    //setUser
    setUser({commit}: {commit: Commit}, user: User)
    {
      return commit('SET_USER', user)
    }
  }
})
