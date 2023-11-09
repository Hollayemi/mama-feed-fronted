"use client";

import { useSelector } from "react-redux";
import HomeTopBar from "./appBar";
import Footer from "./footer";
import { Box } from "@mui/material";

const HomeWrapper = ({ children }) => {
  return (
    <Box>
      <HomeTopBar />
      <Box className="mt-20">{children}</Box>
      <Footer />
    </Box>
  );
};

export default HomeWrapper;
