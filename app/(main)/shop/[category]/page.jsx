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
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";
import Image from "next/image";
import { useData } from "@/app/hooks/useData";
import { useRouter } from "next/navigation";
import { addOrderApi, orderHandler } from "@/app/redux/state/slices/home/order";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FlashSales } from "@/app/components/templates/flashSales";
import Pagination from "@/app/components/templates/Pagination";
import { formatCurrency } from "@/app/utils/format";

const ShopPage = ({ params, searchParams, data:hk }) => {
  const { cart, cartData, offline, handleLocalCartChange, selectedAddress } =
    useData();
  console.log(cartData);
  const router = useRouter();
  const [cartTotal, sumCartTotal] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  console.log(selectedAddress);
  console.log(hk);

  const [payload, updatePayload] = useState({
    shippingAddress: selectedAddress || {},
    deliveryDateSpan: "7_days",
  });

  const { data, loading, error } = useSWR(
    `/products?category=${params.category.replace("-", " ")}&page=${
      searchParams?.page || 1
    }&search=${searchParams?.search || "no search"}`
  );

  console.log(data && data.message);

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      router.push(`?search=${search}`);
    }
  };

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
        onClick={() => router.push(`${text.replace(" ", "-")}`)}
        className={`!w-16 !h-24 md:!w-24 md:!h-24 flex flex-col cursor-pointer flex-shrink-0 justify-center items-center m-1.5 border-[3px] ${
          params.category.replace("-", " ") === text
            ? "border-pink-500 bg-pink-50"
            : "bg-white border-white"
        }  rounded-xl  hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50`}
      >
        <Image src={image} alt={text} width={30} height={30} />
        <Typography
          variant="caption"
          className="!mt-2.5 !text-[10px] !text-center"
        >
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <HomeWrapper>
      <Box className="sticky -z-10 top-0 left-0 px-4 md:px-10">
        <FlashSales />
      </Box>
      <Box className="!px-2 sm:!px-4 lg:!px-10 z-30 bg-gray-50 relative">
        <Box className="flex flex-col md:flex-row md:justify-between md:items-center w-full md:w-full !py-6">
          <Typography
            variant="body1"
            className="!font-bold !text-xl md:!text-3xl !mb-2"
          >
            Choose Category
          </Typography>
          <Box className="!overflow-hidden border2 border-gray-400">
            <TextField
              fullWidth
              id="icons-start-adornment"
              className="!rounded-full !border-none !outline-none md:!w-80 !w-full"
              size="small"
              onKeyDown={handleEnterKeyPress}
              sx={{ borderRadius: 50 }}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => router.push(`?search=${search}`)}
                  >
                    <IconifyIcon icon="tabler:search" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} md={9} lg={9.5}>
            <Box className="flex items-center mt-6 overflow-auto pb-3">
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
              <Typography variant="body2" className="!font-bold">
                {params.category.replace("-", " ")}
              </Typography>
              <Typography variant="caption" className="md:!mr-10">
                {(searchParams.page || 1) * 5 - 4} -{" "}
                {(searchParams.page || 1) * 5} of {data?.message?.totalResult}{" "}
                products{" "}
              </Typography>
            </Box>

            <Grid container spacing={1}>
              {!loading &&
                data &&
                data.data.map((item, k) => (
                  <Grid item xs={12} sm={6} lg={4} key={`${k}sdt`}>
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
            <Box className="flex justify-center">
              {data && (
                <Pagination
                  totalNumber={data.message.totalResult}
                  currentPage={searchParams.page || 1}
                  searchParams={searchParams}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={3} lg={2.5}>
            <Box className="bg-white rounded-xl py-4 px-4 !mt-6 md:!mt-0">
              <Box className="flex items-center mb-4">
                <IconifyIcon
                  icon="tabler:shopping-cart"
                  className="!text-[20px]"
                />
                <Typography variant="body2" className="!ml-3 !text-[14px]">
                  Cart ({!offline ? cartData?.products?.length : cart?.length})
                </Typography>
              </Box>
              {!offline ? (
                cartData?.products?.map((item, i) => (
                  <ProductOnCartView
                    key={i}
                    products={item}
                    cartProducts={cart}
                    handleLocalCartChange={handleLocalCartChange}
                  />
                ))
              ) : cart?.length > 0 ? (
                cart.map((item, e) => (
                  <OfflineProductOnCartView
                    key={`${e}4ds`}
                    sumCartTotal={sumCartTotal}
                    handleLocalCartChange={handleLocalCartChange}
                    product={item}
                  />
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
                  {cartData?.total?.sum_totalBeforeDiscount?.toFixed(2)}
                </Typography>
              </Box>

              <Box className="border-t-2 my-4 border-dashed"></Box>
              <Box className="flex items-center justify-between mb-1 mt-8 !text-[12px]">
                <Typography variant="caption" className="!ml-3 !font-bold">
                  Total
                </Typography>

                <Typography variant="caption" className="!font-bold">
                  <span className="!text-[10px]">$</span>
                  {cartData?.total?.sum_totalPrice?.toFixed(2)}
                </Typography>
              </Box>
              <Box className="!mt-8">
                <Typography variant="body2" className="!font-bold">
                  Shipping Address
                </Typography>
                <br />
                <Typography variant="caption" className="!text-xs">
                  {payload.shippingAddress.address}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    router.push("/my-account?to=billing_and_address")
                  }
                  className="!bg-white !text-[11px] !text-gray-500 !h-12 !mt-3 !shadow-none !rounded-2xl !border-dashed !border-2"
                  startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
                >
                  Add Shipping Address
                </Button>
              </Box>
              <Button
                variant="contained"
                fullWidth
                className="!h-12 !text-xs !mt-14 !bg-pink-500 !rounded-full"
                onClick={() => orderHandler(payload, dispatch, offline)}
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


export async function getServerSideProps(context) {
  // Fetch data based on the dynamic parameter (context.params.id)
  const id = context.params.id;
  
  console.log(id)

  return {
    props: {
      data: id,
    },
  };
}

export default ShopPage;