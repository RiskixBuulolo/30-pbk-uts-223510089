<template>
<<<<<<< HEAD
  <q-page padding>
    <div class="container">
      <h1>Daftar Kegiatan Yang Akan Dilakukan</h1>
      <p>{{ propertiContoh }}</p> <!-- Properti yang ditampilkan -->
      <q-input v-model="tambahName" label="Tambah Catatan baru" @keyup.enter="buttonEnter" outlined></q-input>
      <q-btn @click="buttonEnter" label="Tambah" color="primary" class="q-mt-sm"></q-btn>

      <div class="filter-dropdown q-mt-lg">
        <q-btn-dropdown label="Filter Kegiatan" color="primary">
          <q-list>
            <q-item clickable v-ripple @click="setFilter('semua')">
              <q-item-section>Semua Kegiatan</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="setFilter('belum')">
              <q-item-section>Kegiatan Belum Selesai</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="setFilter('selesai')">
              <q-item-section>Kegiatan Selesai</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <div class="task-counts q-mt-md">
        <p>Total Kegiatan: {{ totalKegiatan }}</p>
        <p>Kegiatan Belum Selesai: {{ totalBelumSelesai }}</p>
        <p>Kegiatan Selesai: {{ totalSelesai }}</p>
      </div>

      <q-table :rows="filteredActivities" :columns="columns" row-key="name" flat class="tabel">
        <template v-slot:body-cell-index="props">
          <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
        </template>

        <template v-slot:body-cell-selesai="props">
          <q-td :props="props">
            <q-checkbox v-model="props.row.selesai" @update:model-value="updateKeterangan(props.row)"/>
          </q-td>
        </template>

        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <template v-if="props.rowIndex !== editIndex">
              <span :class="{ selesai: props.row.selesai }">{{ props.row.name }}</span>
            </template>
            <template v-else>
              <q-input v-model="editName" @keyup.enter="simpanedit(props.rowIndex)" @keyup.esc="batalEdit" outlined></q-input>
            </template>
          </q-td>
        </template>

        <template v-slot:body-cell-keterangan="props">
          <q-td :props="props">
            <span>{{ props.row.keterangan }}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <template v-if="props.rowIndex !== editIndex">
              <q-btn flat round icon="edit" @click="editkegiatan(props.rowIndex)"></q-btn>
            </template>
            <template v-else>
              <q-btn flat round icon="save" @click="simpanedit(props.rowIndex)"></q-btn>
              <q-btn flat round icon="cancel" @click="batalEdit"></q-btn>
            </template>
            <q-btn flat round icon="delete" class="tombol-hapus" @click="cancelkegiatan(props.rowIndex)"></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { useTodoStore } from '../stores/todoStore';
import { computed, ref } from 'vue';

export default {
  props: ['propertiContoh'],
  setup(props) {
    const store = useTodoStore();

    const tambahName = ref('');
    const editIndex = ref(null);
    const editName = ref('');

    const buttonEnter = () => {
      try {
        console.log('Button Enter Pressed');
        if (tambahName.value.trim() !== '') {
          console.log('Adding Activity:', tambahName.value);
          store.addActivity(tambahName.value);
          tambahName.value = '';
        }
      } catch (error) {
        console.error('Error in buttonEnter:', error);
      }
    };

    const editkegiatan = (index) => {
      editIndex.value = index;
      editName.value = store.activities[index].name;
    };

    const simpanedit = (index) => {
      if (editName.value.trim() !== '') {
        store.updateActivityName(index, editName.value);
        editIndex.value = null;
        editName.value = '';
      }
    };

    const batalEdit = () => {
      editIndex.value = null;
      editName.value = '';
    };

    const cancelkegiatan = (index) => {
      store.deleteActivity(index);
      if (index === editIndex.value) {
        batalEdit();
      }
    };

    const setFilter = (newFilter) => {
      store.setFilter(newFilter);
    };

    const updateKeterangan = (activity) => {
      store.updateActivityStatus(activity);
    };

    return {
      propertiContoh: props.propertiContoh,
      tambahName,
      editIndex,
      editName,
      filter: computed(() => store.filter),
      columns: [
        { name: 'index', label: 'Nomor', align: 'left', field: 'index' },
        { name: 'selesai', label: 'Status', align: 'center', field: 'selesai', sortable: true },
        { name: 'name', label: 'List Kegiatan', align: 'left', field: 'name', sortable: true },
        { name: 'keterangan', label: 'Keterangan', align: 'left', field: 'keterangan' },
        { name: 'actions', label: '', align: 'right' }
      ],
      filteredActivities: computed(() => store.filteredActivities),
      buttonEnter,
      editkegiatan,
      simpanedit,
      batalEdit,
      cancelkegiatan,
      setFilter,
      updateKeterangan,
      totalKegiatan: computed(() => store.totalKegiatan),
      totalBelumSelesai: computed(() => store.totalBelumSelesai),
      totalSelesai: computed(() => store.totalSelesai)
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
}

.container {
  padding: 20px;
}

.selesai {
  text-decoration: line-through;
}

.tombol-hapus {
  color: red;
}

.task-counts p {
  margin: 0;
  padding: 5px 0;
}

.tabel {
  background-color: rgba(255, 255, 255, 0.459);
}
</style>
=======
  <div class="container">
    <h1>Daftar Kegiatan Yang Akan Dilakukan</h1>
    <p>{{ propertiContoh }}</p> <!-- Properti yang ditampilkan -->
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
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>
</button>
        </td>
      </tr>
    </tbody>
  </table>
  <p>{{ propertiContoh }}</p> <!-- Properti yang ditampilkan -->
</div>
</template>

<script>
export default {
  props: ['propertiContoh'], // Properti yang diterima
  data() {
    return {
      activities: [],
      tambah: '',
      editIndex: null,
      edit: '',
      filter: 'semua', // Default filter: show semua activities
      filterText: 'Filter Kegiatan' // Default filter text
    };
  },
  computed: {
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
  methods: {
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
      // Update filterText based on selected filter
      if (filter === 'semua') {
        this.filterText = 'Semua Kegiatan';
      } else if (filter === 'belum') {
        this.filterText = 'Kegiatan Belum Selesai';
      } else if (filter === 'selesai') {
        this.filterText = 'Kegiatan Selesai';
      }
    }
  }
};
</script>
>>>>>>> 692fe91f7ac8b0d2dc1906abed0491147de045e1
