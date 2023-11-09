"use client";
import { ProductOnOrderView } from "@/app/components/templates/productTemplates";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import { OrderLeftSide } from "../components";
import useSWR from "swr";
import { useState } from "react";
import IconifyIcon from "@/app/components/icon";
import { useDispatch } from "react-redux";
import { feedbackHandler } from "@/app/redux/state/slices/home/feedback";
import { useData } from "@/app/hooks/useData";

const PendingReviews = () => {

  const dispatch = useDispatch()
  const { pendingReviews:data } = useData()
  const [display, setDisplay] = useState({});

  const [values, setValues] = useState({
    rate: 0,
    review: "",
  })

  const handleChange = (prop) => (event) =>{
    setValues({ ...values, [prop]: event.target.value });
  } 
  return (
    <Box className="!flex items-start justify-evenly">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className="">
            <Box className="!w-full bg-white p-2 px-6 rounded-md !mb-2">
              <Typography variant="body1" className="!font-bold !mb-4">
                Pending Reviews
              </Typography>

              <OrderLeftSide
                type="reviews"
                data={data}
                setDisplay={setDisplay}
                display={display}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            className={`bg-white  rounded-md ${
              !display.orderSlug && "hidden md:block"
            } md:px-6 py-2`}
          >
            <Typography variant="body1" className="!font-bold !mb-4">
              Order {display?.orderSlug}
            </Typography>
            {display?.order_items?.map(({ product }, i) => (
              <Accordion key={i} className=" !border-0 bg-pink-50">
                <AccordionSummary
                  expandIcon={
                    <IconifyIcon
                      fontSize="1.25rem"
                      icon="tabler:chevron-down"
                    />
                  }
                >
                  <ProductOnOrderView
                    product={{
                      image: product.images[0].image,
                      prodName: product.prodName,
                      prodPrice: product.prodPrice,
                      desc: "Days with baby are made easy with simple sets like this one...",
                      totInStock: product.quantity,
                      color: product?.color,
                      size: product?.size,
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography
                      variant="body1"
                      className="!font-bold !mb-2 !mt-10"
                    >
                      Leave a Review
                    </Typography>

                    <Rating
                      defaultValue={0}
                      name="size-small"
                      size="large"
                      onChange={handleChange("rate")}
                      className="!mb-1"
                    />
                    <Typography variant="body1" className="!font-bold !mb-2">
                      Detailed Review
                    </Typography>

                    <TextField
                      multiline
                      rows={5}
                      onChange={handleChange("review")}
                      fullWidth
                      placeholder="Tell us more about your ratings"
                      className="!rounded-md"
                    />

                    <br />
                    <Button
                      variant="contained"
                      fullWidth
                      className="!text-xs !rounded-full !mt-5 !h-10"
                      onClick={() =>
                        feedbackHandler(
                          {
                            ...values,
                            productId: product.productId,
                            index: i,
                            orderId: display._id,
                          },
                          dispatch
                        )
                      }
                    >
                      Submit Review
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PendingReviews;
