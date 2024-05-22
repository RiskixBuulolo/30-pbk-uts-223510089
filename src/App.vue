<template>
  <div class="container">
    <!-- Bagian Menu -->
    <div class="menu">
      <button @click="showUserPage">Post</button> &nbsp;
      <!-- Mengubah tombol menu "Slot" menjadi "Todo" -->
      <button @click="showTodoPage">Todo List</button>
    </div><br>

    <!-- Menambahkan properti menuType untuk Slot.vue -->
    <Slot :menuType="currentPage"></Slot>

    <!-- Halaman User -->
    <Posts v-if="currentPage === 'user'" :users="users"></Posts>

    <!-- Halaman Todo -->
    <Todos v-if="currentPage === 'todo'" :activities="activities"></Todos>
  </div>
</template>

<script>
import Posts from './components/Posts.vue';
import Todos from './components/Todos.vue';
import Slot from './components/Slot.vue';

export default {
  components: {
    Posts,
    Todos,
    Slot
  },
  data() {
    return {
      currentPage: 'user',
      users: [],
      activities: []
    };
  },
  mounted() {
    this.loadUsers();
    this.loadActivities();
  },
  methods: {
    showUserPage() {
      this.currentPage = 'user';
    },
    // Mengubah method untuk menampilkan halaman Todo
    showTodoPage() {
      this.currentPage = 'todo';
    },
    async loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async loadActivities() {
      // Initialize with some activities
      this.activities = [];
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.menu button {
  padding: 10px 20px;
  background-color: #00bd4f;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.menu button:hover {
  background-color: #00eb62;
}
</style>
