import { useData } from "@/app/hooks/useData";
import { updateUserPassword } from "@/app/redux/state/slices/auth/updateAccount";
import { Box, Button, Typography, TextField } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const EachSwitch = ({ title, brief, btnName, func }) => {
  return (
    <Box className="!flex !justify-between !items-center !mb-6">
      <Box className="w-4/6 md:w-3/5">
        <Typography variant="body2" className="!text-[15px] !mb-2 !font-bold">
          {title}
        </Typography>
        <Typography variant="caption" className="!text-[12px] ">
          {brief}
        </Typography>
      </Box>
      <Button variant="outlined" className="!text-xs md:!w-32" onClick={func}>
        {btnName}
      </Button>
    </Box>
  );
};

const Security = () => {
  const [showing, setShowing] = useState("security");
  const { userInfo, offline } = useData();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (offline) {
      router.replace(`/auth/login?returnUrl=${pathname}`);
    }
  }, [router, offline, pathname]);
  const tabs = {
    security: <All setShowing={setShowing} />,
    password: <Password />,
  };
  return tabs[showing];
};

export default Security;

const All = ({ setShowing }) => {
  const [values, setValues] = useState({
    old_pass: "",
    new_pass: "",
    confirm_pass: "",
  });

  const handleChange = (prop, to) => {
    setValues(() => {
      return { ...values, [prop]: to };
    });
  };
  return (
    <Box>
      <Typography
        variant="body1"
        className="!text-[16px] !font-bold !text-black"
      >
        Password and Secutiry
      </Typography>
      <br />

      <Box className="md:pl-5 md:pr-10">
        <EachSwitch
          btnName="Enable"
          title="Two Factor Authentication"
          brief="Enable two-factor authentication for an extra layer of 
          security. You'll receive a mail and you will need verify
          for the account verification"
        />
        <EachSwitch
          btnName="Change"
          func={() => setShowing("password")}
          title="Password"
          brief="Update existing password."
        />
        <EachSwitch
          btnName="Sign Out"
          title="Sign Out from All Devices"
          brief="If you suspect unauthorized access to your account, you 
          can sign out from all devices to secure your account."
        />
        <EachSwitch
          title="Login Activity"
          btnName="View"
          brief="View a history of recent login activity to monitor the 
          devices and locations where your account has been 
          accessed"
        />
      </Box>
    </Box>
  );
};

const Password = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };
  return (
    <Box>
      <Typography
        variant="body1"
        className="!text-[16px] !font-bold !text-black"
      >
        Password and Secutiry
      </Typography>
      <br />
      <Box className="md:!w-80 md:ml-4">
        <TextField
          sx={{ mb: 2 }}
          size="medium"
          fullWidth
          id="textarea-outlined"
          onChange={handleChange("oldPassword")}
          type="password"
          placeholder="Old Password"
          label="Old Password"
        />
        <TextField
          sx={{ mb: 2 }}
          size="medium"
          fullWidth
          id="textarea-outlined"
          onChange={handleChange("newPassword")}
          type="password"
          placeholder="New Password"
          label="New Password"
        />
        <TextField
          sx={{ mb: 2 }}
          size="medium"
          fullWidth
          id="textarea-outlined"
          onChange={handleChange("confirmPassword")}
          type="password"
          placeholder="Confirm the new Password"
          label="Confirm the new Password"
        />

        <Button
          variant="contained"
          onClick={() => updateUserPassword(values, dispatch)}
          fullWidth
          className="!rounded-full !mt-5"
        >
          Change
        </Button>
      </Box>
    </Box>
  );
};
