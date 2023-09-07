"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import {
  Button,
  Grid,
  Box,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "@/app/components/icon";

import BlankLayout from "@/app/components/layouts/BlankLayout";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerHandler } from "@/app/redux/state/slices/auth/Signup";

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Account = () => {
  // ** State

  const router = useRouter();
  const dispath = useDispatch();

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  // ** Hook
  const theme = useTheme();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  console.log(values);

  const save = () => {
    const { confirmPassword, showPassword, showConfirmPassword, ...payload } =
      values;

    if(confirmPassword !== payload.password){
      toast.error("Password not match")
      return null;
    }

    registerHandler(payload, router, dispath)
    
  };

  return (
    <Box className="flex flex-col justify-evenly h-5/6 px-4 md:px-12">
      <Box className="!flex !flex-col !items-center !mb-10">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Join the{" "}
          <Box sx={{ color: theme.palette.primary.main, mx: 1 }}>MamaFeeds</Box>{" "}
          Family!
        </Box>
        <Typography className="!text-[12px] sm:!text-[15px] text-center">
          Your Adventure Begins: Join MamaFeeds for Exclusive Benefits.
        </Typography>
      </Box>

      <Box className="">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="medium"
              autoFocus
              fullWidth
              id="firstname"
              onChange={handleChange("firstname")}
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="medium"
              autoFocus
              fullWidth
              id="lastname"
              onChange={handleChange("lastname")}
              label="Last Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="medium"
              autoFocus
              fullWidth
              onChange={handleChange("email")}
              id="email"
              label="Email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="medium"
              autoFocus
              fullWidth
              id="Country"
              onChange={handleChange("country")}
              label="Country"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="medium"
              autoFocus
              fullWidth
              id="Phone_number"
              onChange={handleChange("phone")}
              label="Phone Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-create-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-create-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      aria-label="toggle password visibility"
                    >
                      <Icon
                        icon={
                          values.showPassword ? "tabler:eye" : "tabler:eye-off"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-conf-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                label="Confirm Password"
                value={values.confirmPassword}
                id="auth-conf-password"
                onChange={handleChange("confirmPassword")}
                type={values.showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      aria-label="toggle password visibility"
                    >
                      <Icon
                        icon={
                          values.showConfirmPassword
                            ? "tabler:eye"
                            : "tabler:eye-off"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Checkbox />
          <Typography variant="body2" sx={{ color: "text.secondary", mr: 1 }}>
            I have read and agree with the
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/login" sx={{ fontSize: "1rem", mr: 1 }}>
              Terms of Services
            </LinkStyled>
            and
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/login" sx={{ fontSize: "1rem", ml: 1 }}>
              Privacy Policy
            </LinkStyled>
          </Typography>
        </Box>
      </Box>

      <Box>
        <Button
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          onClick={save}
          sx={{ mt: 4, borderRadius: 50 }}
        >
          Create Account
        </Button>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary", mr: 1 }}>
            Already have an account
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/login" sx={{ fontSize: "1rem" }}>
              Log In
            </LinkStyled>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
Account.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Account;
