/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useSWR from "swr";
import { CalendarMonth } from "@mui/icons-material";
import { statusObj, DetailsDesign, Summarize } from ".";
import CustomChip from "@/app/components/chip";
import Icon from "@/app/components/icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import {
  calculateDateDiff,
  formatCurrency,
  formatDate,
  formatShippingAddress,
} from "@/app/utils/format";
import StoreWrapper from "@/app/components/view/store";
import { updateOrder } from "@/app/redux/state/slices/admin/order";
import { useDispatch } from "react-redux";

const OrderDetails = ({ params }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [payload, setPayload] = useState({ orderId: params.orderId });

  const {
    data: orderInfo,
    error: orderErr,
    isLoading: orderLoading,
  } = useSWR(`/user/order?orderId=${params.orderId}`);

  const open = Boolean(anchorEl);
  const openSub = Boolean(subAnchorEl);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setPayload({ ...payload, [prop]: event?.target?.value});
  };

  const handleChange2 = (prop, aux) => {
    console.log(aux);
    setPayload({ ...payload, [prop]: aux });
  };

  console.log(payload)

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
  };

  const handleMenuItemClick = (action) => (e) => {
    handleChange2("status", action);
    // Handle action here
    if (action === "") {
      setSubAnchorEl(true);
    } else {
      setAnchorEl(null);
      setSubAnchorEl(null);
    }
  };

  const customizeStatus = (text) => {
    const status = statusObj.filter((e) => e.title === text.toLowerCase())[0];

    return (
      <CustomChip
        rounded
        size="small"
        skin="light"
        color={status?.color}
        label={status?.title}
        sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
      />
    );
  };

  const renderMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      className="left-0"
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuItemClick("")}
        className="flex items-center  justify-between w-full"
      >
        Update Order Status{" "}
        <ChevronRightIcon className="text-[15px] ml-5 md:ml-8" />
      </MenuItem>
      <MenuItem
        onClick={handleMenuItemClick("Refund")}
        className="text-orange-500"
      >
        Refund
      </MenuItem>
      <MenuItem
        onClick={handleMenuItemClick("Cancelled")}
        className="text-red-500"
      >
        Cancel Order
      </MenuItem>
    </Menu>
  );

  const renderSubMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={openSub}
      onClose={handleMenuClose}
      className={` w-full ml-56 py-4 px-4`}
    >
      <MenuItem
        onClick={handleMenuItemClick("Processing")}
        className="flex items-center justify-between w-full"
      >
        Processing
      </MenuItem>
      <MenuItem onClick={handleMenuItemClick("Out for Delivery")}>
        Out for Delivery
      </MenuItem>
      <MenuItem onClick={handleMenuItemClick("On Hold")}>On Hold</MenuItem>
      <MenuItem onClick={handleMenuItemClick("Received")}>Received</MenuItem>
    </Menu>
  );
  const row = (!orderLoading && !orderErr && orderInfo?.data[0]) || null;
  const products = [];
  return (
    <StoreWrapper>
      <Box className=" !mx-2 md:!mx-10 bg-white !rounded-md p-2 !mt-28">
        {row && !orderLoading && !orderErr && (
          <Box className="">
            <Grid container spacing={3} className="md:px-5">
              <Grid item xs={6} md={3} className="md:px-5">
                <Typography
                  variant="h5"
                  className="!text-xs !font-bold !leading-10 !flex !items-center"
                >
                  Order ID: <b className="ml-3">{row.orderSlug}</b>
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} className="md:px-5">
                <Typography
                  variant="h5"
                  className="!text-xs !font-bold !flex !items-center !leading-10"
                >
                  <CalendarMonth className="text-[15px]" />{" "}
                  <b className="ml-2 md:ml-3">{formatDate(row.createdAt)}.</b>
                  <b className="ml-2 md:ml-3">10:00 am</b>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="md:!px-5">
              <Grid item xs={12} md={6} className="md:!px-5">
                <Typography
                  variant="h5"
                  className="!text-xs !leading-10 !flex !items-center"
                >
                  <b className="font-bold mr-4">Status:</b>{" "}
                  {customizeStatus(row.status)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} className="mt-3">
                <Grid container spacing={1} className="">
                  <Grid item xs={6} md={6}>
                    <Button
                      fullWidth
                      onClick={handleButtonClick}
                      className="!flex !items-center !justify-between !text-xs px-4 !text-gray-600 !bg-pink-50"
                    >
                      {payload.status || "Change Status"}
                      {open ? (
                        <ExpandLessIcon className="text-[15px]" />
                      ) : (
                        <ExpandMoreIcon className="text-[15px]" />
                      )}
                    </Button>
                    {/* <div className="relative"> */}
                    {open && renderMenu()}
                    {openSub && renderSubMenu()}
                    {/* </div> */}
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="!text-xs"
                      disabled={!(payload.status || payload.comment)}
                      startIcon={<Icon icon="tabler:device-floppy" />}
                      onClick={() => updateOrder(dispatch, payload)}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="!text-xs"
                      disabled
                      startIcon={<Icon icon="tabler:printer" />}
                    >
                      Send PDF
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box className="flex flex-wrap items-start justify-between md:justify-evenly mt-10">
              <DetailsDesign
                icon="tabler:user"
                title="Customer"
                color="green"
                info={[
                  {
                    key: "First Name",
                    value: row.shippingAddress.fullname,
                  },
                  { key: "Email", value: row.userEmail },
                  { key: "Phone", value: row.userPhone },
                ]}
              />

              <DetailsDesign
                icon="tabler:shopping-cart"
                color="red"
                title="Order Info"
                info={[
                  // { key: "Delivery Medium", value: row.deliveryMedium },
                  {
                    key: "Order Total Price",
                    value: formatCurrency(row.order_items.totalAmount),
                  },
                  {
                    key: "Est Delivery Date",
                    value: calculateDateDiff("4_days", row.createdAt, "+"),
                  },
                ]}
              />

              <DetailsDesign
                icon="tabler:truck-delivery"
                color="blue"
                title="Deliver To"
                info={[
                  {
                    key: "Address",
                    value: formatShippingAddress(row.shippingAddress),
                  },
                ]}
              />
            </Box>
          </Box>
        )}

        <Grid container spacing={3} className="!px-2 md:!px-5">
          <Grid item xs={12} md={5}></Grid>
          <Grid item xs={12} md={7}>
            <TextField
              className="md:!mt-4 !mb-4"
              fullWidth
              defaultValue={row?.comment}
              multiline
              id="textarea-outlined"
              onChange={handleChange("comment")}
              maxRows={6}
              placeholder="Type some notes"
              minRows={5}
              label="Note"
            />
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          className="!font-bold !pb-4  mt-10 px-5 text-sm"
        >
          Products
        </Typography>
        {!orderLoading && !orderErr && (
          <Box className="w-full !overflow-auto md:!overflow-auto md:px-16">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    className="!font-bold"
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 0.5,
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.order_items.products.map((row) => {
                    return (
                      <TableRow
                        key={row.storeProducts.email}
                        sx={{
                          "&:last-child .MuiTableCell-root": {
                            pb: (theme) => `${theme.spacing(1)} !important`,
                            border: 0,
                          },
                          "& .MuiTableCell-root": {
                            border: 0,
                            py: (theme) => `${theme.spacing(1)} !important`,
                          },
                          "&:first-of-type .MuiTableCell-root": {
                            pt: (theme) => `${theme.spacing(1)} !important`,
                            border: 0,
                          },
                        }}
                      >
                        <TableCell>
                          <Box className="flex items-center">
                            <img
                              width={50}
                              height={50}
                              alt={row.storeProducts.fullname}
                              className="mr-3 w-12 h-12 "
                              src={
                                row.storeProducts.images[0].image ||
                                "/images/avatar/1.png"
                              }
                            />
                            <Typography
                              noWrap
                              className="!text-[12px]"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {row.storeProducts.prodName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className=" max-w-32 !mr-5">
                            <Typography
                              noWrap
                              className="!text-[12px]"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {formatCurrency(row.storeProducts.prodPrice)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {row.storeProducts.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {formatCurrency(
                              row.storeProducts.prodPrice *
                                row.storeProducts.quantity
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {!orderLoading && !orderErr && (
          <Box className="flex justify-end pr-6 mt-8 md:!px-16">
            <Box>
              <Summarize
                info={[
                  {
                    key: "Sub-Total",
                    value: `+ ${formatCurrency(row.order_items.totalAmount)}`,
                  },
                  {
                    key: "Discount",
                    value: `- ${formatCurrency(10)}`,
                  },
                  {
                    key: "Total",
                    value: `= ${formatCurrency(
                      row.order_items.totalAmount - 10
                    )}`,
                    bold: true,
                  },
                  {
                    key: "Status",
                    value: customizeStatus(row.status),
                  },
                ]}
              />
            </Box>
          </Box>
        )}
      </Box>
    </StoreWrapper>
  );
};

export default OrderDetails;
