/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Button, Rating, Typography } from "@mui/material";
import IconifyIcon from "../icon";
import {
  cartHandler,
  changeQuantity,
} from "@/app/redux/state/slices/home/cart";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { SpecBox } from "@/app/(main)/shop/[category]/[product]/spec";
import { useData } from "@/app/hooks/useData";
import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import { mySubstring } from "@/app/utils/format";

export const ProductOnShowcase = ({
  image,
  category,
  prodName,
  price,
  star,
  inCart,
  id,
  handleLocalCartChange,
}) => {
  const dispatch = useDispatch();
  const { offline } = useData();
  const router = useRouter();
  return (
    <Box className="!w-44 !h-68 m-1.5 md:m-4 ">
      <Box
        onClick={() =>
          router.push(`/shop/${category?.replaceAll(" ", "-")}/${id}`)
        }
      >
        <img
          src={image}
          alt="product_image"
          className="!w-44 !h-48 rounded-md"
        />
      </Box>
      <Box className="py-2 px-px">
        <Link href={`/shop/${category?.replaceAll(" ", "-")}/${id}`}>
          <Box>
            <Typography
              variant="body2"
              className="!whitespace-nowrap !font-bold !overflow-hidden !text-ellipsis"
            >
              {prodName}
            </Typography>
          </Box>
        </Link>

        <Box className="flex items-center justify-between">
          <Typography
            variant="caption"
            className="whitespace-nowrap text-ellipsis !text-[9px]"
          >
            {category}
          </Typography>
          <Rating
            defaultValue={parseInt(star) || 0}
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
            onClick={() => {}}
          >
            {inCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const ProductOnCategory = ({
  product,
  cartProducts,
  handleLocalCartChange,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { offline } = useData();

  return (
    <Box className="m-1 p-3 py-4 rounded-xl md:!w-76 relative bg-white ProductOnCategory">
      <Box className="!flex items-center relative">
        <Link
          href={`/shop/${product?.category?.replaceAll(" ", "-")}/${
            product._id
          }`}
          className="w-5/12 flex-shrink-0"
        >
          <img
            src={product.images && product.images[0].image}
            className="w-full h-full rounded-xl"
            alt={product?.prodName}
          />
        </Link>
        <Link
          href={`/shop/${product?.category?.replaceAll(" ", "-")}/${
            product._id
          }`}
        >
          <Box className="pl-2 cursor-pointer">
            <Typography variant="body2" className="!font-bold">
              {product?.prodName}
            </Typography>
            <Typography variant="h5" className="!mt-1 !text-[11px] !leading-1">
              {mySubstring(product?.prodInfo, 78)}
            </Typography>

            <Typography variant="body1" className="!font-extrabold">
              <span className="!font-extrabold text-[10px]">$</span>
              {product?.prodPrice.toLocaleString()}
            </Typography>
          </Box>
        </Link>

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
          className="!mt-5 !rounded-full !text-xs !bg-pink-500"
          fullWidth
          startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
          onClick={() => {
            cartHandler({ productId: product?._id }, dispatch, offline);
            handleLocalCartChange(product?._id);
          }}
        >
          {cartProducts?.includes(product._id)
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export const ProductOnCartView = ({
  products: { product, quantity },
  cartProducts,
  handleLocalCartChange,
}) => {
  const { offline } = useData();
  const dispatch = useDispatch();
  return (
    <Box className="!flex !w-full p-2 m-1 items-center relative">
      <img
        src={product?.images[0].image}
        className="w-16 h-16 rounded-xl"
        alt={product?.prodName}
      />
      <Box className="pl-2 w-full">
        <Typography variant="h5" className="!text-[12px] !leading-1">
          {product?.prodName}
        </Typography>

        <Box className="flex justify-between max-w-[300px] my-2.5 md:my-0.5">
          <Box
            onClick={() =>
              changeQuantity({ id: product?._id, operator: "+" }, dispatch)
            }
            className="h-4 w-4 rounded-full cursor-pointer bg-pink-500 text-white !font-black flex items-center justify-center"
          >
            +
          </Box>
          <Typography variant="caption" className="!text-[12px] text-pink-500">
            {quantity} units
          </Typography>
          <Box
            onClick={() =>
              changeQuantity({ id: product?._id, operator: "-" }, dispatch)
            }
            className="h-4 w-4 rounded-full cursor-pointer bg-pink-500 text-white !font-black flex items-center justify-center"
          >
            -
          </Box>
        </Box>
        <Box className="flex items-center justify-between mt-2">
          <IconifyIcon
            icon="tabler:shopping-cart"
            className="!text-[16px] text-pink-500"
            onClick={() =>
              cartHandler({ productId: product?._id }, dispatch, offline)
            }
          />
          <Typography variant="body1" className="!font-extrabold !text-[12px]">
            <span className="!font-extrabold !text-[10px]">$</span>
            {(product?.prodPrice * quantity)?.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const OfflineProductOnCartView = ({
  product,
  handleLocalCartChange,
  sumCartTotal,
}) => {
  const { offline } = useData();
  const dispatch = useDispatch();
  console.log(product);
  const { data, loading, error } = useSWR(`/products?prodId=${product}`);

  useEffect(() => {
    if (data && data.data[0]) {
      sumCartTotal((prev) => prev + data.data[0].prodPrice || 0);
    }
  }, [data, sumCartTotal]);

  return !loading && !error && data ? (
    <Box className="!flex !w-full md:p-2 m-1 items-center relative">
      <Box
        onClick={() => {
          cartHandler({ productId: product }, dispatch, offline);
          handleLocalCartChange(product);
          sumCartTotal((prev) => prev - data.data[0].prodPrice);
        }}
        className="absolute -top-2 !mt-3 -right-2 bg-pink-500 w-6 h-6 flex items-center justify-center !rounded-full !shadow-xl"
      >
        <IconifyIcon icon="tabler:minus" className="!text-[13px] !text-white" />
      </Box>
      <img
        src={data.data[0].images[0].image}
        className="w-16 h-16 rounded-xl"
        alt={data.data[0].prodName}
      />
      <Box className="pl-2">
        <Typography
          variant="h5"
          className="!text-[8px] md:!text-[12px] !leading-1"
        >
          {data.data[0].prodName}
        </Typography>

        <Box className="flex items-center justify-between mt-2">
          <Typography
            variant="caption"
            className="!text-[8px] md:!text-[12px] text-pink-500"
          >
            1 units
          </Typography>

          <Typography
            variant="body1"
            className="!font-extrabold !text-[8px] md:!text-[12px]"
          >
            <span className="!font-extrabold !text-[10px] md:!text-[10px]">
              $
            </span>
            {data.data[0].prodPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <h4>loading</h4>
  );
};

export const ProductOnOrderView = ({ product }) => {
  return (
    <Box className="flex items-ccnter md:px-4">
      <Box className="!flex !w-full p-2 m-1 flex-grow items-center relative">
        <img
          src={product.image}
          className="w-16 md:w-28 h-16 md:h-28 rounded-xl"
          alt={product.prodName}
        />
        <Box className="pl-6">
          <Typography
            variant="body2"
            className="!text-[15px] md:!text-[17px] !leading-1"
          >
            {product.prodName}
          </Typography>

          <Box className="flex mt-1">
            {product.size.length > 0 && (
              <Box className="flex flex-col items-start">
                <Typography
                  variant="caption"
                  className="!text-[13px] md:!text-[16px]"
                >
                  colors
                </Typography>

                <SpecBox all={product.color} iscolor />
              </Box>
            )}
            {product.size.length > 0 && (
              <Box className="flex flex-col items-start !ml-7">
                <Typography
                  variant="caption"
                  className="!text-[13px] md:!text-[16px]"
                >
                  Sizes
                </Typography>

                <SpecBox all={product.size} />
              </Box>
            )}
          </Box>
          <Box className="flex items-center justify-between mt-1">
            <Typography
              variant="caption"
              className="!text-[13px] md:!text-[17px] text-pink-500"
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
