<script>
import { mapState } from 'vuex';
import { Notify } from 'quasar';

export default {
  name: 'RestaurantsPageHeader',
  data() {
    return {
      city: null,
      restaurantName: '',
    };
  },
  computed: {
    ...mapState('app', [
      'citiesList',
      'loadingCitiesList',
      'loadingAddingCity',
    ]),
    loading() {
      return this.loadingRestaurantsList || this.loadingAddingCity;
    },
  },
  created() {
    this.$store.dispatch('app/fetchCitiesList');
  },
  methods: {
    setCurrentCityId(city) {
      const { id } = city;
      this.$store.dispatch('app/setCurrentCityId', id);
    },
    addRestaurant() {
      if (!this.restaurantName.length) {
        Notify.create({
          color: 'negative',
          icon: 'thumb_down',
          message: 'Имя ресторана не может быть пустым',
          position: 'bottom-right',
        });
        return;
      }
      this.$store.dispatch('app/addRestaurant', { cityId: this.city.id, restaurantName: this.restaurantName });
      this.restaurantName = '';
    },
  },
};
</script>

<template>
  <div>
    <div class="q-mt-md flex row no-wrap">
      <q-select
        v-model="city"
        :options="citiesList"
        :loading="loading"
        style="width: 300px"
        label="Город"
        outlined
        :option-label="item => item === null ? '' : item.name"
        @input="setCurrentCityId($event)"
      />
    </div>
    <div v-if="city" class="q-mt-md flex row no-wrap">
      <q-input
        v-model="restaurantName"
        style="width: 300px"
        clearable
        outlined
        placeholder="Название ресторана"
      />
      <q-btn
        label="Добавить"
        class="q-ml-sm"
        color="primary"
        @click="addRestaurant"
      >
      </q-btn>
    </div>
  </div>
</template>
