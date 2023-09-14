"use client";
import HomeWrapper from "@/app/components/view/home";
import { Box, Grid, Typography } from "@mui/material";
import { LeftTab } from "./components";
import { useState } from "react";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { orderColumns } from "./columns";
import useSWR from "swr";

const AdminOrderPage = () => {
  const { data: orderData, isLoading: orderLoading } = useSWR("/user/order")

  console.log(orderData);
  const [showing, setShowing] = useState("General Details")

  const onRowClick = (row) => {
    console.log(row);
    router.push(
      `/admin/order/`
    );
  };

  return (
    <HomeWrapper>
      <Box className="my-2 md:!py-6 px-2 md:!px-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className="bg-white !rounded-xl p-2 py-6">
              <LeftTab
                setShowing={setShowing}
                showing={showing}
                title="All Orders"
              />
              <LeftTab
                setShowing={setShowing}
                showing={showing}
                title="New Orders"
              />
              <LeftTab
                setShowing={setShowing}
                showing={showing}
                title="Completed Orders "
              />
              <LeftTab
                setShowing={setShowing}
                showing={showing}
                title="Cancelled Orders"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
              <Typography variant="h5" className="!font-bold !text-sm py-6">
                Order History
              </Typography>
              <OrderTable
                columns={orderColumns}
                onRowClick={onRowClick}
                rows={orderData ? orderData.data : []}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default AdminOrderPage;
