import { axiosInstance } from 'src/services/AxiosInstance';
import { Notify } from 'quasar';

export const successHandler = (message) => {
  Notify.create({
    color: 'positive',
    icon: 'thumb_up',
    message: message || 'Успешно',
    position: 'bottom-right',
  });
};

export const fetchRestaurantsList = ({ commit }, id) => {
  commit('SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST', true);
  commit('SET_CURRENT_CITY_ID', id);
  axiosInstance.get(`get-restaurants-list?cityId=${id}`)
    .then((response) => {
      const { data } = response;
      commit('SET_RESTAURANTS_LIST', data);
      commit('SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST', false);
    })
    .catch(() => {});
};

export const fetchCitiesList = ({ commit }) => {
  commit('SET_LOADING_STATE_FETCHING_CITIES_LIST', true);
  axiosInstance.get('get-cities-list')
    .then((response) => {
      const { data } = response;
      commit('SET_CITIES_LIST', data);
      commit('SET_LOADING_STATE_FETCHING_CITIES_LIST', false);
    })
    .catch(() => {});
};

export const deleteRestaurant = ({ commit, dispatch, state }, id) => {
  commit('SET_LOADING_STATE_DELETING_RESTAURANT', true);
  axiosInstance.get(`remove-restaurant?restaurantId=${id}`)
    .then(() => {
      successHandler();
      dispatch('fetchRestaurantsList', state.currentCityId);
      commit('SET_LOADING_STATE_DELETING_RESTAURANT', false);
    })
    .catch(() => {});
};

export const addCity = ({ commit, dispatch }, name) => {
  commit('SET_LOADING_STATE_ADDING_CITY', true);
  axiosInstance.get(`add-city?cityName=${name}`)
    .then(() => {
      successHandler('Город успешно добавлен');
      dispatch('fetchCitiesList');
      commit('SET_LOADING_STATE_ADDING_CITY', false);
    })
    .catch(() => {});
};

export const addRestaurant = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING_STATE_ADDING_RESTAURANT', true);
  axiosInstance.get(`add-restaurant?cityId=${payload.cityId}&restaurantName=${payload.restaurantName}`)
    .then(() => {
      successHandler('Ресторан успешно добавлен');
      dispatch('fetchRestaurantsList', payload.cityId);
      commit('SET_LOADING_STATE_ADDING_RESTAURANT', false);
    })
    .catch(() => {});
};
