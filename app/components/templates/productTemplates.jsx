/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Button, Rating, Typography } from "@mui/material";
import IconifyIcon from "../icon";
import { SpecBox } from "@/app/(main)/shop/[category]/[product]/spec";
import { cartHandler } from "@/app/redux/state/slices/home/cart";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "@/app/redux/state/slices/api/setAuthHeaders";

export const ProductOnShowcase = ({
  image,
  category,
  prodName,
  price,
  star,
  inCart,
  id,
  handleCartChange,
}) => {
  const dispatch = useDispatch();
  return (
    <Box className="!w-44 !h-56 m-2 ">
      <Box>
        <img
          src={image}
          alt="product_image"
          className="!w-44 !h-48 rounded-md"
        />
      </Box>
      <Box className="py-2 px-px">
        <Typography
          variant="body2"
          className="!whitespace-nowrap !font-bold !overflow-hidden !text-ellipsis"
        >
          {prodName}
        </Typography>
        <Box className="flex items-center justify-between">
          <Typography
            variant="caption"
            className="whitespace-nowrap text-ellipsis !text-[9px]"
          >
            {category}
          </Typography>
          <Rating
            defaultValue={star || 0}
            className=""
            name="size-small"
            size="small"
          />
        </Box>
        <Box className="flex items-center justify-between mt-2">
          <Typography
            variant="body-2"
            className="whitespace-nowrap text-ellipsis !font-bold"
          >
            <span className="!font-extrabold text-xs">$</span>
            {price || 36.54}
          </Typography>

          <Button
            variant="contained"
            size="small"
            className="!rounded-full !text-[9px] "
            onClick={() => {
              cartHandler({ productId: id }, dispatch);
              handleCartChange(id);
            }}
          >
            {inCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const ProductOnCategory = ({ product, cartProducts }) => {
  const dispatch = useDispatch();
  return (
    <Box className="m-1 p-3 py-4 rounded-xl !w-80 relative bg-white ProductOnCategory">
      <Box className="!flex items-center relative">
        <img
          src={product.images && product.images[0].image}
          className="w-5/12 rounded-xl"
          alt={product?.prodName}
        />
        <Box className="pl-2">
          <Typography variant="body2" className="!font-bold">
            {product?.prodName}
          </Typography>
          <Typography variant="h5" className="!mt-1 !text-[11px] !leading-1">
            {product?.prodInfo}
          </Typography>

          <Typography variant="body1" className="!font-extrabold">
            <span className="!font-extrabold text-[10px]">$</span>
            {product?.prodPrice}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          className="!text-[10px] absolute bottom-2 right-2"
        >
          {product.totInStock} units
        </Typography>
      </Box>
      <Box className="ProductOnCategory-CartBtn !transition-all delay-200 !duration-200">
        <Button
          variant="contained"
          className="!mt-5 !rounded-full !text-xs"
          fullWidth
          startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
          onClick={() => cartHandler({ productId: product?._id }, dispatch)}
        >
          {cartProducts.includes(product._id)
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export const ProductOnCartView = ({ products: { product, quantity } }) => {
  return (
    <Box className="!flex !w-full p-2 m-1 items-center relative">
      <img
        src={product?.images[0].image}
        className="w-16 h-16 rounded-xl"
        alt={product?.prodName}
      />
      <Box className="pl-2">
        <Typography variant="h5" className="!text-[12px] !leading-1">
          {product?.prodName}
        </Typography>

        <Box className="flex items-center justify-between mt-2">
          <Typography variant="caption" className="!text-[12px] text-pink-500">
            {quantity} units
          </Typography>

          <Typography variant="body1" className="!font-extrabold !text-[12px]">
            <span className="!font-extrabold !text-[10px]">$</span>
            {product?.prodPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ProductOnOrderView = ({ product }) => {
  return (
    <Box className="flex items-ccnter px-4">
      <Box className="!flex !w-full p-2 m-1 flex-grow items-center relative">
        <img
          src={product.image}
          className="w-28 h-28 rounded-xl"
          alt={product.prodName}
        />
        <Box className="pl-6">
          <Typography variant="body2" className="!text-[17px] !leading-1">
            {product.prodName}
          </Typography>

          <Box className="flex mt-1">
            <Box className="flex items-center">
              <Typography variant="caption" className="!text-[16px]">
                colors
              </Typography>

              <SpecBox all={["green", "red", "blue"]} iscolor />
            </Box>
            <Box className="flex items-center !ml-7">
              <Typography variant="caption" className="!text-[16px]">
                Sizes
              </Typography>

              <SpecBox all={["T", "TL", "XXL"]} />
            </Box>
          </Box>
          <Box className="flex items-center justify-between mt-1">
            <Typography
              variant="caption"
              className="!text-[17px] text-pink-500"
            >
              {product.totInStack || 5} units
            </Typography>

            <Typography variant="body1" className="!font-extrabold  md:hidden">
              <span className="!font-extrabold text-[10px]">$</span>
              {product.prodPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" hidden flex-shrink-0 w-48 md:flex flex-col justify-center items-center">
        <Typography variant="body1" className="!font-extrabold">
          <span className="!font-extrabold text-[10px]">$</span>
          {product.prodPrice}
        </Typography>
        <Typography variant="caption" className="!text-[15px]">
          (vax included)
        </Typography>
      </Box>
    </Box>
  );
};
