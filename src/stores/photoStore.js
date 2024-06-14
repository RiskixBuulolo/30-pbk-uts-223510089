// stores/photoStore.js

import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photos: [],
  }),
  actions: {
    async fetchPhotos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        this.photos = await response.json()
      } catch (error) {
        console.error('Error fetching photo data:', error)
      }
    }
  }
})
