<script>
import { mapState } from 'vuex';
import PageHeader from './components/page-header';
import RestaurantsTable from './components/table';

export default {
  name: 'PageIndex',
  components: { RestaurantsTable, PageHeader },
  computed: {
    ...mapState('app', [
      'restaurantsList',
      'loadingRestaurantsList',
      'loadingDeletingRestaurant',
      'loadingAddingRestaurant',
    ]),
    loading() {
      return this.loadingRestaurantsList || this.loadingDeletingRestaurant
        || this.loadingAddingRestaurant;
    },
  },
};
</script>

<template>
  <q-page class="q-pa-sm">
    <page-header />
    <restaurants-table
      :restaurants-list="restaurantsList"
      :loading="loading"
    />
  </q-page>
</template>
