import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";


const toProcessingApi = createAsyncThunk(
  "post/toProcessing",
  async (payload) => {
    const storeToken = tokens.store;
    const { data } = await martApi
      .post("/branch/order-processing", payload.body, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const toProcessing = (dispatch, orderId, Reactions, store, setState) => {
  console.log(Reactions);
  const products = Reactions.map((x) => x[0]);
  console.log(products);
  const payload = {
    body: { orderId, store, products },
  };
  dispatch(toProcessingApi(payload))
    .then(unwrapResult)
    .then((res) => res.type === "success" && setState(res.data))
    .catch((err) => {});
};
