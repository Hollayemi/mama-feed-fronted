import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../api/baseApi";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { mutate } from "swr";
import { userLogout } from "./Login";

const updateAccountApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const { data } = await martApi
      .post("/user/update-account", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateUserAccount = (payload, dispatch) => {
  dispatch(updateAccountApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/user/get-account");
    })
    .catch((e) => {});
};
//
//
//
const updatePictureApi = createAsyncThunk(
  "post/updateUserAccount",
  async (payload) => {
    const { data } = await martApi
      .post("/user/update-picture", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateUserPicture = (payload, dispatch) => {
  dispatch(updatePictureApi(payload))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && mutate("/user/get-account");
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
    })
    .catch((e) => {});
};
//
//
//
const deleteAccountApi = createAsyncThunk(
  "post/updateUserAccount",
  async () => {
    const { data } = await martApi
      .post("/user/update-account", {status: "in-active"}, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const deleteAccount = (dispatch) => {
  dispatch(deleteAccountApi())
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      res.type === "success" && dispatch(userLogout());
    })
    .catch((e) => {});
};
