export const SET_RESTAURANTS_LIST = (state, payload) => {
  state.restaurantsList = payload;
};

export const SET_CITIES_LIST = (state, payload) => {
  state.citiesList = payload;
};

export const SET_CURRENT_CITY_ID = (state, payload) => {
  state.currentCityId = payload;
};

export const SET_ROWS_NUMBER = (state, payload) => {
  state.rowsNumber = payload;
};

export const SET_LOADING_STATE_FETCHING_RESTAURANTS_LIST = (state, payload) => {
  state.loadingRestaurantsList = payload;
};

export const SET_LOADING_STATE_FETCHING_CITIES_LIST = (state, payload) => {
  state.loadingCitiesList = payload;
};

export const SET_LOADING_STATE_DELETING_RESTAURANT = (state, payload) => {
  state.loadingDeletingRestaurant = payload;
};

export const SET_LOADING_STATE_DELETING_CITY = (state, payload) => {
  state.loadingDeletingCity = payload;
};

export const SET_LOADING_STATE_ADDING_CITY = (state, payload) => {
  state.loadingAddingCity = payload;
};

export const SET_LOADING_STATE_ADDING_RESTAURANT = (state, payload) => {
  state.loadingAddingRestaurant = payload;
};
