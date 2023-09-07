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

const VerifyEmail = () => {
  // ** State
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();

  return (
    <Box className="flex flex-col items-center w-4/6  h-5/6 px-4 md:px-6">
      <Image src="/images/more/verify-email.png" className="w-[300px] h-[300px]" alt="verify-email" width={250} height={350} />
      <Box className="!flex !flex-col !items-center">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Verify Your Email
        </Box>
        <Typography className="!text-[12px] sm:!text-[15px] text-center px-3 md:px-5">
          Hi Creative Box, Use the link sent to you email address to verify your
          account and enjoy mamafeeds.
        </Typography>
      </Box>

      <Box>
        <Button
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          sx={{ mb: 1, mt: 6, borderRadius: 50 }}
        >
          Verify Email
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
            Questions? Email us at
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/create-account" sx={{ fontSize: "1rem" }}>
              support@mamafeeds.com
            </LinkStyled>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
VerifyEmail.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default VerifyEmail;
