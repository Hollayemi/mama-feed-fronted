import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import { updateInstance } from "../settings/genApi";
import tokens from "@/app/configs/tokens";
// add product
export const createNewProduct = createAsyncThunk(
  "post/newProductkk",
  async (payload) => {
    const { data } = await martApi
      .post("/store/add-product", payload, jsonHeader())
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);
export const createProductHandler = (payload, dispatch) => {
  dispatch(createNewProduct(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};
// add product
// add product
// add product
// add product
// add product
// add product
export const createBulkProduct = createAsyncThunk(
  "post/newProductkk",
  async (products) => {
    console.log(products);
    const { data } = await martApi
      .post("/store/bulk-product", products, jsonHeader())
      .then((res) => console.log(res))
      .catch((e) => e.response);
    return data;
  }
);
export const productCsvHandler = (products, dispatch) => {
  dispatch(createBulkProduct(products))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

