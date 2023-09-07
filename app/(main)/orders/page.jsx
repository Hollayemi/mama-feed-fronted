"use client";
import HomeWrapper from "@/app/components/view/home";
import { OrderLeftSide } from "./components";
import {
  ProductOnCartView,
  ProductOnOrderView,
} from "@/app/components/templates/productTemplates";
import { orderStatusColor } from "@/app/utils/orders";
import { formatCurrency } from "@/app/utils/format";

const { Box, Typography, Divider } = require("@mui/material");

const OrderPage = () => {
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
    <Box className="!flex items-start justify-evenly">
      <Box className="!w-4/12 !pr-5">
        <Box className="!w-full bg-white p-6 rounded-md !mb-2">
          <Typography variant="body1" className="!font-bold">
            Orders History
          </Typography>

          <OrderLeftSide />
        </Box>
      </Box>
      <Box className="bg-white w-8/12 rounded-md  px-4 py-5">
        <Typography variant="body1" className="!font-bold">
          Order #843921
        </Typography>
        <ProductOnOrderView
          product={{
            image: "/images/more/11.png",
            prodName: "Cool Kid Boys 2023 Summer Clothes ....",
            prodPrice: "130.49",
            desc: "Days with baby are made easy with simple sets like this one...",
            totInStock: 14,
          }}
        />
        <ProductOnOrderView
          product={{
            image: "/images/more/12.png",
            prodName: "Cool Kid Boys 2023 Summer Clothes ....",
            prodPrice: "130.49",
            desc: "Days with baby are made easy with simple sets like this one...",
            totInStock: 14,
          }}
        />
        <ProductOnOrderView
          product={{
            image: "/images/more/10.png",
            prodName: "Cool Kid Boys 2023 Summer Clothes ....",
            prodPrice: "130.49",
            desc: "Days with baby are made easy with simple sets like this one...",
            totInStock: 14,
          }}
        />
        <Box className="!mt-16 px-4">
          <Typography variant="body1" className="!font-bold">
            Order Details
          </Typography>
          <Box className="mt-4">
            <OrderDetails
              title="Phone Number"
              info="08147702684"
              color="gray"
            />
            <OrderDetails
              title="Delivery Address"
              info="1234 Elm Street Cityville, CA 12345 United States"
              color="gray"
            />
            <OrderDetails title="Status" info="completed" color="completed" />
            <Divider />
            <br />
            <OrderDetails
              title="Total"
              info={formatCurrency(244556, "USD", "US")}
              color="completed"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default OrderPage;
