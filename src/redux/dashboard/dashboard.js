// app/providerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchhAllNewTables, getAllPeding, getAllPedingUnresolved, getAllPlataform } from './actions';

const providerSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    allTableSection:[],
    allTablePlataform:[],
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
      .addCase(fetchhAllNewTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchhAllNewTables.fulfilled, (state, action) => {
        state.loading = false;
        state.allTableSection= action.payload;
      })
      .addCase(fetchhAllNewTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //* todos los pendientes de tablas
      .addCase(getAllPeding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPeding.fulfilled, (state, action) => {
        state.loading = false;
        state.allTableSection= action.payload;
      })
      .addCase(getAllPeding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //* todos los pendientes no corregidos por el usuario de tablas
      .addCase(getAllPedingUnresolved.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPedingUnresolved.fulfilled, (state, action) => {
        state.loading = false;
        state.allTableSection= action.payload;
      })
      .addCase(getAllPedingUnresolved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // todos los plataformistas getAllPlataform
      .addCase(getAllPlataform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlataform.fulfilled, (state, action) => {
        state.loading = false;
        state.allTablePlataform= action.payload;
      })
      .addCase(getAllPlataform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { clearData } = providerSlice.actions;

export const DashboardReducer = providerSlice.reducer;

