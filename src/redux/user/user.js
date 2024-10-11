// app/providerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchClientData } from './actions';

const providerSlice = createSlice({
  name: 'plataformista',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchClientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      //
  },
});

export const { clearData } = providerSlice.actions;

export const UserReducer = providerSlice.reducer;

