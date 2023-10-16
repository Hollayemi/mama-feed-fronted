"use client";
import StoreWrapper from "@/app/components/view/store";
import { Box, Typography, Grid } from "@mui/material";
import OverViewCard from "./overview";
import useSWR from "swr";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { customerColumns } from "./columns";

const CustomerPage = () => {
  const { data } = useSWR("/store/customers");
  console.log(data);
  return (
    <StoreWrapper>
      {data && (
        <Box className="px-5 md:px-16 !mt-4">
          <OverViewCard data={data.data} />

          <Box className="w-full h-full bg-white !rounded-md !mt-6 p-4 py-4">
            <Typography variant="h5" className="!font-bold !text-sm py-6">
              Customers
            </Typography>
            <OrderTable
              columns={customerColumns(data.data.abandoned)}
              rows={data.data.allAccounts}
            />
          </Box>
        </Box>
      )}
    </StoreWrapper>
  );
};

export default CustomerPage;
