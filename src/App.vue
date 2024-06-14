<template>
<<<<<<< HEAD
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" />
        <q-toolbar-title>
          Riski Buulolo 223510089 UAS
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable @click="showUserPage">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            Post
          </q-item-section>
        </q-item>
        <q-item clickable @click="showTodoPage">
          <q-item-section avatar>
            <q-icon name="checklist" />
          </q-item-section>
          <q-item-section>
            Todo List
          </q-item-section>
        </q-item>
        <q-item clickable @click="showAlbumPage">
          <q-item-section avatar>
            <q-icon name="photo_album" />
          </q-item-section>
          <q-item-section>
            Album
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <Slot :menuType="currentMenuType" />
      <router-view :users="usersData" :photos="photosData"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import router from './routes/router';
import Slot from './components/Slot.vue';

export default {
  components: { Slot },
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false); 
    const usersData = ref([]);
    const photosData = ref([]);
    const currentMenuType = ref('');
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        usersData.value = await response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPhotoData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        photosData.value = await response.json();
      } catch (error) {
        console.error('Error fetching photo data:', error);
      }
    };

    fetchUserData();
    fetchPhotoData();

    const showUserPage = () => {
      currentMenuType.value = 'user';
      router.push('/posts');
    };

    const showTodoPage = () => {
      currentMenuType.value = 'todo';
      router.push('/todos');
    };

    const showAlbumPage = () => {
      currentMenuType.value = 'album';
      router.push('/album');
    };

    watch(
      () => router.currentRoute.value.path,
      (newPath) => {
        if (newPath.includes('/posts')) {
          currentMenuType.value = 'user';
        } else if (newPath.includes('/todos')) {
          currentMenuType.value = 'todo';
        } else if (newPath.includes('/album')) {
          currentMenuType.value = 'album';
        } else {
          currentMenuType.value = '';
        }
      }
    );

    return {
      leftDrawerOpen,
      usersData,
      photosData, 
      currentMenuType,
      showUserPage,
      showTodoPage,
      showAlbumPage,
    };
=======
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
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
  }
};
</script>

<style scoped>
.container {
<<<<<<< HEAD
  padding: 16px;
=======
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
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
}
</style>
