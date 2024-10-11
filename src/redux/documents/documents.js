// app/providerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { convertAndUploadPdf, getAllDocumentsSection } from "./actions";

const providerSlice = createSlice({
  name: "documents",
  initialState: {
    allDocumets: [],
    uploadFile: [],
    files: {},
    stateOk: {},
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
      .addCase(getAllDocumentsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDocumentsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocumets = action.payload;
      })
      .addCase(getAllDocumentsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

export const { clearData } =
  providerSlice.actions;

export const DocumentsReducer = providerSlice.reducer;
