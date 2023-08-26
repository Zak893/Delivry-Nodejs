
export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    // userData: null
  },


  mutations: {
    // setUserData(state, userData) {
    //   state.userData = userData
    // },

    setAuthentication(state, value){
      state.isAuthenticated = value
    },
    
    logout(state){
      state.isAuthenticated = false
      localStorage.removeItem("DeliveryAppToken");
    }
  },

  getters: {
    isAuth(state) {
      return state.isAuthenticated
    },
    // getUser(state) {
    //   return state.userData
    // }
  },
}