import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";

const newAdminApi = createAsyncThunk(
  "post/newAadmin",
  async (payload) => {
    const { data } = await martApi
      .post("/admin/create-account", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const newAdmin = (payload, dispatch) => {
  dispatch(newAdminApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/admin/get-accounts");
    })
    .catch((e) => {});
};
//
//
//
const activationApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const { data } = await martApi
      .post("/admin/status", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const adminActivation = (payload, dispatch) => {
  dispatch(activationApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/admin/get-accounts");
    })
    .catch((e) => {});
};
//
//
//
const updatePasswordApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const { data } = await martApi
      .post("/user/change-password", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateUserPassword = (payload, dispatch) => {
  dispatch(updatePasswordApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      // res.type === "success"
    })
    .catch((e) => {});
};
