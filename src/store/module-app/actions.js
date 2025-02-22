import { axiosInstance } from 'src/services/AxiosInstance';
import { Notify } from 'quasar';

export const successHandler = (message) => {
  Notify.create({
    color: 'positive',
    icon: 'thumb_up',
    message: message || 'Успешно',
    position: 'bottom-left',
  });
};

export const fetchRestaurantsList = ({ commit, state }, payload = {
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  pageSize: 10,
}) => {
  const params = {
    cityId: state.currentCityId,
    sortBy: payload.sortBy,
    descending: payload.descending,
    page: payload.page - 1,
    pageSize: payload.rowsPerPage,
    filter: payload.filter,
  };
  commit('SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST', true);
  axiosInstance.post('filter-restaurants', params)
    .then((response) => {
      const { data } = response;
      commit('SET_RESTAURANTS_LIST', data.rows);
      commit('SET_ROWS_NUMBER', data.rowsNumber);
      commit('SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST', false);
    })
    .catch(() => {
      Notify.create({
        color: 'positive',
        icon: 'thumb_up',
        message: 'Таблица пустая, сортировать нечего :)',
        position: 'bottom-left',
      });
      commit('SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST', false);
    });
};

export const setCurrentCityId = ({ commit, dispatch }, id) => {
  commit('SET_CURRENT_CITY_ID', id);
  dispatch('fetchRestaurantsList');
};

export const fetchCitiesList = ({ commit }) => {
  commit('SET_LOADING_STATE_FETCHING_CITIES_LIST', true);
  return axiosInstance.get('get-cities-list')
    .then((response) => {
      const { data } = response;
      commit('SET_CITIES_LIST', data);
      commit('SET_LOADING_STATE_FETCHING_CITIES_LIST', false);
    })
    .catch(() => {});
};

export const deleteRestaurant = ({ commit, dispatch }, id) => {
  commit('SET_LOADING_STATE_DELETING_RESTAURANT', true);
  axiosInstance.delete(`remove-restaurant/${id}`)
    .then(() => {
      successHandler();
      dispatch('fetchRestaurantsList');
      commit('SET_LOADING_STATE_DELETING_RESTAURANT', false);
    })
    .catch(() => {});
};

export const editRestaurant = ({ commit }, payload) => {
  commit('SET_LOADING_STATE_EDITING_RESTAURANT', true);
  return axiosInstance.post(`edit-restaurant/${payload.id}`, { name: payload.name })
    .then(() => {
      successHandler();
      commit('SET_LOADING_STATE_EDITING_RESTAURANT', false);
    })
    .catch(() => {});
};

export const deleteCity = ({ commit, dispatch }, id) => {
  commit('SET_LOADING_STATE_DELETING_CITY', true);
  axiosInstance.delete(`remove-city/${id}`)
    .then(() => {
      successHandler();
      dispatch('fetchCitiesList');
      commit('SET_LOADING_STATE_DELETING_CITY', false);
    })
    .catch(() => {});
};

export const editCity = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING_STATE_EDITING_CITY', true);
  axiosInstance.post(`edit-city/${payload.id}`, { name: payload.name })
    .then(() => {
      successHandler();
      dispatch('fetchCitiesList');
      commit('SET_LOADING_STATE_EDITING_CITY', false);
    })
    .catch(() => {});
};

export const addCity = ({ commit, dispatch }, name) => {
  commit('SET_LOADING_STATE_ADDING_CITY', true);
  axiosInstance.post('add-city', { name })
    .then(() => {
      successHandler('Город успешно добавлен');
      dispatch('fetchCitiesList');
      commit('SET_LOADING_STATE_ADDING_CITY', false);
    })
    .catch(() => {});
};

export const addRestaurant = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING_STATE_ADDING_RESTAURANT', true);
  axiosInstance.post(`${payload.cityId}/add-restaurant`, { name: payload.restaurantName })
    .then(() => {
      successHandler('Ресторан успешно добавлен');
      dispatch('fetchRestaurantsList');
      commit('SET_LOADING_STATE_ADDING_RESTAURANT', false);
    })
    .catch(() => {});
};
