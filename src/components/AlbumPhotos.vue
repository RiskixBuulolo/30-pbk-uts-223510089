<template>
  <div class="album-photos-page">
    <h2>Photos in Album {{ albumId }}</h2>
    <button @click="goBack" class="back-button">Kembali</button>

    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="!hasMorePhotos">Next</button>
    </div>
    
    <div class="cards-container">
      <q-card v-for="photo in paginatedPhotos" :key="photo.id" class="my-card">
        <img :src="photo.thumbnailUrl" alt="Thumbnail" loading="eager">
        <q-card-section>
          <div class="text-h6">{{ photo.title }}</div>
          <div class="text-subtitle2">{{ photo.id }}</div>
          <a :href="photo.url" class="url">{{ photo.url }}</a>
          <button @click="viewPhoto(photo)" class="view-button">View</button>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="isDialogOpen" persistent>
      <q-card class="photo-dialog-card">
        <q-card-section>
          <div class="row items-center no-wrap">
            <q-btn icon="close" flat round dense @click="isDialogOpen = false" />
            <div class="text-h6 q-ml-sm">{{ selectedPhoto.title }}</div>
          </div>
        </q-card-section>
        <q-img :src="selectedPhoto.url" :alt="selectedPhoto.title" contain class="full-image" />
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="isDialogOpen = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const albumId = route.params.albumId;
    const isDialogOpen = ref(false);
    const selectedPhoto = ref({});
    const currentPage = ref(1);
    const photosPerPage = 12; // Number of photos per page

    const albumPhotos = computed(() => {
      return props.photos.filter(photo => photo.albumId === parseInt(albumId));
    });

    const paginatedPhotos = computed(() => {
      const start = (currentPage.value - 1) * photosPerPage;
      const end = start + photosPerPage;
      return albumPhotos.value.slice(start, end);
    });

    const hasMorePhotos = computed(() => {
      const start = currentPage.value * photosPerPage;
      return start < albumPhotos.value.length;
    });

    const goBack = () => {
      router.push('/album');
    };

    const viewPhoto = (photo) => {
      selectedPhoto.value = photo;
      isDialogOpen.value = true;
    };

    const nextPage = () => {
      if (hasMorePhotos.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    return {
      albumId,
      paginatedPhotos,
      isDialogOpen,
      selectedPhoto,
      goBack,
      viewPhoto,
      nextPage,
      previousPage,
      currentPage,
      hasMorePhotos
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
}

.album-photos-page {
  padding: 20px;
}

.back-button, .view-button {
  padding: 10px 20px;
  background-color: #007ef3;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.back-button:hover, .view-button:hover {
  background-color: #0072dc;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.q-pa-md {
  padding: 16px;
}

.q-gutter-md {
  gap: 16px;
}

.my-card {
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px;
  background-color: rgba(255, 253, 253, 0.582);
}

.q-card img {
  max-width: 100%;
  height: auto;
}

.q-card-section {
  padding: 16px;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
}

.text-subtitle2 {
  font-size: 1rem;
  color: #666;
}

.q-pt-none {
  padding-top: 0;
}

.url {
  display: block;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  color: #007ef3;
  text-decoration: none;
  margin-top: 10px;
}

.url:hover {
  text-decoration: underline;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-controls button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #007ef3;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #0072dc;
}

.photo-dialog-card {
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden; /* Ensure no scrollbars */
}

.full-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}
</style>
