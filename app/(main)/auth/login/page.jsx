"use client";
// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Layout Import
import BlankLayout from "@/app/components/layouts/BlankLayout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { myLogin } from "@/app/redux/state/slices/auth/Login";

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const LoginV1 = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  // ** State
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });

  const { showPassword, ...payload } = values
  console.log(payload);

  // ** Hook
  const theme = useTheme();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Box className="flex flex-col justify-evenly h-5/6 px-4 md:px-6">
      <Box className="!flex !flex-col !items-center">
        <Box className="font-bold !flex !items-center !text-[20px] sm:!text-[27px] text-center">
          Welcome Back to{" "}
          <Box sx={{ color: theme.palette.primary.main, ml: 1 }}>
            MamaFeeds!
          </Box>
        </Box>
        <Typography className="!text-[12px] sm:!text-[15px] text-center">
          Your Journey Continues: Log in to Your MamaFeeds Account
        </Typography>
      </Box>

      <Box>
        <TextField
          autoFocus
          fullWidth
          id="email"
          onChange={handleChange("email")}
          label="Email"
          sx={{ mb: 4 }}
        />
        <FormControl fullWidth sx={{ mb: 1.5 }}>
          <InputLabel htmlFor="auth-login-password">Password</InputLabel>
          <OutlinedInput
            label="Password"
            value={values.password}
            id="auth-login-password"
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
                    icon={values.showPassword ? "tabler:eye" : "tabler:eye-off"}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box
          sx={{
            mb: 1.75,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LinkStyled href="/auth/forgot-password">Forgot Password?</LinkStyled>
        </Box>
      </Box>

      <Box>
        <Button
          fullWidth
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          sx={{ mb: 4, borderRadius: 50 }}
          onClick={()=>myLogin(payload, router, dispatch)}
        >
          Login
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
            Don’t have an account yet? Register
          </Typography>
          <Typography variant="body2">
            <LinkStyled href="/auth/create-account" sx={{ fontSize: "1rem" }}>
              Register
            </LinkStyled>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
LoginV1.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginV1;
