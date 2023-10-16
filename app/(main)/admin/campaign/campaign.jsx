"use client";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { orderColumns } from "../orders/columns";
import StoreWrapper from "@/app/components/view/store";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { addNewCampaign } from "@/app/redux/state/slices/admin/campain";
import { CampaignColumns } from "./columns";
const {
  Box,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  Button,
} = require("@mui/material");

const CampaignPage = () => {

    const dispatch = useDispatch();
    const { data: CampaignData } = useSWR("/store/campaign");
    const FormWrapper = ({ children, title }) => (
      <div className="flex flex-col items-start mb-2 md:mb-4">
        <h5 className="text-[13px] mb-2">{title}</h5>
        {children}
      </div>
    );

    const [open, setOpen] = useState(false);
    const [selectedOptions, selectOption] = useState([]);
    const [values, setValues] = useState({
      name: "",
      type: "",
      value: "",
      start_date: "",
      end_date: "",
      usage_limit: "",
      minimum_order: "",
      maximum_order: "",
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const { data, isLoading } = useSWR("/products?limit=50");
    const options = data ? data.data : [];

    console.log(values, selectedOptions);

    const handleSelectChange = (event, newValue) => {
      console.log(newValue);
      const selectedIds = newValue.map((x) => x._id);
      selectOption(() => selectedIds);
    };


  return (
    <Box>
      <Box className="p-4">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            {/* <FormWrapper title="Campaign Name"> */}
            <h5 className="text-[13px] mb-2">Campaign Name</h5>
            <TextField
              fullWidth
              size="small"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter the name of the campaign promo"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormWrapper title="Campaign Type">
              <Select
                fullWidth
                size="small"
                value={values.type}
                onChange={handleChange("type")}
                placeholder="Enter the type of the campaign promo"
              >
                <MenuItem value="New">New app</MenuItem>
                <MenuItem value="New4">New 4app</MenuItem>
              </Select>
            </FormWrapper>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormWrapper title="Campaign Value">
              <TextField
                fullWidth
                size="small"
                value={values.value}
                onChange={handleChange("value")}
                placeholder="Enter the percentage campaign"
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
                value={values.start_date}
                size="small"
                onChange={handleChange("start_date")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon icon="tabler:calendar" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Select the start date of the campaign"
              />
            </FormWrapper>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormWrapper title="End Date">
              <TextField
                fullWidth
                type="date"
                size="small"
                value={values.end_date}
                onChange={handleChange("end_date")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon icon="tabler:calendar" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Select the start date of the campaign"
              />
            </FormWrapper>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormWrapper title="Usage Limit (Per Customer)">
              <Select
                fullWidth
                size="small"
                value={values.usage_limit}
                onChange={handleChange("usage_limit")}
                placeholder="Enter the usage limit in this promo"
              >
                <MenuItem value="1">1 Time</MenuItem>
                <MenuItem value="2">2 Times</MenuItem>
                <MenuItem value="3">3 Times</MenuItem>
                <MenuItem value="4">4 Times</MenuItem>
                <MenuItem value="5">5 Times</MenuItem>
              </Select>
            </FormWrapper>
          </Grid>
          {/* Minimum Order Amount */}
          <Grid item xs={12} md={3}>
            <FormWrapper title="Minimum Order Amount">
              <Select
                fullWidth
                size="small"
                value={values.minimum_order}
                onChange={handleChange("minimum_order")}
                placeholder="The maximum order in this campaign promo"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="5">5 Items</MenuItem>
                <MenuItem value="10">10 Items</MenuItem>
                <MenuItem value="15">15 Items</MenuItem>
                <MenuItem value="20">20 Items</MenuItem>
                <MenuItem value="25">25 Items</MenuItem>
                <MenuItem value="30">30 Items</MenuItem>
              </Select>
            </FormWrapper>
          </Grid>
          {/* Maximum Order Amount */}
          <Grid item xs={12} md={3}>
            <FormWrapper title="Maximum Order Amount">
              <Select
                fullWidth
                size="small"
                value={values.maximum_order}
                onChange={handleChange("maximum_order")}
                placeholder="The maximum order in this campaign promo"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="5">5 Items</MenuItem>
                <MenuItem value="10">10 Items</MenuItem>
                <MenuItem value="15">15 Items</MenuItem>
                <MenuItem value="20">20 Items</MenuItem>
                <MenuItem value="25">25 Items</MenuItem>
                <MenuItem value="30">30 Items</MenuItem>
              </Select>
            </FormWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="asynchronous-demo"
              multiple
              fullWidth
              onChange={handleSelectChange}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.prodName === value.prodName
              }
              getOptionLabel={(option) => option.prodName}
              options={options}
              loading={isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={() => Math.random(15)}
                  fullWidth
                  label="Search for products"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3.5}>
            <TextField
              fullWidth
              type="file"
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Button
              variant="contained"
              fullWidth
              className="!text-xs !rounded-xl !h-14"
              onClick={() =>
                addNewCampaign(
                  { ...values, products: selectedOptions },
                  dispatch
                )
              }
            >
              Save Campaign
            </Button>
          </Grid>
        </Grid>

        {/* history */}
        {/* history */}
        {/* history */}
      </Box>
      <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
        <Typography variant="body2" className="!font-bold py-6">
          Campaign History
        </Typography>
        {CampaignData?.data && (
          <OrderTable
            columns={CampaignColumns}
            onRowClick={() => {}}
            rows={CampaignData.data.map((x, i) => ({ ...x, id: i }))}
          />
        )}
      </Box>
    </Box>
  );
};

export default CampaignPage;
