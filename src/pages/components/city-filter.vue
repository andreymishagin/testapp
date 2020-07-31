<script>
import { mapState } from 'vuex';

export default {
  name: 'CityFilter',
  data() {
    return {
      city: null,
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
    fetchRestaurantsList(city) {
      const { id } = city;
      this.$store.dispatch('app/fetchRestaurantsList', id);
    },
  },
};
</script>

<template>
  <div class="q-mt-md">
    <q-select
      v-model="city"
      :options="citiesList"
      :loading="loading"
      label="Город"
      outlined
      :option-label="item => item === null ? '' : item.name"
      @input="fetchRestaurantsList($event)"
    />
  </div>
</template>
