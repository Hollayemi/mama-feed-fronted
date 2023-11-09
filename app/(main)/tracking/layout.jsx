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

const TrackOrder = ({ children, searchParams }) => {
  console.log(searchParams,  "kjlkjl");
  return (
    <HomeWrapper>
      
      <Box className="!px-16 mt-5 ">{children}</Box>
    </HomeWrapper>
  );
};
export default TrackOrder;
