"use client";
import IconifyIcon from "@/app/components/icon";
import {
  OfflineProductOnCartView,
  ProductOnCartView,
  ProductOnCategory,
} from "@/app/components/templates/productTemplates";
import HomeWrapper from "@/app/components/view/home";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import useSWR from "swr";
import Image from "next/image";
import { useData } from "@/app/hooks/useData";
import { useRouter } from "next/navigation";
import { addOrderApi, orderHandler } from "@/app/redux/state/slices/home/order";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ShopPage = ({ params }) => {
  const { cart, cartData, offline, handleLocalCartChange } = useData();
  const route = useRouter();
  const dispatch = useDispatch();



  const [payload, updatePayload] = useState({
    discount: 10,
    shippingAddress: {},
    deliveryDateSpan: "7_days",
    paymentInfo: {},
  });

  const { data, loading, error } = useSWR(
    `/products?category=${params.category.replace("-", " ")}`
  );

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  });

  const Category = ({ image, text }) => {
    return (
      <Box
        onClick={() => route.push(`${text.replace(" ", "-")}`)}
        className={`!w-24 !h-24 flex flex-col cursor-pointer flex-shrink-0 justify-center items-center m-1.5 border-[3px] ${
          params.category.replace("-", " ") === text
            ? "border-pink-500 bg-pink-50"
            : "bg-white border-white"
        }  rounded-xl  hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50`}
      >
        <Image src={image} alt={text} width={30} height={30} />
        <Typography variant="caption" className="!mt-2.5 !text-[10px]">
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <HomeWrapper>
      <Box className="sm:!px-4 lg:!px-10">
        <Box className="flex justify-between items-center w-1/2 !py-6">
          <Typography variant="body1" className="!font-bold !text-3xl">
            Choose Category
          </Typography>
          <Box className="!rounded-full !overflow-hidden border-2 border-gray-400 !-mr-40">
            <CustomTextField
              fullWidth
              id="icons-start-adornment"
              className="!rounded-full !border-none !outline-none !w-80"
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
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} md={9} lg={9.5}>
            <Box className="flex items-center mt-6">
              <Category image="/images/misc/all.png" text="All" />
              <Category
                image="/images/misc/boy-category.png"
                text="Boy's Clothing"
              />
              <Category
                image="/images/misc/girl-category.png"
                text="Girl's Clothing"
              />
              <Category
                image="/images/misc/layette-category.png"
                text="Layette"
              />
              <Category
                image="/images/misc/maternity-category.png"
                text="Maternity"
              />
              <Category image="/images/misc/toy-category.png" text="Toys" />
            </Box>

            <Box className="flex items-center justify-between mt-10 px-3">
              <Typography variant="body-2" className="!font-bold">
                Boy’s Clothing
              </Typography>
              <Typography variant="caption" className="!mr-10">
                1 - 8 of 1382 products{" "}
              </Typography>
            </Box>

            <Grid container spacing={1}>
              {!loading &&
                data &&
                data.data.map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={i}>
                    {item && (
                      <ProductOnCategory
                        product={item}
                        cartProducts={cart}
                        handleLocalCartChange={handleLocalCartChange}
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={3} lg={2.5}>
            <Box className="bg-white rounded-xl py-4 sm:!px-4">
              <Box className="flex items-center mb-4">
                <IconifyIcon icon="tabler:search" />
                <Typography variant="body-2" className="!ml-3">
                  Cart ({!offline ? cartData?.products?.length : cart.length})
                </Typography>
              </Box>
              {!offline ? (
                cartData?.products?.map((cart, i) => (
                  <ProductOnCartView key={i} products={cart} />
                ))
              ) : cart.length > 0 ? (
                cart.map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={i}>
                    <OfflineProductOnCartView product={item} />
                  </Grid>
                ))
              ) : (
                <h4>No cart</h4>
              )}

              <Box className="flex items-center justify-between mb-1 mt-8 !text-[12px]">
                <Typography variant="caption" className="!ml-3 !font-bold">
                  Sub-Total
                </Typography>

                <Typography variant="caption" className="!font-bold">
                  <span className="!text-[10px]">$</span>
                  {cart?.sum_price}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="caption" className="!ml-3">
                  Tax (2%)
                </Typography>

                <Typography variant="caption" className="!font-bold">
                  <span className="text-[10px]">$</span>
                  14
                </Typography>
              </Box>
              <Box className="border-t-2 my-4 border-dashed"></Box>
              <Box className="flex items-center justify-between mb-1 mt-8 !text-[12px]">
                <Typography variant="caption" className="!ml-3 !font-bold">
                  Total
                </Typography>

                <Typography variant="caption" className="!font-bold">
                  <span className="!text-[10px]">$</span>
                  742.75
                </Typography>
              </Box>
              <Box className="!mt-8">
                <Typography variant="body-2" className="!font-bold">
                  Shipping Address
                </Typography>

                <Button
                  variant="contained"
                  className="!bg-white !text-xs !text-gray-500 !h-12 !mt-3 !shadow-none !rounded-2xl !border-dashed !border-2"
                  startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
                >
                  Add Shipping Address
                </Button>
              </Box>
              <Button
                variant="contained"
                fullWidth
                className="!h-12 !text-xs !mt-14 !rounded-full"
                onClick={() => orderHandler(payload, dispatch)}
              >
                Proceed to payment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default ShopPage;
