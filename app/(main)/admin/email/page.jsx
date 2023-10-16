"use client";
import StoreWrapper from "@/app/components/view/store";
import Email from "./components/Email";
import { Box } from "@mui/material";

const EmailApp = () => {
    return (
      <StoreWrapper>
        <Box className="relative !overflow-auto px-5 py-4">
          <Email folder="inbox" />
        </Box>
      </StoreWrapper>
    );
}
EmailApp.contentHeightFixed = true

export default EmailApp
