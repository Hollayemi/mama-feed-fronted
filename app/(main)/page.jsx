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
import calculateDiscountedPrice from "../utils/discount";
import { useRouter } from "next/navigation";

const HomePage = ({ searchParams }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data, loading, error } = useSWR(
    `/products?limit=15&search=${searchParams?.search || "no search"}`
  );
  const {
    data: flashSale,
    flashSaleLoading,
    flashSaleError,
  } = useSWR("/store/campaign/flash-sale");

  console.log(flashSale);

  const { cart, handleLocalCartChange } = useData();

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      router.push(`?search=${search}`);
    }
  };

  const Underline = () => (
    <Box className="!mt-4">
      <Image
        src="/images/misc/Vector 1.png"
        alt="underline"
        width={400}
        height={10}
        className="w-10/12"
      />
      <Image
        src="/images/misc/Vector 2.png"
        alt="underline"
        width={400}
        height={10}
        className="w-10/12"
      />
    </Box>
  );

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

  // const CustomTextField = styled(TextField)({
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       border: "none",
  //     },
  //   },
  // });

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
              <Underline />
              <Typography
                variant="body2"
                className="!mt-8 !leading-6 !text-left!w-5/6 md:!w-4/6"
              >
                Step into a World of Timeless Magic with MamaFeeds: Your
                Exclusive Haven for Newborns and Kids&lsquo; Fashion. From
                Precious First Steps to Unforgettable Adventures.
              </Typography>

              <Button
                variant="contained"
                className="!rounded-full !mt-6 md:!mt-12 !shadow-none !bg-pink-500"
              >
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
                className=" !w-10/12 !rounded-xl md:!rounded-none md:!w-4/6 z-20 mb-10"
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
          <Box className="!flex !flex-col pb-3 items-center justify-center ">
            <Typography className="!font-bold !text-2xl text-center">
              <span className="!text-pink-500">Choose MamaFeeds:</span> Elevate
              Your <br className="hidden md:block" /> Shopping Experience
            </Typography>

            <Typography
              variant="caption"
              className="text-center !text-[13px] px-4"
            >
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
              <Box className="!rounded-full !overflow-hidden border-2 border-white focus-within:!border-pink-500 relative h-[44px] !-mr-0 w-full md:w-80">
                <input
                  id="icons-start-adornment"
                  className="!rounded-full w-full h-full pl-10 pr-4 !outline-none"
                  size="large"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleEnterKeyPress}
                />
                <IconifyIcon
                  icon="tabler:search"
                  className="absolute top-[10px] left-4"
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
            <Box className="flex flex-wrap justify-center">
              {/* <Grid container spacing={1}> */}
              {data?.data?.map((item, i) => (
                // <Grid
                //   item
                //   xs={6}
                //   key={i}
                //   sm={4}
                //   md={2.5}
                //   lg={2}
                //   className="!mb-14"
                // >
                <ProductOnShowcase
                  key={i}
                  image={item.images[0].image}
                  prodName={item.prodName}
                  category={item?.category}
                  star={item.star}
                  price={item.prodPrice}
                  inCart={cart?.includes(item._id)}
                  id={item._id}
                  handleLocalCartChange={handleLocalCartChange}
                />
                // </Grid>
              ))}
              {/* </Grid> */}
            </Box>
          ) : (
            <h4>loading </h4>
          )}
        </Box>

        {flashSale?.data.length > 0 && (
          <Box>
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

              <CountdownTimer
                currentDate={new Date()}
                endDate={flashSale?.data[0]?.end_date}
              />

              <Box className="flex justify-center mt-8">
                <Box className="w-11/12 md:w-4/5 !h-80">
                  <SwiperCentered>
                    {flashSale?.data.map((each, i) => (
                      <ProductOnShowcase
                        key={i}
                        image={each.product.images[0].image}
                        prodName={each.product.prodName}
                        price={calculateDiscountedPrice(
                          each.product.prodPrice,
                          parseInt(each.product.discount || 0)
                        )}
                        category={`${each.product.discount} %`}
                        star={each?.star[0]?.averageRating.toFixed()}
                      />
                    ))}
                  </SwiperCentered>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

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
              <Grid item xs={12} md={6} className="!bg-red-300">
                <Box className="relative w-full h-full">
                  <img
                    src="/images/more/Maternity.png"
                    alt="product_image"
                    className="!w-full h-full min-h-[350px] object-fill rounded-md"
                  />
                  <Typography
                    variant="body2"
                    className="absolute !text-md md:!text-2xl !text-white bottom-4 left-4 !font-bold"
                  >
                    Maternity
                  </Typography>
                  <Link href="/shop/Maternity">
                    <Box className="absolute top-4 right-4 w-32 h-8 !text-white rounded-full border-2 border-white flex justify-center items-center">
                      Shop Now
                      <IconifyIcon
                        icon="tabler:trending-up-3"
                        className="!ml-2"
                      />
                    </Box>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box className="relative">
                      <img
                        src="/images/more/boy.png"
                        alt="product_image"
                        className="!w-full !h-[180px] md:!h-[225px] rounded-md"
                      />
                      <Typography
                        variant="body2"
                        className="absolute !text-md md:!text-2xl !text-white bottom-4 left-4 !font-bold"
                      >
                        Boy’s Clothing
                      </Typography>
                      <Link href="/shop/Boy’s-Clothing">
                        <Box className="absolute top-4 right-4 w-8 h-8 !text-white rounded-full border-2 border-white flex justify-center items-center">
                          <IconifyIcon icon="tabler:trending-up-3" />
                        </Box>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="relative">
                      <img
                        src="/images/more/girl.png"
                        alt="product_image"
                        className="!w-full !h-[180px] md:!h-[225px] rounded-md"
                      />
                      <Typography
                        variant="body2"
                        className="absolute !text-md md:!text-2xl !text-white bottom-4 left-4 !font-bold"
                      >
                        Girl’s Clothing
                      </Typography>
                      <Link href="/shop/Girl’s-Clothing">
                        <Box className="absolute top-4 right-4 w-8 h-8 !text-white rounded-full border-2 border-white flex justify-center items-center">
                          <IconifyIcon icon="tabler:trending-up-3" />
                        </Box>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="!mt-5">
                  <Box className="relative">
                    <img
                      src="/images/more/layette.png"
                      alt="product_image"
                      className="!w-full !h-[200px] md:!h-[300px] rounded-md"
                    />
                    <Typography
                      variant="body2"
                      className="absolute !text-md md:!text-2xl !text-white bottom-4 left-4 !font-bold"
                    >
                      Layette
                    </Typography>
                    <Link href="/shop/layette">
                      <Box className="absolute top-4 right-4 w-32 h-8 !text-white rounded-full border-2 border-white flex justify-center items-center">
                        Shop Now
                        <IconifyIcon
                          icon="tabler:trending-up-3"
                          className="!ml-2"
                        />
                      </Box>
                    </Link>
                  </Box>
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
                className="!font-bold !text-2xl w-11/12 md:w-4/6"
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
