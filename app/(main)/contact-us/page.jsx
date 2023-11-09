"use client";
const { default: HomeWrapper } = require("@/app/components/view/home");
import IconifyIcon from "@/app/components/icon";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Faqs from "./Faqs";
import { useData } from "@/app/hooks/useData";
import { sendEmail } from "@/app/redux/state/slices/users/notification";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ContactUs = () => {
  const { userInfo } = useData()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: userInfo.lastname + " " + userInfo.firstname || "",
    email: userInfo.email || "",
    message: "",
    subject: "",
  });

  const handleChange = (prop) => (event) => {
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };
  console.log(values);

  const data = [
    {
      question: "How do I place an order",
      answer:
        "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
    },
    {
      question: "How do I pay for my order",
      answer:
        "We accept Visa®, MasterCard®, American Express®, and PayPal®. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.",
    },
    {
      question: "HWhat should I do if I'm having trouble placing an order",
      answer:
        "For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com",
    },
    {
      question:
        "Which license do I need for an end product that is only accessible to paying users",
      answer:
        "If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.",
    },
    {
      question: "Does my subscription automatically renew?",
      answer:
        "No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps.",
    },
    {
      question: "How do I place an order",
      answer:
        "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
    },
    {
      question: "How do I place an order",
      answer:
        "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
    },
    {
      question: "How do I pay f an order",
      answer:
        "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
    },
    {
      question: "How do I place an order",
      answer:
        "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
    },
  ];

  const IconText = ({ icon, text }) => {
    return (
      <Box className="flex items-center !mb-3">
        <IconifyIcon icon={icon} className="text-pink-500 text-sm" />
        <Typography variant="caption" className="!ml-2">
          {text}
        </Typography>
      </Box>
    );
  };


  return (
    <HomeWrapper>
      <Box className="bg-gray-50 px-4 md:px-20 lg:px-40 pt-24 -mt-6 py-4">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            className="flex justify-center md:justify-start"
          >
            <Box className="!mb-6">
              <Typography
                variant="body1"
                className="text-pink-500 !text-2xl md:!text-[30px] !font-bold"
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                className="!font-bold !mt-2 !text-xl md:!text-[35px]"
              >
                How can we help you?
              </Typography>
              <Typography variant="caption" className="!mt:4 !text-[13px]">
                Please Kindly Fill the form or drop an email
              </Typography>

              <Box className="mt-6 md:pl-4">
                <IconText icon="tabler:phone" text="+1 719-377-2610" />
                <IconText icon="tabler:mail" text="support@mamafeeds.com" />
                <IconText
                  icon="tabler:map-2"
                  text="1234 Elm Street Cityville, CA 12345 United States"
                />

                <Box className="w-80 h-40 bg-gray-300 rounded-xl"></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="flex justify-center">
            <Box className="!w-[400px] !bg-pink-100 p-8 rounded-md md:float-right">
              <input
                size="small"
                value={values.name}
                placeholder="Full Name"
                className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-pink-500 !bg-white"
                onChange={handleChange("name")}
                fullWidth
              />
              <input
                size="small"
                value={values.email}
                placeholder="Email Address"
                className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-pink-500 !bg-white"
                fullWidth
                onChange={handleChange("email")}
              />
              <input
                size="small"
                value={values.subject}
                placeholder="Subject"
                className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-pink-500 !bg-white"
                fullWidth
                onChange={handleChange("subject")}
              />
              <textarea
                size="small"
                placeholder="Message"
                multiline
                onChange={handleChange("message")}
                rows={5}
                className="!mb-4 w-full px-3 py-2 h-28 rounded-md focus:outline-none focus:ring focus:ring-pink-500 !bg-white"
                fullWidth
              ></textarea>
              <Button
                variant="contained"
                className="!rounded-full !h-12"
                fullWidth
                onClick={() => sendEmail(dispatch, values)}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box className="flex flex-col items-center justify-center !mt-16 ">
          <Typography variant="body1" className="!font-bold !text-2xl !mb-16">
            Frequently Asked Questions
          </Typography>
          <Box className="md:w-3/4">
            <Faqs data={data} />
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default ContactUs;
