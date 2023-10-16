import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import toaster from "@/app/configs/toaster";

import mamaApi from "../api/baseApi";

const forgotPasswordApi = createAsyncThunk("post/FP", async (payload) => {
  console.log(payload);
  const { data } = await mamaApi
    .post("/user/forgot-password", payload, {})
    .then((res) => res)
    .catch((err) => err.response);

  return data;
});

export const ForgotPasswordHandler = (email, dispatch) => {
  dispatch(forgotPasswordApi({ email }))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      if (res.type === "success") {
        alert("sent");
      }
    })
    .catch((err) => {
      toaster( {message: "No Connection", type: "error"} );
    });
};
