import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    users: [],
    searchQuery: ''
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    }
  },
});
