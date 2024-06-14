// stores/userStore.js

import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    users: [],
    searchQuery: '' // Tambahkan state untuk menyimpan nilai pencarian
  }),
  actions: {
    // Action to fetch users
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    // Action to update search query
    updateSearchQuery(query) {
      this.searchQuery = query;
    }
  },
});
