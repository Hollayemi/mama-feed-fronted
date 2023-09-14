import { Box, Switch, Typography } from "@mui/material";
import { useState } from "react";

const Notification = () => {

  const [values, setValues] = useState({
    order_notifications: false,
    login_alerts: false,
    promotions_and_offers: false,
    product_reviews_and_recommendations: false,
    account_security_alerts: false,
  });

  const handleChange = (prop, to) => {
    setValues(() => {
      return { ...values, [prop]: to };
    });
  };

  const EachSwitch = ({ title, brief }) => {
    const formatTitle = title.toLowerCase().replaceAll(" ", "_");
    // console.log(formatTitle)
    return (
      <Box className="!flex !justify-between !items-center !mb-6">
        <Box className="">
          <Typography variant="body1" className="!text-[15px] !mb-1 !font-bold">
            {title}
          </Typography>
          <Typography variant="caption" className="!text-[13px] ">
            {brief}
          </Typography>
        </Box>
        <Switch
          edge="end"
          checked={values[formatTitle]}
          className="!md:mr-2"
          onChange={(e) => handleChange(formatTitle, !values[formatTitle])}
        />
      </Box>
    );
  };

  return (
    <Box>
      <Typography
        variant="body1"
        className="!text-[18px] !font-bold !text-black"
      >
        Notification
      </Typography>
      <br />

      <Box className=" md:pl-5 pr-4 md:pr-10">
        <EachSwitch
          title="Login Alerts"
          brief="Notifications on successful log ins to your account"
        />
        <EachSwitch
          title="Real-Time Updates:"
          brief="Receive updates about your order's status, from processing to delivery."
        />
        <EachSwitch
          title="Promotions and Offers"
          brief="Real-time push notifications for updates like new orders, customer inquiries, or system alerts."
        />
        <EachSwitch
          title="Inventory Alerts"
          brief="Notify admins when stock levels are critically low or when a product is out of stock."
        />
        <EachSwitch
          title="Account Security Alerts"
          brief="Be informed of any changes to your account details or security settings."
        />
      </Box>
    </Box>
  );
};

export default Notification;
