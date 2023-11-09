"use client";
import HomeWrapper from "@/app/components/view/home";
import { OrderLeftSide, OrderStages } from "./components";
import {
  ProductOnCartView,
  ProductOnOrderView,
} from "@/app/components/templates/productTemplates";
import { orderStatusColor } from "@/app/utils/orders";
import { formatCurrency } from "@/app/utils/format";
import TimelineLeft from "./timeline";
import useSWR from "swr";
import IconifyIcon from "@/app/components/icon";
import Link from "next/link";

const { Box, Typography, Divider } = require("@mui/material");

const TrackingPage = ({ searchParams }) => {
  const {
    data: order,
    loading,
    error,
  } = useSWR(`/user/order?slug=${searchParams.slug}`);
  console.log(order);
  const OrderDetails = ({ title, info, color }) => {
    return (
      <Box className="flex text-[20px] items-center justify-between !mb-2">
        <Typography variant="caption">{title}</Typography>
        <Typography
          variant="caption"
          className={`text-left text-[20px] !font-bold bg-${orderStatusColor(
            color
          )}-500`}
        >
          {info}
        </Typography>
      </Box>
    );
  };
  return (
    <Box>
      <Box className="flex items-center justify-between h-10 bg-white rounded-full !mb-5">
        <Link href="/orders">
          <Typography
            variant="body1"
            className="!font-normal !mx-10 cursor-pointer"
          >
            Orders {searchParams.slug}
          </Typography>
        </Link>
        <Link href="/orders">
          <IconifyIcon />
          <Typography
            variant="body1"
            className="!font-normal !mx-10 cursor-pointer hover:!text-gray-600"
          >
            Download Invoice
          </Typography>
        </Link>
      </Box>
      <Box className="!flex items-start justify-evenly">
        <Box className="bg-white w-8/12 rounded-md  px-4 py-5">
          <Typography variant="body1" className="!font-bold">
            Package
          </Typography>
          <Box>
            <OrderStages
              date={new Date()}
              at={3}
              status={order && order.data[0]?.status}
              price={order && order.data[0]?.order_items?.totalAmount}
            />
          </Box>
          <br />
          <br />
          <TimelineLeft />
        </Box>

        <Box className="!w-4/12 !pl-5">
          <Box className="!w-full bg-white py-6 px-3 rounded-md !mb-2">
            <Typography variant="body1" className="!font-bold">
              Order Details
            </Typography>

            {order &&
              order.data[0]?.order_items?.products.map((product, i) => (
                <ProductOnCartView
                  key={i}
                  products={{
                    product: { ...product.storeProducts },
                    quantity: product.storeProducts.quantity,
                  }}
                />
              ))}

            <Box className="border-t-2 !my-2 !mt-8 border-dashed"></Box>
            <Box className="flex items-center justify-between mb-1 mt-3 !text-[12px]">
              <Typography variant="caption" className="!ml-3 !font-bold">
                Sub-Total
              </Typography>

              <Typography variant="caption" className="!font-bold">
                <span className="!text-[10px]">$</span>
                {order && order.data[0]?.order_items?.totalAmount}
              </Typography>
            </Box>

            <Box className="flex items-center justify-between">
              <Typography variant="caption" className="!ml-3">
                Tax (2%)
              </Typography>

              <Typography variant="caption" className="!font-bold">
                <span className="text-[10px]">$</span>
                14
              </Typography>
            </Box>

            <Box className="border-t-2 my-4 border-dashed"></Box>

            <Box className="flex items-center justify-between mb-1 mt-8 !text-[12px]">
              <Typography variant="caption" className="!ml-3 !font-bold">
                Total
              </Typography>

              <Typography variant="caption" className="!font-bold">
                <span className="!text-[10px]">$</span>
                {order && order.data[0]?.order_items?.totalAmount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default TrackingPage;
