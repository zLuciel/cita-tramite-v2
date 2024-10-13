// app/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import messageRedux from "./message";
const url = "https://xynydxu4qi.us-east-2.awsapprunner.com";

export const fetchhAllNewTables = createAsyncThunk(
  "dashboard/fetchhAllNewTables", // Tipo de acción
  async ({ token, idSection,message }, thunkAPI) => {
    try {
     if(message) messageRedux.initialMessageTable()
      const resUser = await fetch(
        `${url}/api/process-status/completed-users/${idSection}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta no es OK (por ejemplo 404, 500, etc.)
      if (!resUser.ok) {
        const errorMessage = `Error ${resUser.status}: ${resUser.statusText}`;
        return thunkAPI.rejectWithValue(errorMessage); // Rechazar con mensaje detallado
      }

      const res = await resUser.json();
      return res; // Devolver datos al fulfilled en el slice
    } catch (error) {
      // En caso de error (por ejemplo, error de red)
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      if(message) messageRedux.messageUpdateList();
    }
  }
);

export const getAllPeding = createAsyncThunk(
  "dashboard/getAllPeding", // Tipo de acción
  async ({ token, idSection,message }, thunkAPI) => {
    
    try {
      if(message) messageRedux.initialMessageTable()
      const resUser = await fetch(
        `${url}/api/process-status/corrected/${idSection}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta no es OK (por ejemplo 404, 500, etc.)
      if (!resUser.ok) {
        const errorMessage = `Error ${resUser.status}: ${resUser.statusText}`;
        return thunkAPI.rejectWithValue(errorMessage); // Rechazar con mensaje detallado
      }

      const res = await resUser.json();
      return res; // Devolver datos al fulfilled en el slice
    } catch (error) {
      // En caso de error (por ejemplo, error de red)
      return thunkAPI.rejectWithValue(error.message);
    } finally {
     if(message) messageRedux.messageUpdateList();
    }
  }
);

export const getAllPedingUnresolved = createAsyncThunk(
  "dashboard/getAllPedingUnresolved", // Tipo de acción
  async ({ token, idSection ,message }, thunkAPI) => {
    try {
      if(message) messageRedux.initialMessageTable()
      const resUser = await fetch(
        `${url}/api/process-status/unresolved-documents/${idSection}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta no es OK (por ejemplo 404, 500, etc.)
      if (!resUser.ok) {
        const errorMessage = `Error ${resUser.status}: ${resUser.statusText}`;
        return thunkAPI.rejectWithValue(errorMessage); // Rechazar con mensaje detallado
      }

      const res = await resUser.json();
      return res; // Devolver datos al fulfilled en el slice
    } catch (error) {
      // En caso de error (por ejemplo, error de red)
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      if(message) messageRedux.messageUpdateList();
    }
  }
);



export const getAllPlataform = createAsyncThunk(
  "dashboard/getAllPlataform", // Tipo de acción
  async ({token},thunkAPI) => {
    try {
      messageRedux.initialMessageTable();
      const resUser = await fetch(
        `${url}/api/user/roles/platform-operators`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si la respuesta no es OK (por ejemplo 404, 500, etc.)
      if (!resUser.ok) {
        const errorMessage = `Error ${resUser.status}: ${resUser.statusText}`;
        return thunkAPI.rejectWithValue(errorMessage); // Rechazar con mensaje detallado
      }

      const res = await resUser.json();
      return res; // Devolver datos al fulfilled en el slice
    } catch (error) {
      // En caso de error (por ejemplo, error de red)
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      messageRedux.messageUpdateList();
    }
  }
);