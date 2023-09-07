"use client";
import HomeWrapper from "@/app/components/view/home";
import IconifyIcon from "@/app/components/icon";

import { OrderLeftSide } from "./components";
import {
  ProductOnCartView,
  ProductOnOrderView,
} from "@/app/components/templates/productTemplates";
import { orderStatusColor } from "@/app/utils/orders";
import { formatCurrency } from "@/app/utils/format";
import Link from "next/link";

const { Box, Typography, Divider } = require("@mui/material");

const TrackOrder = ({ children }) => {
  return (
    <HomeWrapper>
      <Box className="flex items-center justify-between h-10 bg-white rounded-full !mx-16">
        <Link href="/orders">
          <Typography
            variant="body1"
            className="!font-normal !mx-10 border-b-2 cursor-pointer border-transparent hover:border-pink-500"
          >
            Orders #282232
          </Typography>
        </Link>
        <Link href="/orders">
          <IconifyIcon />
          <Typography
            variant="body1"
            className="!font-normal !mx-10 border-b-2 cursor-pointer border-transparent hover:border-pink-500"
          >
            Download Invoice
          </Typography>
        </Link>
      </Box>
      <Box className="!px-16 mt-5 ">{children}</Box>
    </HomeWrapper>
  );
};
export default TrackOrder;
