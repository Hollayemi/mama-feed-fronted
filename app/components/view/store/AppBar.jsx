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
import { useRouter } from "next/navigation";
import IconifyIcon from "../../icon";
import { userLogout } from "@/app/redux/state/slices/auth/Login";
import { useDispatch } from "react-redux";

const adminNav = [
  { name: "Dashboard", link: "/" },
  { name: "Inventory", link: "/admin/inventory" },
  { name: "Orders", link: "/admin/orders" },
  // { name: "Inbox", link: "/admin/inbox" },
  { name: "Campaign", link: "/admin/discount" },
  { name: "Customers", link: "/admin/customers" },
  { name: "Settings", link: "/admin/settings" },
];

function StoreTopBar() {
  const { userInfo, adminInfo } = useData();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    transition: theme.transitions.create(["width", "margin", "border"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: "0.825rem",
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
          <Box className="md:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>

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
              {adminNav.map((page, d) => (
                <MenuItem key={d} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
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
            {adminNav.map((page, i) => (
              <LinkStyled
                key={i}
                href={page.link}
                sx={{ display: "block" }}
                color={theme.palette.primary.main}
                className="px-1 mx-3 font-bold border-b-4 border-white hover:border-pink-500 leading-10"
              >
                {page.name}
              </LinkStyled>
            ))}
          </Box>
          <Box className="flex-grow-0 !flex !items-center">
            <Typography
              variant="body2"
              noWrap
              className="!font-bold !text-[14px] !text-ellipsis !whitespace-nowrap !px-3 !text-black !overflow-hidden"
            >
              {adminInfo?.name?.split(" ")[0]}
            </Typography>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={adminInfo.name}
                src={adminInfo.picture || "/images/misc/no-pic.svg"}
              />
            </IconButton>
            <Tooltip title="Logout">
              <IconButton sx={{ p: 0 }} onClick={() => dispatch(userLogout())}>
                <IconifyIcon
                  icon="tabler:logout"
                  className="text-pink-500 ml-3 "
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default StoreTopBar;
