/* eslint-disable @next/next/no-img-element */
"use client";

import HomeWrapper from "@/app/components/view/home";
import Head from "next/head";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SpecBox } from "./spec";
import IconifyIcon from "@/app/components/icon";
import { ReviewTab } from "./components";
import Link from "next/link";
import useSWR from "swr";
import { useData } from "@/app/hooks/useData";
import { cartHandler } from "@/app/redux/state/slices/home/cart";
import { useDispatch } from "react-redux";
import calculateDiscountedPrice from "@/app/utils/discount";
import { productsList } from "@/app/redux/state/slices/shop/display/allProducts";
import { server } from "@/app/redux/state/slices/api/baseApi";

// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params
//   const { product: prodId } = params;

//   // fetch data
//   const product = await fetch(`${server}/products?prodId=${prodId}`).then(
//     (res) => res.json()
//   );

//   console.log(product);

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.title,
//     openGraph: {
//       images: ["/some-specific-page-image.jpg", ...previousImages],
//     },
//   };
// }

const ProductPage = ({ params }) => {
  const dispatch = useDispatch();
  const { handleLocalCartChange, cart, offline } = useData();
  const [color, selectColor] = useState([]);
  const [size, selectSize] = useState([]);
  const allColor = ["green", "red", "blue", "pink"];
  const allSize = ["S", "M", "L", "XL"];
  const { category, product: prodId } = params;
  const realCate = category.replaceAll("-", " ");
  const { data, loading, error } = useSWR(`/products?prodId=${prodId}`);

  console.log(data, loading, error);

  const product = !loading && !error && data ? data.data[0] : {};
  console.log(product.specifications);
  const [showingImage, showImage] = useState(null);
  return (
    <>
      {/* <Head>
        <title>Product Name - Your E-commerce Store</title>
        <meta
          name="description"
          content="A detailed description of your product goes here."
        />
        <meta
          name="keywords"
          content="product, e-commerce, description, key features"
        />
      </Head> */}
      <HomeWrapper>
        {!loading && !error && data ? (
          <Box className="!px-3 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7">
            <Box variant="caption text-gray-400 !text-xs">
              <Link href={`/shop/All`}>Browse Category</Link> /{" "}
              <Link href={`/shop/${realCate}`}>{realCate}</Link>
            </Box>

            <Box className="md:!mt-5">
              <Grid container spacing={3}>
                <Grid item sx={12} md={6}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      sx={12}
                      md={
                        typeof window !== "undefined" && window.innerWidth > 760
                          ? 3
                          : 12
                      }
                      className="!mr-0"
                    >
                      <Box className="flex mt-4 md:mt-0  md:flex-col items-center justify-start !w-full h-full">
                        {product.images.map((item, i) => (
                          <img
                            src={item.image}
                            key={i}
                            onClick={() => showImage(item.image)}
                            alt=""
                            width={150}
                            height={150}
                            className="m-3 md:mb-0 flex-shrink-0 !w-24 !h-24 !rounded-md"
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item sx={12} md={9}>
                      <img
                        src={showingImage || product.images[0].image}
                        alt=""
                        width={150}
                        height={150}
                        className="m-3 md:m-0 flex-shrink-0 w-80 h-80"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={12} md={6}>
                  <Typography
                    variant="body2"
                    className="!font-semibold !text-xl"
                  >
                    {product.prodName}
                  </Typography>

                  <Box className="flex items-center mt-1">
                    <Rating
                      defaultValue={product.star || 0}
                      className=""
                      name="size-small"
                      size="small"
                    />

                    <Typography variant="body2" className="!ml-5">
                      <span className="!mr-1 ">
                        {product.totalReviews || 0}
                      </span>
                      Reviews
                    </Typography>

                    <Typography variant="body2" className="!ml-5">
                      <span className="!mr-1 ">25</span>Items Sold
                    </Typography>
                  </Box>

                  <Box className="flex items-center mt-2">
                    <Typography
                      variant="body2"
                      className="whitespace-nowrap !text-2xl !font-bold"
                    >
                      <span className="!font-extrabold text-xs">$</span>

                      {calculateDiscountedPrice(
                        product.prodPrice,
                        parseInt(product.discount[0]?.value || 0)
                      )}
                    </Typography>

                    {product.discount && (
                      <>
                        <Typography
                          variant="body2"
                          className="whitespace-nowrap !text-[15px] !ml-8 !stroke-black !stroke-2 !font-bold"
                        >
                          <span className="!font-extrabold text-xs">$</span>
                          {product.prodPrice}
                        </Typography>
                        <Box className="!text-[9px] ml-8 bg-red-500 px-1 rounded-sm text-white">
                          Special Offer
                        </Box>
                        <Typography
                          variant="caption"
                          className="whitespace-nowrap !text-[12px] !ml-2 !font-bold"
                        >
                          {product.discount[0]?.value}% Discount
                        </Typography>
                      </>
                    )}
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
                        all={product.specifications?.color}
                        select={selectColor}
                        selected={color}
                        iscolor={true}
                      />
                    </Box>
                    <Box className=" ml-4 md:ml-4">
                      <Typography
                        variant="caption"
                        className="whitespace-nowrap !text-[14px] !font-bold"
                      >
                        Sizes
                      </Typography>
                      <SpecBox
                        all={product.specifications?.size}
                        select={selectSize}
                        selected={size}
                      />
                    </Box>
                  </Box>

                  <Box className="flex items-center mt-3">
                    <Typography variant="body2" className="">
                      Availability:{" "}
                      <span className="!ml-2 font-bold">In-stock</span>
                    </Typography>

                    <Typography variant="body2" className="!ml-5">
                      Quantity:{" "}
                      <span className="!ml-2 font-bold">
                        {product.totInStock} Items
                      </span>
                    </Typography>
                  </Box>

                  <Box className="mt-5">
                    <Button
                      variant="contained"
                      size="large"
                      className="!rounded-full !h-10 !w-52 !text-xs"
                      onClick={() => {
                        cartHandler(
                          { productId: product?._id, size, color },
                          dispatch,
                          offline
                        );
                        handleLocalCartChange(product?._id);
                      }}
                    >
                      {cart.includes(product._id)
                        ? "Remove from Cart"
                        : "Add to Cart"}
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
              <ReviewTab productId={prodId} />
            </Box>
          </Box>
        ) : (
          <h1>loading</h1>
        )}
      </HomeWrapper>
    </>
  );
};

export default ProductPage;
