"use client";

import { useSelector } from "react-redux";
import HomeTopBar from "./appBar";
import Footer from "./footer";
import { Box } from "@mui/material";

const HomeWrapper = ({ children }) => {
  return (
    <Box className="flex justify-center bg-black">
      <Box
        className="w-full max-w-[1500px] h-auto min-h-screen"
        bgcolor="custom.bodyGray"
      >
        <HomeTopBar />
        <Box className="mt-20">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomeWrapper;
