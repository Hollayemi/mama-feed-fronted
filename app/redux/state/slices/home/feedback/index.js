import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { mutate } from "swr";

const newFeedback = createAsyncThunk("post/newFeedback", async (payload) => {
  const { data } = await martApi
    .post("/user/feedback", payload, jsonHeader())
    .then((e) => e)
    .catch((e) => e.response);
  return data;
});


export const feedbackHandler = (payload, dispatch) => {
  dispatch(newFeedback(payload))
    .then(unwrapResult)
    .then((res) => {
      mutate("/user/pending-reviews")
    })
    .catch((e) => {});
};
