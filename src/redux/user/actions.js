// app/actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import messageRedux from "./message";
const url = "https://xynydxu4qi.us-east-2.awsapprunner.com";

export const fetchClientData = createAsyncThunk(
  "plataformista/fetchClientData",
  async (dataClient) => {
    messageRedux.initialMessageLogin();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(dataClient),
      headers: myHeaders,
    });
    const data = await response.json();
    messageRedux.messageLogin(data);
    return data;
  }
);
