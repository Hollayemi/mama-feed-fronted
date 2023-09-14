import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { isLoggedIn, jsonHeader} from "../../api/setAuthHeaders";
import { mutate } from "swr"

export const addCart = createAsyncThunk("post/myCart", async (payload) => {
  const { data } = await martApi
    .post("/user/cart-product", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});

export const BulkCart = createAsyncThunk("post/bulkcart", async (payload) => {
  console.log(payload);
  const { data } = await martApi
    .post("/user/bulk-cart-product", payload, jsonHeader())
    .then((e) => console.log(e))
    .catch((e) => e.response);
  return data;
});

export const cartHandler = (payload, dispatch) => {
  if (isLoggedIn()) {
    dispatch(addCart(payload))
      .then(unwrapResult)
      .then((res) => {
        toaster({ ...res });
        mutate("/user/cart")
      })
      .catch((e) => {});
  } else {
    const myOfflineCart =
      (typeof window !== "undefined" &&
        localStorage.getItem("offline-cart")?.split("+")) ||
      [];
    let newCart = [];
    if (myOfflineCart.includes(payload.productId)) {
      newCart = myOfflineCart.filter((id) => id !== payload.productId);
    } else {
      newCart = [...myOfflineCart, payload.productId];
    }
    typeof window !== "undefined" &&
      localStorage.setItem("offline-cart", newCart.join("+"));
  }
};
