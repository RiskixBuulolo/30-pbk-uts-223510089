<template>
  <div class="container">
    <!-- Bagian Menu -->
    <div class="menu">
      <button @click="showUserPage">Post</button> &nbsp; 
      <button @click="showTodoPage">Todo List</button>
    </div><br>

    <!-- Halaman User -->
    <div v-if="currentPage === 'user'" class="user-page">
      <h1 class="title-user">Menu User</h1>
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

    <!-- Halaman Todo -->
    <div v-if="currentPage === 'todo'" class="todo-page">
      <h1 class="title-todo">Menu List</h1>
      <h1>Daftar Kegiatan Yang Akan Dilakukan</h1>
      <input type="text" v-model="tambah" placeholder="Tambah Catatan baru" @keyup.enter="buttonEnter">
      <button @click="buttonEnter">Tambah</button>

      <br>
      <div class="filter-dropdown">
        <div class="dropdown">
          <button class="dropbtn">{{ filterText }}</button>
          <div class="dropdown-content">
            <button @click="setFilter('semua')">Semua Kegiatan</button>
            <button @click="setFilter('belum')">Kegiatan Belum Selesai</button>
            <button @click="setFilter('selesai')">Kegiatan Selesai</button>
          </div>
        </div>
      </div>

      <table class="tabel">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Status</th>
            <th>List Kegiatan</th>
            <th>Keterangan</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kegiatan, index) in filteredActivities" :key="index">
            <td>{{ index + 1 }}</td>
            <td><input type="checkbox" v-model="kegiatan.selesai"></td>
            <td>
              <template v-if="index !== editIndex">
                <span :class="{ 'selesai': kegiatan.selesai }">{{ kegiatan.name }}</span>
              </template>
              <template v-else>
                <input type="text" v-model="edit" @keyup.enter="simpanedit(index)" @keyup.esc="batalEdit">
              </template>
            </td>
            <td>
              <span :class="{ 'selesai': kegiatan.selesai }">{{ kegiatan.selesai ? 'Selesai' : 'Belum Selesai' }}</span>
            </td>
            <td class="aksi">
              <template v-if="index !== editIndex">
                <button @click="editkegiatan(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M19.42 6.34a3.05 3.05 0 0 0-4.32 0L3.71 17.29a1 1 0 0 0-.29.7l-.5 2a1 1 0 0 0 1.22 1.23l2-0.5a1 1 0 0 0 .71-.3l10.95-11a3.05 3.05 0 0 0 0-4.31L19.42 6.34zm-2.83-1.41a1 1 0 0 1 1.42 0l1.41 1.41-4.24 4.24-1.41-1.41a1 1 0 0 1 0-1.42l2.82-2.82z"/>
                  </svg>
                </button>
              </template>
              <template v-else>
                <button @click="simpanedit(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M14 3H6c-1.1 0-1.99.9-1.99 2L4 19c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V9l-6-6zm-1 14H8v-2h5v2zm0-4H8v-2h5v2zm2-4H8V7h7v2z"/>
                  </svg>
                </button>
                <button @click="batalEdit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                </button>
              </template>
              <button @click="cancelkegiatan(index)" class="tombol-hapus">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 14">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM14 3V2H2v1h12z"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      userName: '',
      userId: null,
      selectedUserName: '',
      selectedUserId: null,
      userPosts: [],
      searchQuery: '',
      currentPage: 'user',
      searchType: 'name', // Default search type
      tambah: '',
      editIndex: null,
      edit: '',
      filter: 'semua',
      filterText: 'Filter Kegiatan',
      activities: []
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
    },
    filteredActivities() {
      if (this.filter === 'belum') {
        return this.activities.filter(kegiatan => !kegiatan.selesai);
      } else if (this.filter === 'selesai') {
        return this.activities.filter(kegiatan => kegiatan.selesai);
      } else {
        return this.activities;
      }
    }
  },
  watch: {
    userName(newVal) {
      this.selectUserByName();
    },
    userId(newVal) {
      this.selectUserById();
    },
    searchQuery(newVal) {
      console.log('Search query changed to:', newVal);
    },
    selectedUserId(newVal) {
      if (newVal) {
        this.getUserPosts();
      }
    },
    filter(newVal) {
      if (newVal === 'semua') {
        this.filterText = 'Semua Kegiatan';
      } else if (newVal === 'belum') {
        this.filterText = 'Kegiatan Belum Selesai';
      } else if (newVal === 'selesai') {
        this.filterText = 'Kegiatan Selesai';
      }
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
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
    },
    showUserPage() {
      this.currentPage = 'user';
    },
    showTodoPage() {
      this.currentPage = 'todo';
    },
    buttonEnter() {
      if (this.tambah.trim() !== '') {
        this.activities.push({ name: this.tambah, selesai: false });
        this.tambah = '';
      }
    },
    editkegiatan(index) {
      this.editIndex = index;
      this.edit = this.activities[index].name;
    },
    simpanedit(index) {
      if (this.edit.trim() !== '') {
        this.activities[index].name = this.edit;
        this.editIndex = null;
        this.edit = '';
      }
    },
    batalEdit() {
      this.editIndex = null;
      this.edit = '';
    },
    cancelkegiatan(index) {
      this.activities.splice(index, 1);
      if (index === this.editIndex) {
        this.batalEdit();
      }
    },
    setFilter(filter) {
      this.filter = filter;
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
