import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import toaster from "@/app/configs/toaster";
import martApi from "../../api/baseApi";
import { jsonHeader } from "../../api/setAuthHeaders";
import { REQUEST_STATUS } from "../../constants";
import { updateInstance } from "../settings/genApi";
import tokens from '@/app/configs/tokens';
// add product
export const createNewProduct = createAsyncThunk(
  "post/newProductkk",
  async (payload) => {
    const storeToken = tokens.store;
    const { data } = await martApi
      .post("/addProduct", payload, jsonHeader(storeToken))
      .then((res) => res)
      .catch((e) => e.response);
    return data;
  }
);

// export const updateInstance = createAsyncThunk(
//     'post/collectionInstance',
//     async (payload) => {
//         const { data } = await martApi
//             .post(`/use`, payload, {})
//             .then((res) => {
//                 return res;
//             })
//             .catch((e) => {
//                 console.log(e.response);
//                 return e.response;
//             });
//         return data;
//     }
// );
//
const initialState = {
  creatname: "",
};

//
//
//
const myNewProduct = createSlice({
  name: "newCollection",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewProduct.pending]: () => ({
      ...initialState,
      status: REQUEST_STATUS.PENDING,
    }),
    [createNewProduct.fulfilled]: (state, { payload }) => ({
      ...initialState,
      status: REQUEST_STATUS.FULFILLED,
      colData: payload,
    }),
    [createNewProduct.rejected]: () => ({
      ...initialState,
      status: REQUEST_STATUS.REJECTED,
    }),
  },
});

export const { addNewCollection } = myNewProduct.actions;
export default myNewProduct.reducer;

//
//
//

export const createProductHandler = (formData, dispatch, neededInfo) => {
  if (neededInfo.authStatus === REQUEST_STATUS.VERIFIED) {
    const payload = {
      ...formData,
      shopID: neededInfo.shopData._id,
    };
    const subPayload = {
      id: neededInfo.shopData._id,
      number: 1,
      operator: "-",
      useCase: "products",
    };
    dispatch(createNewProduct(payload))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        toaster({ ...res });
        if (res.type === "success") {
          dispatch(updateInstance(subPayload));
        }
        neededInfo.reFetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
/*

*/

export const removeBg = (imgUrl, setImgData) => {
  axios({
    url: "https://api.remove.bg/v1.0/removebg",
    method: "post",
    data: {
      image_url: imgUrl,
      // 'http://res.cloudinary.com/xmart/image/upload/v1654572183/62796a8870e04f2804626fde/Bolato/pydh6xpnwzjhub2jlsxh.jpg',
      size: "auto",
      format: "auto",
      type: "auto",
    },
    headers: {
      "X-Api-Key": "sMy4sR7AsoQNHLSNCZQEGL7r",
    },
    responseType: "blob",
    encoding: null,
  })
    .then((response) => {
      setImgData(URL.createObjectURL(response.data), "image");
      // setIsLoading(false);
    })
    .catch((e) => console.log(e.response, "something missing"));
};
