import { createSlice } from '@reduxjs/toolkit';


export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchIngredientsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchIngredientsFailure: (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  fetchIngredientsFailure,
} = dataSlice.actions;

export const fetchData = (api) => (dispatch) => {
  dispatch(fetchIngredientsRequest());
  fetch(`${api}ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      dispatch(fetchIngredientsSuccess(data.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailure(error));
    });
};