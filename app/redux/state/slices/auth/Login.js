import { createSlice, createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import toaster from "@/app/configs/toaster";
import { REQUEST_STATUS } from "../constants";
import mamaApi from "../api/baseApi";
import { clearCart } from "../home/cart/fetchCart";
import { jsonHeader } from "../api/setAuthHeaders";
import tokens from "@/app/configs/tokens";
import { BulkCart } from "../home/cart";

const loginApi = createAsyncThunk("post/loginApi", async (payload) => {
  const { data } = await mamaApi
    .post("/user/login", {
      ...payload,
    })
    .then((res) => {
      const { accessToken } = res.data.user;
      typeof window !== "undefined" && localStorage.setItem("user_token", accessToken);
      return res;
    })
    .catch((err) => err.response);

  return data;
});

export const getAccount = createAsyncThunk("post/loginSlice", async () => {
  const userToken = tokens.auth;
  const { data } = await mamaApi
    .get(
      `/user/get-account`,
      jsonHeader()
    )
    .then((res) => {
      console.log(res);
      const { accessToken } = res.data.user;
      typeof window !== "undefined" &&
        localStorage.setItem("user_token", accessToken);
      return res;
    })
    .catch((e) => console.log(e.response));
  return data;
});

const initialState = {
  userData: {},
  loading: false,
  status: "idle",
  wasGoing: "no-where",
  error: {},
};

const UserSlice = createSlice({
  name: "Corisio Login",
  initialState,
  reducers: {
    userLogout: () => {
      clearCart();
      return initialState;
    },
  },
  extraReducers: {
    [getAccount.pending]: (state) => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
      loading: true,
    }),
    [getAccount.fulfilled]: (state, { payload }) => ({
      ...initialState,
      userData: { ...payload.user },
      status: REQUEST_STATUS.FULFILLED,
      loading: false,
    }),
    [getAccount.rejected]: (state, error) => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
      loading: false,
      error,
    }),
  },
});

export const { setUsers, userLogout } = UserSlice.actions;

// export states
export default UserSlice.reducer;
export { loginApi };

/*

*/

export const myLogin = (payload, router, dispatch) => {
  dispatch(loginApi(payload))
    .then(unwrapResult)
    .then((res) => {
      console.log(res);
      toaster({ ...res });
      if (res.type === "success") {
        const getOfflineCart =
          typeof window !== "undefined" && localStorage.getItem("offline-cart");
        console.log(getOfflineCart);
        if (getOfflineCart) {
          dispatch(BulkCart(getOfflineCart.split("+")));
          typeof window !== "undefined" &&
            localStorage.removeItem("offline-cart");
        }
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
