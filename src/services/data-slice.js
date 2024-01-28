import { createSlice } from '@reduxjs/toolkit';
import { checkResponse } from '../utils/check-response';


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
    .then(checkResponse)
    .then((data) => {
      dispatch(fetchIngredientsSuccess(data.data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailure(error));
    });
};