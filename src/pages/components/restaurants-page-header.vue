<script>
import { mapState } from 'vuex';

export default {
  name: 'RestaurantsPageHeader',
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
    this.$store.dispatch('app/fetchCitiesList')
      .then(() => {
        if (!this.citiesList.length) return;
        // eslint-disable-next-line prefer-destructuring
        this.city = this.citiesList[0];
        this.$store.dispatch('app/setCurrentCityId', this.city.id);
      });
  },
  methods: {
    setCurrentCityId(city) {
      const { id } = city;
      this.$store.dispatch('app/setCurrentCityId', id);
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
  </div>
</template>
