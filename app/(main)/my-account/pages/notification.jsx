import { useData } from "@/app/hooks/useData";
import { updateUserAccount } from "@/app/redux/state/slices/auth/updateAccount";
import { Box, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Notification = () => {

  const { userInfo } = useData();
  console.log(userInfo);

  const [values, setValues] = useState({
    order_notifications: userInfo?.order_notifications || false,
    login_alerts: userInfo?.login_alerts || false,
    promotions_and_offers: userInfo?.promotions_and_offers || false,
    product_reviews_and_recommendations: userInfo?.product_reviews_and_recommendations || false,
    account_security_alerts: userInfo?.account_security_alerts || false,
  });

  const dispatch = useDispatch();

  const handleChange = (prop, to) => {
    setValues(() => {
      return { ...values, [prop]: to };
    });
    updateUserAccount({ ...values, [prop]: to }, dispatch);
  };

  const EachSwitch = ({ title, brief }) => {
    const formatTitle = title.toLowerCase().replaceAll(" ", "_");
    // console.log(formatTitle)
    return (
      <Box className="!flex !justify-between !items-center !mb-6">
        <Box className="">
          <Typography variant="body2" className="!text-[15px] !mb-1 !font-bold">
            {title}
          </Typography>
          <Typography variant="caption" className="!text-[12px] ">
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
        className="!text-[16px] !font-bold !text-black"
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
          title="Order Notifications"
          brief="Receive updates about your order's status, from processing to delivery."
        />
        <EachSwitch
          title="Promotions and Offers"
          brief="Stay informed about exclusive discounts, promotions, and special offers."
        />
        <EachSwitch
          title="Product Reviews and Recommendations"
          brief="Get personalized product recommendations based on your purchase history and preferences."
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
