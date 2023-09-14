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
const ShippingAddress = () => {
  const Address = ({ address, selected, isdefault }) => {
    return (
      <Box className="flex items-start px-4 py-4 border m-3 rounded-xl cursor-pointer hover:bg-gray-50">
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
        <Box className={`w-10 flex-shrink-0 `}>
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
      </Box>
    );
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <Box className="p-4 mt-2">
            <Typography variant="body2" className="!font-bold !mb-3">
              Billing and Address
            </Typography>

            <Box>
              <Address
                isdefault
                address="123 Main Street, Apartment 4BNew York, NY 10001, USA"
                selected
              />
              <Address address="123 Main Street, Apartment 4BNew York, NY 10001, USA" />
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={6}>
          <Box className="p-4 mt-2">
            <Typography variant="body2" className="!font-bold !mb-3">
              New Address
            </Typography>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Recipient Full Name"
              label="Recipient Full Name"
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Recipient Phone Number"
              label="Recipient Phone Number"
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Street Address"
              label="Street Address"
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Zip Code"
              label="Zip Code"
            />

            <Select
              // labelId="demo-simple-select-outlined-label"
              // id="demo-simple-select-outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={10}
              onChange={() => {}}
              label="Select an option"
            >
              <MenuItem value="">
                <em>Nigeria</em>
              </MenuItem>
              <MenuItem value={10}>United State</MenuItem>
              <MenuItem value={20}>United Kingdom</MenuItem>
              <MenuItem value={30}>Canada</MenuItem>
            </Select>

            <Select
              // labelId="demo-simple-select-outlined-label"
              // id="demo-simple-select-outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={10}
              onChange={() => {}}
              label="Select an option"
            >
              <MenuItem value="">
                <em>State</em>
              </MenuItem>
              <MenuItem value={10}>United State</MenuItem>
              <MenuItem value={20}>United Kingdom</MenuItem>
              <MenuItem value={30}>Canada</MenuItem>
            </Select>

            <TextField
              type="number"
              sx={{ mb: 2 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Zip Code"
              label="Zip Code"
            />
            <Button
              fullWidth
              variant="contained"
              className="h-10 !rounded-full"
            >
              Add Shipping Address
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingAddress;
