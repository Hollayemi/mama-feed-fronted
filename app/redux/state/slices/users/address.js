import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const newAddressApi = createAsyncThunk("post/Address", async (payload) => {
  const { data } = await martApi
    .post("/user/address", payload, jsonHeader())
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const newAddress = (payload, dispatch) => {
  dispatch(newAddressApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/user/address");
    })
    .catch((e) => {});
};
//
//
//
const deleteAddressApi = createAsyncThunk("post/Address", async (payload) => {
  const { data } = await martApi
    .delete(`/user/address?id=${payload}`, jsonHeader())
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const deleteAddress = (payload, dispatch) => {
  dispatch(deleteAddressApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/user/address");
    })
    .catch((e) => {});
};
//
//
//
const selectAddressApi = createAsyncThunk("post/Address", async (id) => {
  const { data } = await martApi
    .get(`/user/address/${id}`, jsonHeader())
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const selectAddress = (payload, dispatch) => {
  dispatch(selectAddressApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/user/address");
    })
    .catch((e) => {});
};
//
//
//
