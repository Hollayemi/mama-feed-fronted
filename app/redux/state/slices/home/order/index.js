import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import martApi from "../../api/baseApi";
import { isLoggedIn, jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";

export const addOrderApi = createAsyncThunk("post/myOrder", async (body) => {
  console.log(body);
  const { data } = await martApi
    .post("/user/order", body, jsonHeader())
    .then((e) => console.log(e))
    .catch((e) => e.response);
  return data;
});

export const removeAllCart = createAsyncThunk(
  "remove/orderedCarts",
  async () => {
    const { data } = await martApi
      .get("/user/remove-cart", jsonHeader())
      .then((e) => console.log(e))
      .catch((e) => e.response);
    return data;
  }
);

export const orderHandler = (payload, dispatch) => {
  if (isLoggedIn()) {
    dispatch(addOrderApi(payload))
      .then(unwrapResult)
      .then((res) => {
        if (res.type === "success")
          dispatch(removeAllCart()).then(() => {
            mutate("/user/cart");
          });
      })
      .catch((e) => {});
  }
};

const fetchOrder = createAsyncThunk("post/fetchOrder", async (payload) => {
  const { data } = await martApi
    .get(`/user/order`, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const FetchOrderHandler = (dispatch, setState) => {
  dispatch(fetchOrder())
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        setState && setState(res.message);
      }
    })
    .catch((e) => {});
};

const continueOrderApi = createAsyncThunk(
  "post/continueOrder",
  async (payload) => {
    const { data } = await martApi
      .patch(`/user/continue-order/${payload}`, {}, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const continueOrder = (orderId, dispatch) => {
  dispatch(continueOrderApi(orderId))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        window.location.reload();
      }
    })
    .catch((e) => {});
};

const cancelOrderApi = createAsyncThunk(
  "patch/cancelOrder",
  async (payload) => {
    const { data } = await martApi
      .patch(`/branch/cancel-order/${payload}`, {}, jsonHeader())
      .then((e) => e)
      .catch((e) => e.response);
    return data;
  }
);

export const cancelOrder = (orderId, dispatch) => {
  dispatch(cancelOrderApi(orderId))
    .then(unwrapResult)
    .then((res) => {
      if (res.type === "success") {
        window.location.reload();
      }
    })
    .catch((e) => {});
};
