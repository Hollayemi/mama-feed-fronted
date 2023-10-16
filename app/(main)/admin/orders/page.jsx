"use client";
import HomeWrapper from "@/app/components/view/home";
import { Box, Grid, Typography } from "@mui/material";
import { LeftTab } from "./components";
import { useState } from "react";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { orderColumns } from "./columns";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import StoreWrapper from "@/app/components/view/store";

const AdminOrderPage = () => {
  const router = useRouter()
  const [showing, setShowing] = useState("all");
  const { data: orderData, isLoading: orderLoading } = useSWR(`/user/order?status=${showing}`);

  console.log(orderData);
  const [pointer, setPointer] = useState("All Orders");

  const onRowClick = (row) => {
    console.log(row);
    router.push(`/admin/orders/${row.id}`);
  };

  return (
    <StoreWrapper>
      <Box className="my-2 md:!py-6 px-2 md:!px-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className="bg-white !rounded-xl p-2 py-6">
              <LeftTab
                setPointer={setPointer}
                setShowing={() => setShowing("all")}
                pointer={pointer}
                title="All Orders"
              />
              <LeftTab
                setPointer={setPointer}
                setShowing={() => setShowing("pending")}
                pointer={pointer}
                title="New Orders"
              />
              <LeftTab
                setPointer={setPointer}
                setShowing={() => setShowing("completed")}
                pointer={pointer}
                title="Completed Orders "
              />
              <LeftTab
                setPointer={setPointer}
                setShowing={() => setShowing("cancelled")}
                pointer={pointer}
                title="Cancelled Orders"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
              <Typography variant="h5" className="!font-bold !text-sm py-6">
                Order History ({pointer})
              </Typography>
              {orderData?.data && (
                <OrderTable
                  columns={orderColumns}
                  onRowClick={onRowClick}
                  rows={orderData.data}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StoreWrapper>
  );
};

export default AdminOrderPage;
