"use client";

import HomeWrapper from "@/app/components/view/home";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SpecBox } from "./spec";
import IconifyIcon from "@/app/components/icon";
import { ReviewTab } from "./components";

const ProductPage = () => {
  const [color, selectColor] = useState("");
  const [size, selectSize] = useState("");
  const allColor = ["green", "red", "blue", "pink"];
  const allSize = ["S", "M", "L", "XL"];
  return (
    <HomeWrapper>
      <Box className="!px-1 sm:!px-16 md:!px-24 lg:!px-32 !py-7">
        <Typography variant="caption text-gray-400 !text-xs">
          Browse Category / Boy’s Clothing
        </Typography>

        <Box className="!mt-5">
          <Grid container spacing={3}>
            <Grid item sx={12} md={6}>
              <Grid container spacing={3}>
                <Grid item sx={12} md={typeof window !== "undefined" && window.innerWidth > 760 ? 3 : 12 } className="!mr-0">
                  <Box className="flex mt-4 md:mt-0  md:flex-col items-center justify-evenly !w-full h-full">
                    <Image
                      src="/images/more/6.png"
                      alt=""
                      width={150}
                      height={150}
                      className="m-3 md:m-0 flex-shrink-0 !w-24 !h-24 !rounded-md"
                    />
                    <Image
                      src="/images/more/8.png"
                      alt=""
                      width={150}
                      height={150}
                      className="m-3 md:m-0 flex-shrink-0 !w-24 !h-24 !rounded-md"
                    />
                    <Image
                      src="/images/more/9.png"
                      alt=""
                      width={150}
                      height={150}
                      className="m-3 md:m-0 flex-shrink-0 !w-24 !h-24 !rounded-md"
                    />
                  </Box>
                </Grid>
                <Grid item sx={12} md={9}>
                  <Image
                    src="/images/more/6.png"
                    alt=""
                    width={150}
                    height={150}
                    className="m-3 md:m-0 flex-shrink-0 w-80 h-80"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography variant="body2" className="!font-semibold !text-xl">
                High-Quality Baby boys Polo Shirt + Handsome Denim Shorts
                2-Piece Set kids boys clothes suits summer
              </Typography>

              <Box className="flex items-center mt-1">
                <Rating
                  defaultValue={2}
                  className=""
                  name="size-small"
                  size="small"
                />

                <Typography variant="body2" className="!ml-5">
                  <span className="!mr-2 ">5</span>Reviews
                </Typography>

                <Typography variant="body2" className="!ml-5">
                  <span className="!mr-2 ">25</span>Items Sold
                </Typography>
              </Box>

              <Box className="flex items-center mt-1">
                <Typography
                  variant="body2"
                  className="whitespace-nowrap !text-xl !font-bold"
                >
                  <span className="!font-extrabold text-xs">$</span>
                  36.54
                </Typography>

                <Typography
                  variant="body2"
                  className="whitespace-nowrap !text-[15px] !ml-8 !stroke-black !stroke-2 !font-bold"
                >
                  <span className="!font-extrabold text-xs">$</span>
                  56.54
                </Typography>

                <Box className="!text-[9px] ml-8 bg-red-500 px-1 rounded-sm text-white">
                  Special Offer
                </Box>
                <Typography
                  variant="caption"
                  className="whitespace-nowrap !text-[12px] ml-4 !font-bold"
                >
                  20% Discount
                </Typography>
              </Box>

              <Box className="flex items-center mt-4">
                <Box>
                  <Typography
                    variant="caption"
                    className="whitespace-nowrap !text-[14px] !font-bold"
                  >
                    Color
                  </Typography>
                  <SpecBox
                    all={allColor}
                    select={selectColor}
                    selected={color}
                    iscolor={true}
                  />
                </Box>
                <Box className="md:ml-4">
                  <Typography
                    variant="caption"
                    className="whitespace-nowrap !text-[14px] !font-bold"
                  >
                    Sizes
                  </Typography>
                  <SpecBox all={allSize} select={selectSize} selected={size} />
                </Box>
              </Box>

              <Box className="flex items-center mt-3">
                <Typography variant="body2" className="">
                  Availability:{" "}
                  <span className="!ml-2 font-bold">In-staok</span>
                </Typography>

                <Typography variant="body2" className="!ml-5">
                  Quantity: <span className="!ml-2 font-bold">23 Items</span>
                </Typography>
              </Box>

              <Box className="mt-5">
                <Button
                  variant="contained"
                  size="large"
                  className="!rounded-full !h-10 !w-52 !text-xs"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="!rounded-md !w-12 !h-10 !ml-3"
                >
                  <IconifyIcon icon="tabler:search" />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>


        <Box className="bg-white mt-14 !p-5 !rounded-xl">
          <ReviewTab />
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default ProductPage;
