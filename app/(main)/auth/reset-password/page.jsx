"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Configs
import themeConfig from "@/app/configs/themeConfig";

// ** Layout Import
import BlankLayout from "@/app/components/layouts/BlankLayout";

// ** Demo Imports
import AuthWrapper from "@/app/components/wrapper/AuthWrapper";
import Image from "next/image";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "25rem" },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const ResetPassword = () => {
  // ** State
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();

  return (
    <Box className="flex flex-col justify-center w-5/6 h-5/6 md:px-8">
      <Box className="!flex !flex-col !items-center !mb-14">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Reset your password
        </Box>
      </Box>

      <Box>
        <TextField
          autoFocus
          fullWidth
          id="email"
          label="New Password"
          placeholder="Enter your new password (minimum of 8 characters)"
          sx={{ mb: 3 }}
        />
        <TextField
          autoFocus
          fullWidth
          id="email"
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
          sx={{ mb: 1, borderRadius: 50 }}
        >
          Send password reset link
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
