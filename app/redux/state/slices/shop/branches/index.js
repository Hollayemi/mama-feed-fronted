import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { userLogout } from "../../auth/Login";
import { getShopInfo } from "../shopInfo";
import tokens from '@/app/configs/tokens';

const createBranchApi = createAsyncThunk(
  "post/createBranch",
  async (payload) => {
    console.log(payload);
    const storeToken = tokens.store;
    const { data } = await martApi
      .post(`/create/branch`, payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const createBranch = (formData, dispatch, setState, setReg) => {
  dispatch(createBranchApi(formData))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        fetchMyBranches(dispatch, setState);
        setReg(false);
      }
    })
    .catch((e) => {});
};

//
//
//
const fetchBranchApi = createAsyncThunk("post/fetchBranch", async () => {
  const storeToken = tokens.store;
  const { data } = await martApi
    .get(`/branch/all`, jsonHeader(storeToken))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});
export const fetchMyBranches = (dispatch, setState) => {
  dispatch(fetchBranchApi())
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setState(res.data);
      }
    })
    .catch((e) => {});
};

//
//
//
//
// connection file handler api

const connFileApi = createAsyncThunk("post/fetchBranch", async (fd) => {
  const userToken = tokens.auth;
  const { data } = await martApi
    .post(`/connect/branch`, fd, jsonHeader(userToken))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const connFileHandler = (dispatch, fd, setLoading) => {
  setLoading(true);
  dispatch(connFileApi(fd))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setLoading(false);
        userLogout();
      } else {
        toaster({ ...res });
      }
      setLoading(false);
    })
    .catch((e) => {
      setLoading(false);
    });
};
//
//
//
//
// delete api

const deleteBranchApi = createAsyncThunk("post/fetchBranch", async (id) => {
  const storeToken = tokens.store;
  const { data } = await martApi
    .delete(`/delete/branch/${id}`, jsonHeader(storeToken))
    .then((res) => res)
    .catch((e) => e.response);
  return data;
});

export const deleteBranch = (dispatch, id, setState) => {
  dispatch(deleteBranchApi(id))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setState(res.data);
      }
    })
    .catch((e) => {});
};

const updateBranchApi = createAsyncThunk(
  "post/updateBranch",
  async (payload) => {
    console.log(payload);
    const storeToken = tokens.store;
    const { data } = await martApi
      .put(`/edit/branch`, payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

export const updateBranch = (formData, dispatch) => {
  dispatch(updateBranchApi(formData))
    .then(unwrapResult)
    .then((res) => {
      toaster({ ...res });
      if (res.type === "success") {
        dispatch(getShopInfo());
      }
    })
    .catch((e) => {});
};
