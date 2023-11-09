"use client";
import HomeWrapper from "@/app/components/view/home";
import { OrderLeftSide } from "./components";
import {
  ProductOnCartView,
  ProductOnOrderView,
} from "@/app/components/templates/productTemplates";
import { orderStatusColor } from "@/app/utils/orders";
import { formatCurrency } from "@/app/utils/format";
import Link from "next/link";

const { Box, Typography, Divider } = require("@mui/material");

const OrderPage = ({ children }) => {
  return (
    <HomeWrapper>
      <Box className="!px-2 md:!px-16">
        <Box className="flex items-center h-10 bg-white rounded-full">
          <Link href="/orders">
            <Typography
              variant="body1"
              className="!font-normal !mx-4 md:!mx-10 border-b-2 cursor-pointer border-transparent hover:border-pink-500"
            >
              Orders
            </Typography>
          </Link>
          <Link href="/orders/returns">
            <Typography
              variant="body1"
              className="!font-normal !mx-4 md:!mx-10 border-b-2 cursor-pointer border-transparent hover:border-pink-500"
            >
              Returns
            </Typography>
          </Link>
          <Link href="/orders/pending-reviews">
            <Typography
              variant="body1"
              className="!font-normal !mx-4 md:!mx-10 border-b-2 cursor-pointer border-transparent hover:border-pink-500"
            >
              Pending Reviews
            </Typography>
          </Link>
        </Box>
        <Box className="mt-5 ">{children}</Box>
      </Box>
    </HomeWrapper>
  );
};
export default OrderPage;
