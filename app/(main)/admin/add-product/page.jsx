"use client";
import HomeWrapper from "@/app/components/view/home";
import { Box, Grid, TextField, Button, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import FileUploader, { convertFileToBase64 } from "./dropZone";
import useSWR from "swr";
import {
  createProductHandler,
  productCsvHandler,
} from "@/app/redux/state/slices/shop/products/productSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import StoreWrapper from "@/app/components/view/store";
import Papa from "papaparse";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    category: "",
    prodName: "",
    prodPrice: "",
    prodInfo: "",
    specifications: {
      color: [],
      size: [],
    },
    totInStock: 0,
  });
  const [files, setFiles] = useState([]);
  const [selectedCSV, selectCSV] = useState([]);

  const handleUpload = () => {
    console.log(selectedCSV);
    if (selectedCSV && selectedCSV.data.length > 0) productCsvHandler(selectedCSV.data, dispatch);
  };

  const handleUploadCSV = (e) => {
    //  setUploading(true);
    const reader = new FileReader();
    const file = e.target.files[0];

    console.log(file);

    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      console.log(csv);
      selectCSV(csv);
    };

    reader.readAsText(file);
  };

  const payload = { ...values, images: files };
  const { data: categories, isLoading } = useSWR("/store/out-categories");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSpecChange = (prop) => (event) => {
    setValues({
      ...values,
      specifications: { ...values.specifications, [prop]: event.target.value },
    });
  };

  const color = [
    "red",
    "gray",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
    "rose",
    "fuchsia",
    "lime",
    "cyan",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [showing, setShowing] = useState("manual");

  const MyTextField = ({ onChange, title, placeholder, value }) => (
    <div className="flex flex-col items-start mb-6">
      <h5 className="text-[13px] mb-2">{title}</h5>
      <TextField
        type="text"
        className="h-8 w-full px-3 rounded-md bg-gray-50 border-1"
        style={{ height: 40 }}
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label="Product title"
      />
    </div>
  );

  return (
    <StoreWrapper>
      <Box className="px:2 md:px-16">
        <Box className="flex items-center !my-4">
          <Box
            className={`w-48 h-24 cursor-pointer flex items-center justify-center bg-white !rounded-xl !px-5 !py-4 border-2 border-white ${
              showing === "csv" && "!border-pink-500"
            }`}
            onClick={() => setShowing("csv")}
          >
            <Image
              src="/images/misc/csv.png"
              alt="CSV file"
              width={100}
              height={100}
              className="h-10 w-10 flex-shrink-0"
            />
            <h5 className="text-[13px] ml-2">
              Add Product by Uploading CSV File.
            </h5>
          </Box>

          <Box
            className={`w-48 h-24 cursor-pointer ml-4 flex items-center justify-center bg-white !rounded-xl !px-5 !py-4 border-2 border-white ${
              showing === "manual" && "!border-pink-500"
            }`}
            onClick={() => setShowing("manual")}
          >
            <Image
              src="/images/misc/hand.png"
              alt="CSV file"
              width={100}
              height={100}
              className="h-12 w-10 flex-shrink-0"
            />
            <h5 className="text-[13px] ml-2">Add Product by Manual Input.</h5>
          </Box>
        </Box>
        {showing === "manual" && (
          <div className="p-4 bg-white rounded-md">
            <h5 className="text-[14px] font-bold mb-4">Add Product</h5>
            <Box className="md:px-4">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    title="Product Name"
                    placeholder="Enter the name of product"
                    onChange={handleChange("prodName")}
                    value={values.prodName}
                  />
                  <MyTextField
                    title="Product Price"
                    placeholder="Enter the amount"
                    onChange={handleChange("prodPrice")}
                    value={values.prodPrice}
                  />
                  <div className="mb-4">
                    <h5 className="text-[13px] mb-2">Product Category</h5>
                    <Select
                      fullWidth
                      size="small"
                      placeholder="Enter the name of the discount promo"
                      onChange={handleChange("category")}
                      value={values.category}
                    >
                      {categories?.data?.map((each, i) => {
                        return (
                          <MenuItem key={i} value={each._id}>
                            {each.category}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="mb-4">
                    <h5 className="text-[13px] mb-2">Description</h5>
                    <TextField
                      multiline
                      fullWidth
                      value={values.prodInfo}
                      placeholder="Write the description of the product"
                      sx={{ border: 0 }}
                      onChange={handleChange("prodInfo")}
                      rows={6}
                      className="bg-gray-50 outline-0"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MyTextField
                    title="Total in stock"
                    placeholder="number of unit left"
                    value={values.totInStock}
                    onChange={handleChange("totInStock")}
                  />

                  <div className="mb-4">
                    <h5 className="text-[13px] mb-2">Product Pictures</h5>
                    <FileUploader files={files} setFiles={setFiles} />
                  </div>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <div className="mb-4">
                        <h5 className="text-[13px] mb-2">Select Color</h5>
                        <Select
                          className="w-full px-3 rounded-md bg-gray-50 border-1"
                          style={{ height: 40 }}
                          value={values.specifications.color}
                          onChange={handleSpecChange("color")}
                          data-placeholder="Size"
                          multiple
                        >
                          <MenuItem value="">Size</MenuItem>
                          {color.map((each, i) => {
                            return (
                              <MenuItem key={i} value={each}>
                                {each}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="mb-4">
                        <h5 className="text-[13px] mb-2">Sizes</h5>
                        <Select
                          className="w-full px-3 rounded-md bg-gray-50 border-1"
                          style={{ height: 40 }}
                          value={values.specifications.size}
                          onChange={handleSpecChange("size")}
                          data-placeholder="Size"
                          multiple
                        >
                          <MenuItem value="">Size</MenuItem>
                          {sizes.map((each, i) => {
                            return (
                              <MenuItem key={i} value={each}>
                                {each}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                className="!rounded-full h-11 !text-xs !mt-4"
                onClick={() => createProductHandler(payload, dispatch)}
              >
                Add Product
              </Button>
            </Box>
          </div>
        )}

        {showing === "csv" && (
          <form encType="multipart/form-data">
            {" "}
            <div className="p-4 bg-white rounded-md">
              <h5 className="text-[14px] font-bold mb-4">Add Product</h5>
              <Box className="md:px-4 flex flex-col">
                <input
                  type="file"
                  placeholder="Write the description of the product"
                  sx={{ border: 0 }}
                  onChange={handleUploadCSV}
                  className="bg-gray-50 outline-0"
                />
                <Button
                  variant="contained"
                  className="!rounded-full h-11 !text-xs !mt-4 !w-48"
                  onClick={handleUpload}
                >
                  Add Products
                </Button>
              </Box>
            </div>
          </form>
        )}
      </Box>
    </StoreWrapper>
  );
};

export default ProductPage;
