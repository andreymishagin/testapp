<script>

export default {
  name: 'CitiesTable',
  props: {
    citiesList: {
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
      currentRemovingItemId: null,

      addDialog: false,
      cityName: '',

      editDialog: false,
      currentEditingItemId: null,
      currentEditingItemName: '',

      columns: [
        {
          name: 'id',
          required: true,
          label: 'id города',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Название города',
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
  methods: {
    openConfirmDialog(id) {
      this.confirmRemove = true;
      this.currentRemovingItemId = id;
    },
    deleteItem(id) {
      this.$store.dispatch('app/deleteCity', id);
    },
    openEditDialog(id, name) {
      this.editDialog = true;
      this.currentEditingItemId = id;
      this.currentEditingItemName = name;
    },
    editItem(id, name) {
      this.$store.dispatch('app/editCity', { id, name });
    },
    openAddDialog() {
      this.addDialog = true;
    },
    addCity() {
      this.$store.dispatch('app/addCity', this.cityName);
      this.cityName = '';
    },
  },
};
</script>

<template>
  <div class="q-mt-md">
    <div v-if="!citiesList.length && !loading" class="flex flex-center fit">
      <h6 style="text-align: center">
        В списке городов нет ни одной записи. Пожалуйста добавьте хотя бы один город.
      </h6>
    </div>
    <q-table
      :data="citiesList"
      :columns="columns"
      :loading="loading"
    >
      <template
        v-slot:top
      >
        <div class="text-h6">Города</div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          @click="openAddDialog()"
        >
          <q-tooltip>
            Добавить город
          </q-tooltip>
        </q-btn>
      </template>
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
        <q-card-section class="text-h6 text-weight-light text-uppercase">
          Удаление города
        </q-card-section>

        <q-separator />

        <q-card-section class="text-center">
          При удалении города - удаляются все рестораны
          <q-icon
            name="warning"
            size="sm"
            color="primary"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Нет"
            color="primary"
          />
          <q-btn
            v-close-popup
            label="Да"
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
        <q-card-section class="text-h6 text-weight-light text-uppercase">
          Редактирование города
        </q-card-section>

        <q-separator />

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
            label="Сохранить"
            color="primary"
            :disable="!currentEditingItemName.length"
            @click="editItem(currentEditingItemId, currentEditingItemName)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addDialog"
      persistent
    >
      <q-card>
        <q-card-section class="text-h6 text-weight-light text-uppercase">
          Добавить город
        </q-card-section>

        <q-separator />
        <q-card-section class="text-center">
          <q-input
            v-model="cityName"
            style="width: 300px"
            label="Название города"
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
            label="Добавить"
            color="primary"
            :disable="!cityName.length"
            @click="addCity"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
