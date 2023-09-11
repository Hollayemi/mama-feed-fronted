"use client";
import HomeWrapper from "@/app/components/view/home";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { AccountLeft, PictureSide } from "./components";
import IconifyIcon from "@/app/components/icon";
import { useState } from "react";
import GeneralDetails from "./pages/generalDetails";
import Notification from "./pages/notification";
import Security from "./pages/security";
import ShippingAddress from "./pages/address";

const MyAccount = () => {
  const [showing, setShowing] = useState("General Details")

  const pages = {
    general_details: <GeneralDetails />,
    notification: <Notification />,
    password_and_security: <Security />,
    billing_and_address: <ShippingAddress />
  }

  return (
    <HomeWrapper>
      <Box className="my-2 md:!py-6 px-2 md:!px-16">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box className="bg-white !rounded-xl p-2 py-6">
              <AccountLeft setShowing={setShowing} showing={showing} title="General Details" />
              <AccountLeft setShowing={setShowing} showing={showing} title="Notification" />
              <AccountLeft setShowing={setShowing} showing={showing} title="Password and Security" />
              <AccountLeft setShowing={setShowing} showing={showing} title="Billing and Address" />
              <AccountLeft setShowing={setShowing} showing={showing} title="Delete Account" />
              <Box className="flex h-8 my-2 items-center border-t-2 !mt-6 !text-black hover:!text-pink-500 !pl-4">
                <Typography
                  variant="body1"
                  className="!text-[16px] !font-bold !text-red-500 !py-5 pl-2 !mt-2 cursor-pointer"
                >
                  Log Out
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
              {pages[showing.toLowerCase().replaceAll(" ", "_")]}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default MyAccount;
