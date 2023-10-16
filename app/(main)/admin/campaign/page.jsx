"use client";
import StoreWrapper from "@/app/components/view/store";
import DiscountPage from "./discount";
import { useState } from "react";
import CampaignPage from "./campaign";

const { Box, Typography } = require("@mui/material");

const CampaignGenPage = () => {
  const [showing, setShowing] = useState("discount");
  return (
    <StoreWrapper>
      <Box className="!mx-2 sm:!mx-8 md:!mx-16 !my-10">
        <Box className="flex items-center mb-4">
          <Box
            onClick={() => setShowing("discount")}
            className={`!mx-5 cursor-pointer ${
              showing === "discount" && "border-b-2 border-pink-500"
            }`}
          >
            <Typography variant="body1" className="!font-bold !text-[15px]">
              Discount
            </Typography>
          </Box>

          <Box
            onClick={() => setShowing("campaign")}
            className={`!mx-5 cursor-pointer ${
              showing === "campaign" && "border-b-2 border-pink-500"
            }`}
          >
            <Typography variant="body1" className="!font-bold !text-[15px]">
              Campaign
            </Typography>
          </Box>
        </Box>

        <Box className="p-2 md:p-4  bg-white rounded-md">
          {showing === "discount" && <DiscountPage />}
          {showing === "campaign" && <CampaignPage />}
        </Box>
      </Box>
    </StoreWrapper>
  );
};

export default CampaignGenPage;
