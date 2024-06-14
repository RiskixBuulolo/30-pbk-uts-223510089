// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../components/Posts.vue';
import Todos from '../components/Todos.vue';
import Album from '../components/Album.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue'; // Impor komponen AlbumPhotos

const routes = [
  { path: '/posts', component: Posts, props: true },
  { path: '/todos', component: Todos },
  { path: '/album', component: Album },
  { path: '/albums/:albumId', component: AlbumPhotos, props: true } // Tambahkan rute untuk menampilkan daftar foto di album
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
