import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global',() => {
  
  let user = reactive({
    token: localStorage.getItem('token'),
    email: null
  })

  async function getUserDetails(token){
      
    if(!token) {
      user.token = null;
        user.email = null;

          return;
      }

        let { data } = await api.get('/users/profile');
            user.token = token;
            user.email = data.user.email;
  }

  return {
    user,
    getUserDetails
  }
})