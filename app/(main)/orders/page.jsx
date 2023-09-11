"use client";
import HomeWrapper from "@/app/components/view/home";
import { OrderLeftSide } from "./components";
import {
  ProductOnCartView,
  ProductOnOrderView,
} from "@/app/components/templates/productTemplates";
import { orderStatusColor } from "@/app/utils/orders";
import { formatCurrency } from "@/app/utils/format";
import useSWR from "swr";
import { useState } from "react";

const { Box, Typography, Divider, Grid } = require("@mui/material");

const OrderPage = () => {
  const { data, loading, error } = useSWR("/user/order")
  const [display, setDisplay] = useState({})
  console.log(data, loading, error);
  const OrderDetails = ({ title, info, color }) => {
    return (
      <Box className="flex text-[20px] items-center justify-between !mb-2">
        <Typography variant="caption">{title}</Typography>
        <Typography
          variant="caption"
          className={`text-left text-[20px] !font-bold bg-${orderStatusColor(
            color || "pending"
          )}-500`}
        >
          {info}
        </Typography>
      </Box>
    );
  };
  return (
    <Box className="!flex items-start justify-evenly">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className="">
            <Box className="!w-full bg-white p-6 rounded-md !mb-2">
              <Typography variant="body1" className="!font-bold">
                Orders History
              </Typography>

              <OrderLeftSide
                data={data}
                setDisplay={setDisplay}
                display={display}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            className={`bg-white rounded-md ${
              !display.orderSlug && "hidden md:block"
            }  px-4 py-5`}
          >
            <Typography variant="body1" className="!font-bold">
              Order {display?.orderSlug}
            </Typography>

            {display?.order_items?.products.map((item, i) => (
              <ProductOnOrderView
                key={i}
                product={{
                  image: item?.storeProducts?.images[0].image,
                  prodName: item.storeProducts.prodName,
                  prodPrice: item.storeProducts.prodPrice,
                  desc: "Days with baby are made easy with simple sets like this one...",
                  totInStock: item.storeProducts.quantity,
                  color: item.storeProducts.color,
                  size: item.storeProducts.size,
                }}
              />
            ))}

            <Box className="!mt-16 px-4">
              <Typography variant="body1" className="!font-bold">
                Order Details
              </Typography>
              <Box className="mt-4">
                <OrderDetails
                  title="Phone Number"
                  info={display?.userPhone}
                  color="gray"
                />
                <OrderDetails
                  title="Delivery Address"
                  info="1234 Elm Street Cityville, CA 12345 United States"
                  color="gray"
                />
                <OrderDetails
                  title="Status"
                  info={display?.status}
                  color={display?.status}
                />
                <Divider />
                <br />
                <OrderDetails
                  title="Total"
                  info={formatCurrency(
                    display?.order_items?.totalAmount || 0,
                    "USD",
                    "US"
                  )}
                  color="completed"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default OrderPage;
