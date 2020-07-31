<script>
import { mapState } from 'vuex';
import RestaurantsPageHeader from './components/restaurants-page-header';
import RestaurantsTable from './components/restaurants-table';
import CitiesTable from './components/cities-table';
import CitiesPageHeader from './components/cities-page-header';

export default {
  name: 'PageIndex',
  components: {
    CitiesPageHeader, CitiesTable, RestaurantsTable, RestaurantsPageHeader,
  },
  data() {
    return {
      tab: 'restaurants',
    };
  },
  computed: {
    ...mapState('app', [
      'restaurantsList',
      'loadingRestaurantsList',
      'loadingDeletingRestaurant',
      'loadingAddingRestaurant',
      'loadingEditingRestaurant',

      'citiesList',
      'loadingCitiesList',
      'loadingAddingCity',
      'loadingDeletingCity',
      'loadingEditingCity',
    ]),
    loadingRestaurants() {
      return this.loadingRestaurantsList || this.loadingDeletingRestaurant
        || this.loadingAddingRestaurant;
    },
    loadingCities() {
      return this.loadingCitiesList || this.loadingAddingCity || this.loadingDeletingCity
        || this.loadingEditingRestaurant || this.loadingEditingCity;
    },
  },
  methods: {
    clearRestaurantsList() {
      this.$store.commit('app/SET_RESTAURANTS_LIST', []);
    },
  },
};
</script>

<template>
  <q-page class="q-pa-sm">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="restaurants" label="Рестораны" />
      <q-tab name="cities" label="Города" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated @transition="clearRestaurantsList()">
      <q-tab-panel name="restaurants">
        <restaurants-page-header />
        <restaurants-table
          :restaurants-list="restaurantsList"
          :loading="loadingRestaurants"
        />
      </q-tab-panel>

      <q-tab-panel name="cities">
        <cities-page-header />
        <cities-table
          :cities-list="citiesList"
          :loading="loadingCities"
        />
      </q-tab-panel>

    </q-tab-panels>

  </q-page>
</template>
