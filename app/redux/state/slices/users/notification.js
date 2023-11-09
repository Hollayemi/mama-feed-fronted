import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";
import toaster from "@/app/configs/toaster";

const setNotificationApi = createAsyncThunk(
  "post/addUserNotificationApi",
  async () => {
    const { data } = await martApi
      .post("/user/newsletter", {}, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const setNotification = (dispatch) => {
  dispatch(setNotificationApi())
    .then(unwrapResult)
    .then((res) => {
      res.type === "success" && mutate("/user/get-account");
    })
    .catch((e) => {});
};

// /user/send-message
const sendEmailApi = createAsyncThunk(
  "post/addUserNotificationApi",
  async (payload) => {
    const { data } = await martApi
      .post("/user/send-message", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const sendEmail = (dispatch, payload) => {
  dispatch(sendEmailApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res })
    })
    .catch((e) => {});
};

