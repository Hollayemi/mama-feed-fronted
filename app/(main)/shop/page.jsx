"use client";
import IconifyIcon from "@/app/components/icon";
import {
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
import Image from "next/image";

const ShopPage = () => {
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  });

  const Category = ({ image, text }) => {
    return (
      <Box className="!w-24 !h-24 flex flex-col cursor-pointer flex-shrink-0 justify-center items-center m-1.5 border-[3px] bg-white rounded-xl border-white hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50">
        <Image src={image} alt={text} width={30} height={30} />
        <Typography variant="caption" className="!mt-2.5 !text-[10px]">
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <HomeWrapper>
      <Box className="sm:!px-4 lg:!px-16">
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

        <Box className="flex">
          <Box className="!w-9/12">
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

            <Grid container spacing={0}>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/6.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/7.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/8.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/9.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/10.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/11.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/12.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/5.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ProductOnCategory
                  product={{
                    image: "/images/more/14.png",
                    prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                    prodPrice: "130.49",
                    desc: "Days with baby are made easy with simple sets like this one...",
                    totInStock: 14,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box className="!w-3/12 shrink-0 bg-white rounded-xl py-4 sm:!px-4">
            <Box className="flex items-center mb-4">
              <IconifyIcon icon="tabler:search" />
              <Typography variant="body-2" className="!ml-3">
                Cart (3)
              </Typography>
            </Box>
            <ProductOnCartView
              product={{
                image: "/images/more/7.png",
                prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                prodPrice: "130.49",
                desc: "Days with baby are made easy with simple sets like this one...",
                totInStock: 14,
              }}
            />
            <ProductOnCartView
              product={{
                image: "/images/more/12.png",
                prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                prodPrice: "130.49",
                desc: "Days with baby are made easy with simple sets like this one...",
                totInStock: 14,
              }}
            />
            <ProductOnCartView
              product={{
                image: "/images/more/11.png",
                prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                prodPrice: "130.49",
                desc: "Days with baby are made easy with simple sets like this one...",
                totInStock: 14,
              }}
            />
            <ProductOnCartView
              product={{
                image: "/images/more/5.png",
                prodName: "Cool Kid Boys 2023 Summer Clothes ....",
                prodPrice: "130.49",
                desc: "Days with baby are made easy with simple sets like this one...",
                totInStock: 14,
              }}
            />

            <Box className="flex items-center justify-between mb-1 mt-8 !text-[12px]">
              <Typography variant="caption" className="!ml-3 !font-bold">
                Sub-Total
              </Typography>

              <Typography variant="caption" className="!font-bold">
                <span className="!text-[10px]">$</span>
                742.75
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
                className="!bg-white !text-gray-500 !h-12 !mt-3 !shadow-none !rounded-2xl !border-dashed !border-2"
                startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
              >
                Add Shipping Address
              </Button>
            </Box>


            <Button
                variant="contained"
                fullWidth
                className="!h-12 !mt-14 !rounded-full"
              >
                Proceed to payment
              </Button>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default ShopPage;
