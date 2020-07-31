<script>
import { mapState } from 'vuex';

export default {
  name: 'RestaurantsTable',
  props: {
    restaurantsList: {
      type: Array,
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      confirmRemove: false,
      editDialog: false,

      currentRemovingItemId: null,
      currentEditingItemId: null,
      currentEditingItemName: '',

      pagination: {
        sortBy: 'id',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'id ресторана',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Название ресторана',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'actions',
          required: true,
          label: '',
          align: 'left',
          field: 'actions',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapState('app', [
      'rowsNumber',
      'currentCityId',
    ]),
  },
  watch: {
    restaurantsList() {
      this.pagination = {
        ...this.pagination,
        rowsNumber: this.rowsNumber,
      };
    },
    currentCityId() {
      this.pagination = {
        sortBy: 'id',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: this.rowsNumber,
      };
    },
  },
  methods: {
    openConfirmDialog(id) {
      this.confirmRemove = true;
      this.currentRemovingItemId = id;
    },
    deleteItem(id) {
      this.$store.dispatch('app/deleteRestaurant', id);
    },
    openEditDialog(id, name) {
      this.editDialog = true;
      this.currentEditingItemId = id;
      this.currentEditingItemName = name;
    },
    editItem(id, name) {
      this.$store.dispatch('app/editRestaurant', { id, name })
        .then(() => {
          this.$store.dispatch('app/fetchRestaurantsList', this.pagination);
        });
    },
    onRequest(props) {
      const { pagination } = props;
      this.$store.dispatch('app/fetchRestaurantsList', pagination);
      this.pagination = { ...pagination };
    },
  },
};
</script>

<template>
  <div class="q-mt-md">
    <q-table
      v-if="restaurantsList.length"
      title="Рестораны"
      :data="restaurantsList"
      :columns="columns"
      :loading="loading"
      row-key="id"
      :pagination.sync="pagination"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
        >
          <q-td
            key="id"
            :props="props"
            style="width: 150px"
          >
            {{ props.row.id }}
          </q-td>
          <q-td
            key="name"
            :props="props"
            style="width: 300px"
          >
            {{ props.row.name }}
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <div class="flex items-center justify-end no-wrap q-gutter-x-xs">
              <q-btn
                flat
                color="primary"
                icon="edit"
                @click="openEditDialog(props.row.id, props.row.name)"
              >
                <q-tooltip>
                  Редактировать
                </q-tooltip>
              </q-btn>
              <q-btn
                flat
                color="primary"
                icon="delete"
                @click="openConfirmDialog(props.row.id)"
              >
                <q-tooltip>
                  Удалить
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      v-model="confirmRemove"
      persistent
    >
      <q-card>
        <q-card-section class="text-center">
          Подтвердите удаление
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Отмена"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Подтверждение"
            color="primary"
            @click="deleteItem(currentRemovingItemId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="editDialog"
      persistent
    >
      <q-card>
        <q-card-section class="text-center">
          <q-input
            v-model="currentEditingItemName"
            label="Название ресторана"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Отмена"
            color="primary"
          />
          <q-btn
            v-close-popup
            label="Подтверждение"
            color="primary"
            :disable="!currentEditingItemName.length"
            @click="editItem(currentEditingItemId, currentEditingItemName)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
