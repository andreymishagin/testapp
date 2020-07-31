<script>
import { mapState } from 'vuex';
import CityFilter from './components/city-filter';
import RestaurantsTable from './components/table';

export default {
  name: 'PageIndex',
  components: { RestaurantsTable, CityFilter },
  computed: {
    ...mapState('app', [
      'restaurantsList',
      'loadingRestaurantsList',
      'loadingDeletingRestaurant',
    ]),
    loading() {
      return this.loadingRestaurantsList || this.loadingDeletingRestaurant;
    },
  },
};
</script>

<template>
  <q-page class="q-pa-sm">
    <city-filter />
    <restaurants-table
      :restaurants-list="restaurantsList"
      :loading="loading"
    />
  </q-page>
</template>
