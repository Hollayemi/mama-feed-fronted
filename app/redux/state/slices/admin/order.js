import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const updateOrderApi = createAsyncThunk("post/update", async (payload) => {
  const storeToken = tokens.store;
  console.log(storeToken);
  const { data } = await martApi
    .post("/user/order/update", payload, jsonHeader())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return e.response;
    });
  return data;
});

export const updateOrder = (dispatch, payload) => {
  dispatch(updateOrderApi(payload))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        mutate("/user/order");
        toaster({...res});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
