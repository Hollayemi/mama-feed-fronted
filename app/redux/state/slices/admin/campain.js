import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const newCampaign = createAsyncThunk("post/campaign", async (payload) => {
  const { data } = await martApi
    .post("/store/campaign", payload, jsonHeader())
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const addNewCampaign = (payload, dispatch) => {
  dispatch(newCampaign(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/store/campaign");
    })
    .catch((e) => {});
};


const updateCampaignApi = createAsyncThunk(
  "store/campaign/update",
  async (payload) => {
    const { data } = await martApi
      .post("/store/campaign/update", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateCampaign = (payload, dispatch) => {
  dispatch(updateCampaignApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      mutate("/store/campaign");
    })
    .catch((e) => {});
};
