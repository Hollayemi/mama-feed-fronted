import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { getAccount } from './Login';

export const RegNewUser = createAsyncThunk(
    'post/RegNewUser',
    async (payload) => {
        console.log(payload);
        const { data } = await martApi
            .post('/user/create-account', payload, {})
            .then((e) => {
                console.log(e)
                const { token } = e.data;
                typeof window !== "undefined" &&
                  localStorage.setItem("user_token", token);
                return e;
            })
            .catch((err) => {
                console.log(err);
                return err.response;
            });
        return data;
    }
);

export const registerHandler = (payload, router, dispatch) => {
  dispatch(RegNewUser(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      console.log("here")
      if (res.type === "success") {
        dispatch(getAccount())
          .then(unwrapResult)
          .then((res) => {
            if (!res.user.email) {
              router.push("/");
            }
            router.push("/");
          });
      }
    })
    .catch((err) => {
      toaster({ message: "No Connection", type: "error" });
    });
};
