"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PictureSide } from "../components";
import FileUploader from "../../admin/add-product/dropZone";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useData } from "@/app/hooks/useData";
import { updateUserAccount, updateUserPicture } from "@/app/redux/state/slices/auth/updateAccount";

const GeneralDetails = () => {
  const { userInfo } = useData();

  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({
    firstname: userInfo.firstname || "",
    lastname: userInfo.lastname || "",
    email: userInfo.email || "",
    country: userInfo.country || "",
    phone: userInfo.phone || "",
  });


  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };

  const dispatch = useDispatch();

  const updateBtn = () => {
    updateUserPicture({ picture: files[0], state: "add" }, dispatch);
  }
  const deletePicBtn = () => {
    updateUserPicture({ state: "remove" }, dispatch);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} className="flex-shrink-0">
        <Box>
          <Typography
            variant="body1"
            className="!text-[16px] !font-bold !text-black"
          >
            Profile Picture
          </Typography>
          <br />
          <Box></Box>
          <PictureSide
            deletePicBtn={deletePicBtn}
            updateBtn={updateBtn}
            pic={userInfo.picture}
          />
          <br />
          <FileUploader setFiles={setFiles} fileNum={1} />
        </Box>
      </Grid>
      <Grid item sm={12} md={8}>
        <Box>
          <Typography
            variant="body1"
            className="!text-[16px] !font-bold !text-black"
          >
            Personal Information
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                value={values.firstname}
                id="textarea-outlined"
                placeholder="First Name"
                label="First Name"
                onChange={handleChange("firstname")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                value={values.lastname}
                id="textarea-outlined"
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange("lastname")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                id="textarea-outlined"
                value={values.email}
                placeholder="Email Address"
                label="Email Address"
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                id="textarea-outlined"
                value={values.country}
                placeholder="Country"
                label="Country"
                onChange={handleChange("country")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                id="textarea-outlined"
                placeholder="Phone Number"
                value={values.phone}
                label="Phone Number"
                onChange={handleChange("phone")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                id="textarea-outlined"
                placeholder="Date of Birth"
                label="Date of Birth"
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="flex md:justify-end mt-16">
          <Button
            variant="contained"
            className="!h-10 !rounded-full !text-xs w-52"
            onClick={() => updateUserAccount(values, dispatch)}
          >
            Save Changes
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GeneralDetails;
