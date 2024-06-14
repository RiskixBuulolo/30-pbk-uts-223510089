<template>
    <div class="slot-container">
      <!-- Tampilkan kata-kata khusus untuk menu USER -->
      <h2 v-if="menuType === 'user'">Menu User</h2>
      <!-- Tampilkan kata-kata khusus untuk menu TODOS -->
      <h2 v-else-if="menuType === 'todo'">Menu Todos</h2>
      <!-- Tampilkan kata-kata khusus untuk menu ALBUM -->
      <h2 v-else-if="menuType === 'album'">Menu Album</h2>

    </div>
  </template>
  
  <script>
  export default {
    name: 'Slot',
    props: {
      menuType: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
.slot-container {
  /* Penyesuaian gaya container slot */
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.201); /* Background color putih */
  border-radius: 8px; /* Corner radius */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow */
}

.slot-container h2 {
  font-size: 20px;
  margin-bottom: 0.1px;
}
  </style>