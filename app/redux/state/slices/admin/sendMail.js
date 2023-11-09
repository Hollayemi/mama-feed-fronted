import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const newEmail = createAsyncThunk("post/campaign", async (payload) => {
  const { data } = await martApi
    .post("/store/send-email", payload, jsonHeader())
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const sendNewEmail = (payload, dispatch) => {
  dispatch(newEmail(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/store/send-email");
    })
    .catch((e) => {});
};
