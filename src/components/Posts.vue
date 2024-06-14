<template>
  <div class="user-page">
<<<<<<< HEAD
    <form @submit.prevent="getUserPosts" class="form">
      <div class="search-options">
        <label>
          <input type="radio" v-model="searchType" value="name"> Cari berdasarkan Nama User
        </label>
        <label>
          <input type="radio" v-model="searchType" value="id"> Cari berdasarkan ID User
        </label>
      </div>
      <div v-if="searchType === 'name'">
        <label for="userName">Nama User:</label>
        <input type="text" v-model="searchValue" list="userNames" id="userName" autocomplete="off" required class="input">
        <datalist id="userNames">
          <option v-for="user in users" :value="user.name" :key="user.id">{{ user.name }}</option>
        </datalist>
      </div>
      <div v-if="searchType === 'id'">
        <label for="userId">ID User:</label>
        <input type="number" v-model.number="searchValue" id="userId" required class="input">
      </div>
      <button type="submit" class="button">Tampilkan Postingan</button>
    </form>

    <div v-if="loading" class="loading-container">
      <q-spinner color="primary" size="50px" />
    </div>

    <div v-if="selectedUserId && userPosts.length > 0 && !loading" class="post-container">
      <q-card class="my-card post-card-container">
        <q-card-section>
          <h2 class="text-h6">Postingan oleh {{ selectedUserName }} (ID: {{ selectedUserId }})</h2>
        </q-card-section>

        <!-- Input pencarian postingan -->
        <q-card-section class="search-posts">
          <label for="searchPosts">Cari Postingan:</label>
          <input type="text" v-model="searchQuery" id="searchPosts" placeholder="Cari berdasarkan judul atau isi" class="input">
        </q-card-section>

        <q-separator />

        <div class="post-list">
          <q-card-section v-for="post in filteredPosts" :key="post.id" class="post-card">
            <q-card class="my-card text-white"
              style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
              <q-card-section>
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </q-card>
=======
    
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
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '../stores/userStore'; // Import Pinia store

export default defineComponent({
=======
export default {
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
  props: {
    users: {
      type: Array,
      required: true
    }
  },
<<<<<<< HEAD
  setup(props) { // Menerima props sebagai parameter setup
    const userStore = useUserStore();

    // Component data
    const searchType = ref('name'); // Default search type
    const searchValue = ref('');
    const userPosts = ref([]);
    const searchQuery = ref('');
    const selectedUserId = ref(null);
    const selectedUserName = ref('');
    const loading = ref(false); // Loading state

    // Method to fetch user posts
    const fetchUserPosts = async (userId) => {
      loading.value = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        userPosts.value = await response.json();
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        loading.value = false;
      }
    };

    // Method to select user by name
    const selectUserByName = () => {
      const selectedUser = props.users.find(user => user.name.toLowerCase() === searchValue.value.toLowerCase()); // Menggunakan props.users
      if (selectedUser) {
        selectedUserId.value = selectedUser.id;
        selectedUserName.value = selectedUser.name;
        fetchUserPosts(selectedUser.id);
      } else {
        // Handle case when user not found
      }
    };

    // Method to select user by ID
    const selectUserById = () => {
      const selectedUser = props.users.find(user => user.id === parseInt(searchValue.value)); // Menggunakan props.users
      if (selectedUser) {
        selectedUserId.value = selectedUser.id;
        selectedUserName.value = selectedUser.name;
        fetchUserPosts(selectedUser.id);
      } else {
        // Handle case when user not found
      }
    };

    // Method to get user posts
    const getUserPosts = () => {
      if (searchType.value === 'name') {
        selectUserByName();
      } else if (searchType.value === 'id') {
        selectUserById();
      }
    };

    // Computed property for filtered posts
    const filteredPosts = computed(() => {
      return userPosts.value.filter(post =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Return data, computed properties, and methods
    return {
      searchType,
      searchValue,
      userPosts,
      searchQuery,
      selectedUserId,
      selectedUserName,
      loading,
      getUserPosts,
      filteredPosts
    };
  }
});
</script>


=======
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

>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
<style scoped>
.user-page {
  padding: 20px;
}

<<<<<<< HEAD
.post-container {
  display: flex;
  justify-content: center;
}

.post-card-container {
  max-width: 600px; /* Sesuaikan dengan lebar yang diinginkan */
  background-color: rgba(255, 255, 255, 0.326);
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 500px; /* Fixed height for the scrollable container */
  overflow-y: auto; /* Enables vertical scrolling */
}

.post-card {
  margin: 10px 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
=======
.title-user {
  font-size: 24px;
  margin-bottom: 20px;
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
}

.form {
  margin-bottom: 20px;
}

.input {
<<<<<<< HEAD
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #00bd4f;
}

.button {
  padding: 12px 24px;
  background-color: #007ef3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0072dc;
}

.search-options {
  margin-bottom: 20px;
}

.search-posts {
=======
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
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
  margin-bottom: 20px;
}

.card {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
<<<<<<< HEAD
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.25em; /* 20px */
}

.card p {
  color: #666;
}

h2 {
  font-size: 1.5em; /* 24px */
}

.my-card {
  border-radius: 10px;
}

.text-h6 {
  font-size: 1.25rem; /* Ukuran font untuk text-h6 */
}

.input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.post-card {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.326);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
}

.post-card p {
  margin-top: 0;
  color: white;
=======
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
}
</style>
