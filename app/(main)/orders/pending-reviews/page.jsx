"use client";
import { ProductOnOrderView } from "@/app/components/templates/productTemplates";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { OrderLeftSide } from "../components";

const PendingReviews = () => {
  return (
    <Box className="!flex items-start justify-evenly">
      <Box className="!w-4/12 !pr-5">
        <Box className="!w-full bg-white p-6 rounded-md !mb-2">
          <Typography variant="body1" className="!font-bold">
            Pending Reviews
          </Typography>

          <OrderLeftSide type="reviews" />
        </Box>
      </Box>
      <Box className="bg-white w-8/12 rounded-md  px-4 py-5">
        <Typography variant="body1" className="!font-extrabold">
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

        <Box>
          <Typography variant="body1" className="!font-bold !mb-2 !mt-14">
            Leave a Review
          </Typography>

          <Rating defaultValue={0} name="size-small" size="large" className="!mb-1" />
          <Typography variant="body1" className="!font-bold !mb-2">
            Detailed Review
          </Typography>

          <TextField multiline rows={5} fullWidth placeholder="Tell us more about your ratings" className="!rounded-md" />

          <br />
          <Button variant="contained" fullWidth className="!text-xs !rounded-full !mt-5 !h-10">Submit Review</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default PendingReviews;
