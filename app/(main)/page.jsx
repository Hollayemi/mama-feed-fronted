/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import HomeWrapper from "../components/view/home";
import Check from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import IconifyIcon from "../components/icon";
import { ProductOnShowcase } from "../components/templates/productTemplates";
import SwiperCentered from "../components/templates/imageSlider";
import { FooterTestimonies } from "../components/view/home/footer";
import useSWR from "swr";
import { useState } from "react";
import { useData } from "../hooks/useData";
import { isLoggedIn } from "../redux/state/slices/api/setAuthHeaders";
import CountdownTimer from "./countDown";
import { calculateDateDiff } from "../utils/format";
import { FlashSales } from "../components/templates/flashSales";

const HomePage = () => {
  const { data, loading, error } = useSWR("/products?limit=15");
  const { cart, handleLocalCartChange } = useData();

  const CheckList = ({ name }) => (
    <Box className="flex items-center">
      <Box className="w-4 h-4 rounded-full flex justify-center items-center bg-green-700">
        <Check className="text-white !text-[9px]" />
      </Box>
      <Typography variant="caption" className="!ml-4">
        {name}
      </Typography>
    </Box>
  );

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  });

  const ShopingExperience = ({ image, title, text }) => (
    <Box className="!flex !flex-col !items-center !justify-center w-48 mb-8">
      <Image src={image} alt="img_here" width={60} height={60} />
      <Typography className="!ml-4 text-sm !font-bold text-center">
        {title}
      </Typography>
      <Typography variant="caption" className="!mt-4 text-xs text-center">
        {text}
      </Typography>
    </Box>
  );

  return (
    <HomeWrapper>
      <Box className="md:py-5 ">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box className="!p-3 md:!px-16">
              <Typography className="!font-black text-left !text-2xl md:!text-3xl  md:pt-6">
                Discover <span className="!text-pink-500">MamaFeeds</span>:{" "}
                <br /> Elevate Your Family&lsquo;s Style with Our Exclusive
                Collection
              </Typography>
              <Typography
                variant="body2"
                className="!mt-8 !leading-6 !text-left!w-5/6 md:!w-4/6"
              >
                Step into a World of Timeless Magic with MamaFeeds: Your
                Exclusive Haven for Newborns and Kids&lsquo; Fashion. From
                Precious First Steps to Unforgettable Adventures.
              </Typography>

              <Button variant="contained" className="!rounded-full !mt-12">
                Shop now
              </Button>
              <Box className="mt-5">
                <CheckList name="Free Shipping Worldwide" />
                <CheckList name="Fast Shipping" />
                <CheckList name="Real-Time Tracking" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="relative overflow-hidden flex justify-center px-3">
              <Image
                src="/images/more/home-first.png"
                alt="image_here"
                className=" !w-full md:!w-4/6 z-20 mb-10"
                width={600}
                height={400}
              />
              <Box className="absolute w-[580px] h-[580px] !rounded-full bg-gray-200 -bottom-[260px] -right-[260px]"></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="!px-px sm:!px-5 md:!px-10 lg:!px-16 !mt-10">
        <Box>
          <Box className="!flex !flex-col items-center justify-center ">
            <Typography className="!font-bold !text-2xl text-center">
              <span className="!text-pink-500">Choose MamaFeeds:</span> Elevate
              Your <br /> Shopping Experience
            </Typography>
            <br />
            <Typography variant="caption" className="text-center px-4">
              Discover Why MamaFeeds is Your Trusted Partner for Effortless
              Shopping
            </Typography>
          </Box>
          <Box>
            <Box className="flex items-center flex-wrap justify-around mt-8 md:px-10">
              <ShopingExperience
                image="/images/misc/image 691.png"
                title="Fast Delivery"
                text="We offer lightning-fast delivery, ensuring your new family favorites arrive promptly."
              />

              <ShopingExperience
                image="/images/misc/image 701.png"
                title="Free Shipping"
                text="Boundaries don't define your shopping aspirations. Enjoy the freedom of worldwide shopping with our free shipping service."
              />
              <ShopingExperience
                image="/images/misc/image 711.png"
                title="Real-Time Tracking"
                text="With our real-time tracking feature, you can follow your order's journey at every step"
              />
              <ShopingExperience
                image="/images/misc/image 731.png"
                title="Secured Payment Method"
                text="Shop confidently knowing that your payment information is safeguarded with  security measures"
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography className="!font-bold !text-2xl !mt-14 text-center">
            Product Showcase
          </Typography>

          <Box className="flex justify-between ">
            <Box className="flex flex-col md:flex-row justify-between items-center bg-slate-20 w-full !my-5 !mb-8 px-2">
              <Box className="w-52"></Box>
              <Box className="!rounded-full !overflow-hidden relative border-2 border-gray-400 h-[44px] !-mr-0 w-full md:w-80">
                <CustomTextField
                  id="icons-start-adornment"
                  className="!rounded-full !border-none !outline-none"
                  size="small"
                  sx={{ borderRadius: 50 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon icon="tabler:search" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Link
                href="/shop/All"
                className=" !text-sm text-center text-pink-500 mt-4 md:mt-0 flex items-center md:w-52"
              >
                <Typography className="!font-bold">
                  See More Collection
                </Typography>
                <IconifyIcon icon="tabler:trending-up-3" />
              </Link>
            </Box>
          </Box>
          {!loading && !error ? (
            <Box className="flex justify-center">
              <Grid container spacing={1}>
                {data?.data?.map((item, i) => (
                  <Grid
                    item
                    xs={6}
                    key={i}
                    sm={4}
                    md={2.5}
                    lg={2}
                    className="!mb-14"
                  >
                    <ProductOnShowcase
                      image={item.images[0].image}
                      prodName={item.prodName}
                      category={item.category}
                      star={item.star}
                      price={item.prodPrice}
                      inCart={cart?.includes(item._id)}
                      id={item._id}
                      handleLocalCartChange={handleLocalCartChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <h4>loading </h4>
          )}
        </Box>

        <Box className="!mt-20">
          <Typography className="!font-bold !text-2xl text-center">
            Flash Sales
          </Typography>
          <Box className="flex justify-center px-4 mt-10">
            <Box className="w-full md:w-4/6">
              <FlashSales />
            </Box>
          </Box>
        </Box>
        <Box className="!mt-20">
          <Box>
            <Typography className="!font-bold !text-2xl text-center">
              Quick Fire Flash Sales
            </Typography>

            <Typography className="text-[11px] text-pink-500 text-center !my-5">
              Ends in
            </Typography>
          </Box>

          <CountdownTimer initialDate={new Date()} daysToCount={2} />

          <Box className="flex justify-center mt-8">
            <Box className="w-11/12 md:w-4/5 !h-80">
              <SwiperCentered>
                <ProductOnShowcase
                  image="/images/more/1.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/2.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/3.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/4.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/5.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/boy.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
                <ProductOnShowcase
                  image="/images/more/girl.png"
                  prodName="New Designer Cartoon New Designer Cartoon ...."
                  category="Girls Clothing"
                  sliderBigView={
                    typeof window !== "undefined" && window.innerWidth < 400
                  }
                />
              </SwiperCentered>
            </Box>
          </Box>
        </Box>

        <Box className="px-3 md:!px-20 !mt-20">
          <Box>
            <Typography className="!font-bold !text-2xl mb-10 text-center">
              Featured Categories
            </Typography>

            <Grid container className="my-11">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  className="!text-2xl !font-normal text-center md:text-left md:w-60"
                >
                  Discover a dynamic Marketplace
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  className="!text-[11px] md:float-right md:!w-80  !text-center md:!text-right !mt-2"
                  sx={{ textAlign: "right" }}
                >
                  Unlock the Doors to a Vibrant Marketplace Where Every Click
                  Leads to New Discoveries and Every Choice Crafts a Journey.
                  Embrace the Dynamic Spectrum of Possibilities That Await Your
                  Exploration.
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img
                  src="/images/more/Maternity.png"
                  alt="product_image"
                  className="!w-full h-[350px] md:h-[550px] rounded-md"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <img
                      src="/images/more/boy.png"
                      alt="product_image"
                      className="!w-full !h-[180px] md:!h-[225px] rounded-md"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      src="/images/more/girl.png"
                      alt="product_image"
                      className="!w-full !h-[180px] md:!h-[225px] rounded-md"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className="!mt-5">
                  <img
                    src="/images/more/layette.png"
                    alt="product_image"
                    className="!w-full !h-[200px] md:!h-[300px] rounded-md"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box className="!mt-24 px-3 md:px-16">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                className="!font-bold !text-2xl md:w-4/6"
              >
                <span className="text-pink-500">Embrace the Journey:</span>{" "}
                Celebrating Every Moment of Motherhood
              </Typography>

              <Typography variant="caption" className="!mt-6 md:!mt-14 !mb-6">
                Becoming a mother is embarking on a journey of love, growth, and
                endless wonder. From the first fluttering kicks to late-night
                lullabies, each moment weaves a tapestry of memories that become
                a part of your story. At MamaFeeds, we&lsquo;re honored to stand
                by your side, offering a collection as unique as your journey.
                Our clothing is crafted with care, designed to make every step
                of motherhood comfortable and stylish. Join us as we celebrate
                the joy, resilience, and boundless love that define the
                beautiful journey of motherhood.
              </Typography>
              <br />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="flex justify-center">
                <img
                  src="/images/more/video.png"
                  alt="product_image"
                  className="md:!w-4/5 !h-full rounded-md"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <FooterTestimonies />
      </Box>
    </HomeWrapper>
  );
};

export default HomePage;
