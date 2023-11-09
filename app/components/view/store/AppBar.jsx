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
import { Close } from "@mui/icons-material";

const adminNav = [
  { name: "Dashboard", link: "/admin" },
  { name: "Inventory", link: "/admin/inventory" },
  { name: "Orders", link: "/admin/orders" },
  { name: "Add Product", link: "/admin/add-product" },
  // { name: "Inbox", link: "/admin/inbox" },
  { name: "Campaign", link: "/admin/campaign" },
  { name: "Customers", link: "/admin/customers" },
  { name: "Settings", link: "/admin/settings" },
];

function StoreTopBar() {
  const { userInfo, adminInfo } = useData();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(false);

  const toggleOpenNavMenu = (event) => {
    setAnchorElNav(!anchorElNav);
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
              onClick={toggleOpenNavMenu}
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

          <Box
            className={`w-80 fixed ${
              anchorElNav ? " -left-2 " : " !-left-80 "
            } transition-all top-0 h-screen z-50  shadow bg-gray-100`}
          >
            <Box className="flex items-center justify-between w-full bg-white px-5 py-1">
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={100}
                height={60}
                className="!w-20 !h-10"
              />
              <Box className="">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleOpenNavMenu}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
            {adminNav.map((page, d) => (
              <LinkStyled
                key={d}
                href={page.link}
                sx={{ display: "block" }}
                color="#000"
                className="px-4 py-3 mx-4 hover:text-pink-500"
              >
                {page.name}
              </LinkStyled>
            ))}
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
            className=" !ml-10 md:!ml-10 lg:!ml-20"
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
