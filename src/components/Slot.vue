<template>
    <div class="slot-container">
      <h2 v-if="menuType === 'user'">Menu User</h2>
      <h2 v-else-if="menuType === 'todo'">Menu Todos</h2>
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
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.201);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.slot-container h2 {
  font-size: 20px;
  margin-bottom: 0.1px;
}
  </style>