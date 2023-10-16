import IconifyIcon from "@/app/components/icon";
import { useData } from "@/app/hooks/useData";
import { deleteAddress, newAddress, selectAddress } from "@/app/redux/state/slices/users/address";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const ShippingAddress = () => {
  const { userInfo, myAddresses, offline } = useData();
  const dispatch = useDispatch();



  const [values, setValues] = useState({
    fullname: userInfo.lastname + " " + userInfo.firstname || "",
    phone: userInfo.phone || "",
    address: "",
    zipcode: "",
    state: "",
    country: "",
  });

  console.log(myAddresses);

  const saveAddress = () => {
    if(offline){
      typeof window !== "undefined" &&
        localStorage.setItem("offline-address", JSON.stringify(values));
    }else{
    newAddress(values, dispatch)}

  }

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };

  const Address = ({ address, selected, isdefault, id }) => {
    return (
      <Box className="flex items-start px-4 py-4 border relative m-3 rounded-xl cursor-pointer hover:bg-gray-50">
        <Box className="w-16 flex-shrink-0">
          <Image
            src="/images/misc/image 701.png"
            alt="adderess"
            width={80}
            height={80}
          />
        </Box>
        <Box className="flex-grow px-4">
          <Typography variant="body2">{address}</Typography>
          {isdefault && (
            <Typography variant="caption" className="mt-2 text-gray-300">
              Default shipping address
            </Typography>
          )}
        </Box>
        <Box
          className={`w-10 flex-shrink-0 `}
          onClick={() => selectAddress(id, dispatch)}
        >
          <Box
            className={`w-6 h-6 border rounded-full flex items-center justify-center ${
              selected ? "border-pink-500" : "border-gray-200"
            }`}
          >
            <Box
              className={`w-4 h-4 rounded-full ${selected && "bg-pink-500"}`}
            ></Box>
          </Box>
        </Box>
        <Box
          className="absolute bottom-2 right-2"
          onClick={() => deleteAddress(id, dispatch)}
        >
          <IconifyIcon icon="tabler:trash" className="text-sm text-red-500" />
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
          <Box className="p-4 mt-2">
            <Typography variant="body2" className="!font-bold !mb-3">
              Billing and Address
            </Typography>

            <Box>
              {myAddresses &&
                myAddresses?.data?.map((item, i) => (
                  <Address
                    key={i}
                    isdefault={item.selected}
                    address={item.address}
                    id={item._id}
                    selected={item.selected}
                  />
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box className="p-4 mt-2">
            <Typography variant="body2" className="!font-bold !mb-3">
              New Address
            </Typography>
            <Box className="!ml-2">
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                id="textarea-outlined"
                value={values.fullname}
                placeholder="Recipient Full Name"
                onChange={handleChange("fullname")}
                label="Recipient Full Name"
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                id="textarea-outlined"
                value={values.phone}
                placeholder="Recipient Phone Number"
                label="Recipient Phone Number"
                onChange={handleChange("phone")}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                id="textarea-outlined"
                placeholder="Street Address"
                value={values.address}
                label="Street Address"
                onChange={handleChange("address")}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                id="textarea-outlined"
                value={values.zipcode}
                placeholder="Zip Code"
                label="Zip Code"
                onChange={handleChange("zipcode")}
              />

              <Select
                // labelId="demo-simple-select-outlined-label"
                // id="demo-simple-select-outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={values.country}
                onChange={handleChange("country")}
                label="Select an option"
              >
                <MenuItem value="Nigeria">Nigeria</MenuItem>
                <MenuItem value="United State">United State</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>

              <Select
                // labelId="demo-simple-select-outlined-label"
                // id="demo-simple-select-outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={values.state}
                onChange={handleChange("state")}
                label="Select an option"
              >
                <MenuItem value="">
                  <em>State</em>
                </MenuItem>
                <MenuItem value="United State">United State</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
              <Button
                fullWidth
                variant="contained"
                className="h-10 !rounded-full"
                onClick={saveAddress}
              >
                Add Shipping Address
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingAddress;
