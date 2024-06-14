<template>
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