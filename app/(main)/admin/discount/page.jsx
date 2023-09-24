"use client";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { orderColumns } from "../orders/columns";

const {
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
} = require("@mui/material");

const DiscountPage = () => {
  const FormWrapper = ({ children, title }) => (
    <div className="flex flex-col items-start mb-2 md:mb-4">
      <h5 className="text-[13px] mb-2">{title}</h5>
      {children}
    </div>
  );

  return (
    <HomeWrapper>
      <Box className="p-2 md:p-4 !mx-2 sm:!mx-8 md:!mx-16 !my-10 bg-white rounded-md">
        <Typography variant="body1" className="!font-bold">
          Discount
        </Typography>
        <Box className="p-4">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormWrapper title="Discount Name">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter the name of the discount promo"
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormWrapper title="DIscount Type">
                <Select
                  fullWidth
                  size="small"
                  placeholder="Enter the name of the discount promo"
                >
                  <MenuItem value="New">New app</MenuItem>
                  <MenuItem value="New4">New 4app</MenuItem>
                </Select>
              </FormWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormWrapper title="Discount Value">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter the percentage discount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormWrapper title="Start Date">
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon icon="tabler:calendar" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Select the start date of the discount"
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormWrapper title="End Date">
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon icon="tabler:calendar" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Select the start date of the discount"
                />
              </FormWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormWrapper title="Usage Limit (Per Customer)">
                <Select
                  fullWidth
                  size="small"
                  placeholder="Enter the name of the discount promo"
                >
                  <MenuItem value="New">New app</MenuItem>
                  <MenuItem value="New4">New 4app</MenuItem>
                </Select>
              </FormWrapper>
            </Grid>
            {/* Minimum Order Amount */}
            <Grid item xs={12} md={3}>
              <FormWrapper title="Minimum Order Amount">
                <Select
                  fullWidth
                  size="small"
                  placeholder="Enter the name of the discount promo"
                >
                  <MenuItem value="New">New app</MenuItem>
                  <MenuItem value="New4">New 4app</MenuItem>
                </Select>
              </FormWrapper>
            </Grid>
            {/* Maximum Order Amount */}
            <Grid item xs={12} md={3}>
              <FormWrapper title="Maximum Order Amount">
                <Select
                  fullWidth
                  size="small"
                  placeholder="Enter the name of the discount promo"
                >
                  <MenuItem value="New">New app</MenuItem>
                  <MenuItem value="New4">New 4app</MenuItem>
                </Select>
              </FormWrapper>
            </Grid>
          </Grid>

          {/* history */}
          {/* history */}
          {/* history */}
        </Box>
        <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
          <Typography variant="body2" className="!font-bold py-6">
            Order History
          </Typography>
          <OrderTable columns={orderColumns} onRowClick={() => {}} rows={[]} />
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default DiscountPage;
