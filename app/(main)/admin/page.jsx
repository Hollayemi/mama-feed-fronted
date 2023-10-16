"use client";
import { Box, Typography, Grid } from "@mui/material";
import { DigitWithTopTag } from "./comonents/dashboard";
import { formatCurrency } from "@/app/utils/format";
import Image from "next/image";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { orderColumns } from "./orders/columns";
import {
  BestSellingProducts,
  CardStatisticsProfit,
} from "./comonents/smallTable";
import useSWR from "swr";
import StoreWrapper from "@/app/components/view/store";
import { useData } from "@/app/hooks/useData";

const Dashboard = () => {
  const { data: anaData, isLoading } = useSWR("/store/analytics");
  const { adminInfo } = useData()
  const analytics = anaData?.data.dashboardData || null;
  const myRows = analytics
    ? analytics?.pendingOrders.map((e, i) => {
        return { ...e, id: i };
      })
    : null;

    console.log(adminInfo);
  return (
    <StoreWrapper>
      <Box className="px-1 md:px-6">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box className="!rounded-xl bg-white !p-3">
              <Box className="p-3 flex items-center justify-evenly">
                <Box className="w-9/12">
                  <Box>
                    <Typography
                      variant="body1"
                      className="!font-bold !text-[20px] !overflow-hidden !whitespace-nowrap !text-ellipsis"
                    >
                      Good Afternoon, {adminInfo.name}
                    </Typography>
                    <Typography variant="body2" className="">
                      Here’s what is happening in your store today
                    </Typography>
                  </Box>

                  <Box className="flex items-start justify-beteen !mt-5">
                    <DigitWithTopTag
                      tag="Today’s Visit"
                      digit={analytics && analytics?.todaysVisit[0]?.count}
                    />
                    <div className="ml-6"></div>
                    <DigitWithTopTag
                      tag="Today’s total sales"
                      digit={formatCurrency(
                        analytics && analytics?.todaysSales[0]?.totalAmount
                      )}
                    />
                  </Box>
                </Box>

                <Image
                  src="/images/misc/preview.png"
                  alt="dashboard"
                  className="w-24 h-26"
                  width={250}
                  height={250}
                />
              </Box>
              <Box className="w-full bg-pink-100 h-10 mt-5 flex items-center justify-between px-5">
                <Box className="flex items-center">
                  <Box className="w-3 h-3 rounded-full bg-stone-500 mr-4"></Box>
                  <Typography variant="caption" className="">
                    {analytics && analytics?.outOfStock} products are almost out
                    of stock.
                  </Typography>
                </Box>
                <Box className="flex items-center text-xs">View product</Box>
              </Box>
              <Box className="w-full h-10 flex items-center justify-between px-5">
                <Box className="flex items-center">
                  <Box className="w-3 h-3 rounded-full bg-pink-500 mr-4"></Box>
                  <Typography variant="caption" className="">
                    {analytics && analytics?.pendingOrders?.length} orders need
                    to be fufilled.
                  </Typography>
                </Box>
                <Box className="flex items-center text-xs">View orders</Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="bg-white rounded-xl px-6 py-7 w-full">
              <Grid container className="bg-white">
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className="border-r my-3 py-2 items-center"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className="md:border-r my-3 py-2 items-center"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className=" border-r md:border-0 my-3 py-2 items-center"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className="md:border-r my-3 py-2 items-center"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className="border-r my-3 py-2 items-center"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <DigitWithTopTag
                    tag="Today’s Visit"
                    digit={formatCurrency(230)}
                    className="my-3 py-2 items-center"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box className="my-7">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <BestSellingProducts analytics={analytics} />
            </Grid>
            <Grid item xs={12} sm={6} className="md:!-mt-9 !rounded-xl">
              <CardStatisticsProfit />
            </Grid>
          </Grid>
        </Box>

        <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
          <Typography variant="h5" className="!font-bold !text-sm py-6">
            Order History
          </Typography>
          {myRows && (
            <OrderTable
              columns={orderColumns}
              onRowClick={() => {}}
              rows={myRows}
            />
          )}
        </Box>
      </Box>
    </StoreWrapper>
  );
};

export default Dashboard;
