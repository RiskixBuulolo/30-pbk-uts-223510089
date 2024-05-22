<template>
  <div class="user-page">
    
    <form @submit.prevent="getUserPosts" class="form">
      <!-- Pilihan untuk menggunakan Nama atau ID -->
      <label>
        <input type="radio" v-model="searchType" value="name"> Cari berdasarkan Nama User
      </label>
      <label>
        <input type="radio" v-model="searchType" value="id"> Cari berdasarkan ID User
      </label><br><br>

      <div v-if="searchType === 'name'">
        <label for="userName">Nama User:</label>
        <input type="text" v-model="userName" list="userNames" id="userName" autocomplete="off" required class="input">
        <datalist id="userNames">
          <option v-for="user in filteredUsers" :key="user.id">{{ user.name }}</option>
        </datalist>
      </div>

      <div v-if="searchType === 'id'">
        <label for="userId">ID User:</label>
        <input type="number" v-model="userId" id="userId" required class="input">
      </div><br>

      <button type="submit" class="button">Tampilkan Postingan</button>
    </form>

    <div v-if="selectedUserId && userPosts.length > 0">
      <h2>Postingan oleh {{ selectedUserName }} (ID: {{ selectedUserId }})</h2>

      <!-- Input pencarian postingan -->
      <div class="pencarian">
        <label for="searchPosts">Cari Postingan:</label>
        <input type="text" v-model="searchQuery" id="searchPosts" placeholder="Cari berdasarkan judul atau isi" class="input">
      </div>

      <div v-for="post in filteredPosts" :key="post.id" class="card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      userName: '',
      userId: null,
      selectedUserName: '',
      selectedUserId: null,
      userPosts: [],
      searchQuery: '',
      searchType: 'name' // Default search type
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.userName.toLowerCase()));
    },
    filteredPosts() {
      return this.userPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  watch: {
    userName(newVal) {
      this.selectUserByName();
    },
    userId(newVal) {
      this.selectUserById();
    },
    selectedUserId(newVal) {
      if (newVal) {
        this.getUserPosts();
      }
    }
  },
  methods: {
    async getUserPosts() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
        this.userPosts = await response.json();
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    },
    selectUserByName() {
      const selectedUser = this.users.find(user => user.name.toLowerCase() === this.userName.toLowerCase());
      if (selectedUser) {
        this.selectedUserId = selectedUser.id;
        this.selectedUserName = selectedUser.name;
      } else {
        this.selectedUserId = null;
        this.selectedUserName = '';
      }
    },
    selectUserById() {
      const selectedUser = this.users.find(user => user.id === Number(this.userId));
      if (selectedUser) {
        this.selectedUserId = selectedUser.id;
        this.selectedUserName = selectedUser.name;
      } else {
        this.selectedUserId = null;
        this.selectedUserName = '';
      }
    }
  }
};
</script>

<style scoped>
.user-page {
  padding: 20px;
}

.title-user {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  margin-bottom: 20px;
}

.input {
  padding: 8px;
  margin-bottom: 10px;
}

.button {
  padding: 10px 20px;
  background-color: #00bd4f;
  color: #fff;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #00eb62;
}

.pencarian {
  margin-bottom: 20px;
}

.card {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
