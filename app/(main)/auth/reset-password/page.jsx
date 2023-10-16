"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";

// ** Layout Import
import BlankLayout from "@/app/components/layouts/BlankLayout";
import { ResetPasswordHandler } from "@/app/redux/state/slices/auth/resetPassword";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const ResetPassword = ({ searchParams }) => {
  // ** State
  const [values, setValues] = useState({
    password: "",
    confirmPassword: false,
    prevToken: searchParams.token
  });

  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const dispatch = useDispatch()
  const router = useRouter();

  const resetPass = () =>{
    if(values.password === values.confirmPassword){
      if(values.password.length > 6) {
       ResetPasswordHandler(values, router, dispatch)
      }else{
        alert('Password too short')
      }
    }else{
      alert('Password not match')
    }
  }

  return (
    <Box className="flex flex-col md:justify-center w-11/12 h-5/6 md:px-8">
      <Box className="!flex !flex-col !items-center !mb-14">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Reset your password
        </Box>
      </Box>

      <Box>
        <TextField
          autoFocus
          fullWidth
          onChange={handleChange("password")}
          id="Pass"
          label="New Password"
          placeholder="Enter your new password (minimum of 8 characters)"
          sx={{ mb: 3 }}
        />
        <TextField
          autoFocus
          onChange={handleChange("confirmPassword")}
          fullWidth
          id="cPass"
          label="Confirm New Password"
          placeholder="Confirm your new password (minimum of 8 characters)"
          sx={{ mb: 4 }}
        />
      </Box>

      <Box className="px-5">
        <Button
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          onClick={resetPass}
          sx={{ mb: 1, borderRadius: 50 }}
        >
          Reset Password
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary", mr: 1 }}>
            Remembered your password?
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/login" sx={{ fontSize: "1rem" }}>
              Login to your account
            </LinkStyled>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
ResetPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default ResetPassword;
