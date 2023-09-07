import { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import Chip from "../../chip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useData } from "@/app/hooks/useData";
import { isLoggedIn } from "@/app/redux/state/slices/api/setAuthHeaders";

const pages = ["Home", "Shop", "About-us", "Contact-Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function HomeTopBar() {
  const genData = useData();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const cartNum = isLoggedIn()
    ? genData?.cart?.products?.length || 0
    : localStorage.getItem("offline-cart")?.split("+")?.length - 1 || 0;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const MyCartBtn = ({ num }) => (
    <Box className="flex items-center">
      <ShoppingCartIcon className="text-white !text-sm" />
      <Box
        color={theme.palette.primary.main}
        className="!ml-1 w-4 h-4 bg-white !rounded-full flex items-center !text-sm justify-center font-bold"
      >
        {num}
      </Box>
    </Box>
  );

  const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    transition: theme.transitions.create(["width", "margin", "border"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: "0.875rem",
    textDecoration: "none",

    color: theme.palette.primary.main,
  }));

  return (
    <AppBar
      position="static"
      className=" lg:!px-12 !z-50 !fixed !w-full !top-0"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters bgcolor="white">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            // color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            width={100}
            height={60}
            className="w-20 !h-10"
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex", ml: 7 } }}
            className="!ml-7"
          >
            {pages.map((page) => (
              <LinkStyled
                key={page}
                href={`/${page.toLocaleLowerCase()}`}
                sx={{ display: "block" }}
                color={theme.palette.primary.main}
                className="px-1 mx-4 font-bold border-b-4 border-white hover:border-pink-500 leading-10"
              >
                {page.replace("-", " ")}
              </LinkStyled>
            ))}
          </Box>

          <Box className="flex-grow-0 !flex !items-center">
            <Chip
              sx={{ backgroundColor: theme.palette.primary.main }}
              label={<MyCartBtn variant="contained" num={cartNum} />}
              size="small"
            />
            <Button
              bgcolor="white"
              className="!rounded-full !ml-3 !text-xs !hidden md:!flex"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              className="!rounded-full !ml-3 !text-sm !hidden md:!flex"
            >
              Sign Up
            </Button>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Re my Sharp" src="/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeTopBar;
