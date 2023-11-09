/* eslint-disable @next/next/no-img-element */
"use client";
import StoreWrapper from "@/app/components/view/store";
import DiscountPage from "./discount";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { addNewCampaign, updateCampaign } from "@/app/redux/state/slices/admin/campain";
import { CampaignColumns } from "./columns";
import IconifyIcon from "@/app/components/icon";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import Image from "next/image";
import { useData } from "@/app/hooks/useData";
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

const CampaignGenPage = () => {
  const dispatch = useDispatch();
  const { campaign } = useData();

  const { data, isLoading } = useSWR("/products?limit=50");
  const options = data ? data.data : [];

  const FormWrapper = ({ children, title }) => (
    <div className="flex flex-col items-start mb-2 md:mb-4">
      <h5 className="text-[13px] mb-2">{title}</h5>
      {children}
    </div>
  );

  const [open, setOpen] = useState(false);
  const [newOptions, setNewOptions] = useState([]);
  const [selectedOptions, selectOption] = useState([]);
  const [values, setValues] = useState({
    name: "",
    type: "discount",
    value: "",
    start_date: "",
    image: [],
    end_date: "",
    usage_limit: "",
    minimum_order: "",
    maximum_order: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const reshapeDate = (date) => {
    return date.split("T")[0];
  };


  const onRowClick = (row) => {
    const getSelected = options.map((x) => row?.products?.includes(x._id) && x);
    
    setNewOptions(() => getSelected?.filter((x) => x !== false) || []);
    setValues({
      ...values,
      ...row,
      start_date: reshapeDate(row.start_date),
      end_date: reshapeDate(row.start_date),
      image: []
    });

    // select selectedIds
    selectOption(() => row?.products);

  };

  const handleSelectChange = (event, newValue) => {
    const selectedIds = newValue.map((x) => x._id);
    selectOption(() => selectedIds);
    setNewOptions(() => newValue);
  };

  const selectFile = (event) => {
    const files = Array.from(event.target.files); // Select the first file if multiple files are allowed
    if (files) {
      files.map((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64File = event.target.result;
          setValues((existingFiles) => {
            return {
              ...existingFiles,
              image: [...existingFiles.image, base64File],
            };
          });
        };
        reader.readAsDataURL(file);
      });      
    }
  };

  return (
    <StoreWrapper>
      <Box className="!mx-2 sm:!mx-8 md:!mx-16 !my-10">
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
                    <MenuItem value="">Campaign Type</MenuItem>
                    <MenuItem value="discount">Discount</MenuItem>
                    <MenuItem value="flash sale">Flash Sale</MenuItem>
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
                    defaultValue={values.start_date}
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
                      shrink: true,
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
              <Grid item xs={12} md={values.type === "flash sale" ? 6 : 8}>
                <Autocomplete
                  id="asynchronous-demo"
                  multiple
                  fullWidth
                  onChange={handleSelectChange}
                  open={open}
                  value={newOptions}
                  options={options}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.prodName === value.prodName
                  }
                  getOptionLabel={(option) => (
                    <Box className="flex items-center">
                      <img
                        src={option.images[0].image}
                        alt="imgd"
                        width={50}
                        height={50}
                        className="w-9 h-9 rounded-full mr-2"
                      />
                      <Typography>{option.prodName}</Typography>
                    </Box>
                  )}
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
              {values.type === "flash sale" && (
                <Grid item xs={12} md={3.5}>
                  <TextField
                    fullWidth
                    type="file"
                    inputProps={{
                      multiple: true,
                    }}
                    onChange={selectFile}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={values.type === "flash sale" ? 2.5 : 4}>
                {values._id ? (
                  <Button
                    variant="contained"
                    fullWidth
                    className="!text-xs !rounded-xl !h-14"
                    onClick={() =>
                      updateCampaign(
                        { ...values, products: selectedOptions },
                        dispatch
                      )
                    }
                  >
                    Update {values.type}
                  </Button>
                ) : (
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
                    Save {values.type}
                  </Button>
                )}
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
            {campaign && (
              <OrderTable
                columns={CampaignColumns}
                onRowClick={onRowClick}
                rows={campaign.map((x, i) => ({ ...x, id: i }))}
              />
            )}
          </Box>
        </Box>
      </Box>
    </StoreWrapper>
  );
};

export default CampaignGenPage;
