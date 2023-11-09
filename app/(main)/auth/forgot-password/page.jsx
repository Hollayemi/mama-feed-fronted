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

import { ForgotPasswordHandler } from "@/app/redux/state/slices/auth/forgotpassword";
import { useDispatch } from "react-redux";

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const ForgotPassword = () => {
  // ** State
  const [email, setEmail] = useState('');

  const dispatch = useDispatch()

  // ** Hook
  const theme = useTheme();

  return (
    <Box className="flex flex-col md:justify-center !w-full sm:!w-5/6 h-5/6 px-4 md:px-6">
      <Box className="!flex !flex-col !items-center !mb-14">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Forgot your password
        </Box>
      </Box>

      <Box>
        <TextField
          autoFocus
          fullWidth
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 4 }}
        />
      </Box>

      <Box className="px-6">
        <Button
          onClick={() => ForgotPasswordHandler(email, dispatch)}
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          sx={{ mb: 4, borderRadius: 50 }}
        >
          Send password reset link
        </Button>
        <Box className="flex items-center justify-center flex-wrap">
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
ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default ForgotPassword;
