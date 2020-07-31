<script>
import { Notify } from 'quasar';

export default {
  name: 'CitiesPageHeader',
  data() {
    return {
      cityName: '',
    };
  },
  methods: {
    addCity() {
      if (!this.cityName.length) {
        Notify.create({
          color: 'negative',
          icon: 'thumb_down',
          message: 'Имя города не может быть пустым',
          position: 'bottom-right',
        });
        return;
      }
      this.$store.dispatch('app/addCity', this.cityName);
      this.cityName = '';
    },
  },
};
</script>

<template>
  <div>
    <div class="q-mt-md flex row no-wrap">
      <q-input
        v-model="cityName"
        style="width: 300px"
        clearable
        outlined
        placeholder="Название города"
      />
      <q-btn
        label="Добавить"
        class="q-ml-sm"
        color="primary"
        @click="addCity"
      >
      </q-btn>
    </div>
  </div>
</template>
