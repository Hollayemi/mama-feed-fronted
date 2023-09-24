/* eslint-disable @next/next/no-img-element */
"use client";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Category } from "../../comonents/dashboard";
import Image from "next/image";
import { productData } from "@/app/data/store/productData";
import { formatCurrency } from "@/app/utils/format";
import useSWR from "swr";

const InventoryPage = ({ params }) => {
  const { data, loading, error } = useSWR(
    `/products?stock=70`
  );
  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  });
  console.log(params);
  return (
    <HomeWrapper>
      <Box className="p-2 py-5 md:p-4 bg-white !rounded-sm md:!rounded-xl !mx-1.5 md:!mx-10">
        <Box className="flex flex-col md:flex-row md:items-center justify-between ">
          <Typography
            variant="body2"
            className="!font-bold !text-sm !mb-4 md:mb-0 "
          >
            Products Out of Stock
          </Typography>
          {/*  */}
          {/*  */}
          <Box className="flex items-center">
            <Box className="sm:!rounded-sm md:!rounded-full !overflow-hidden bg-gray-100 border border-gray-400">
              <CustomTextField
                fullWidth
                id="icons-start-adornment"
                className="sm:!rounded-sm md:!rounded-full !border-none !outline-none !w-80 !h-10"
                size="small"
                sx={{ borderRadius: 50 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconifyIcon icon="tabler:search" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            <Button
              variant="outlined"
              className="!ml-5 !h-10 !rounded-sm md:!rounded-full !shadow-none !border-gray-400 !text-gray-400 !text-xs"
              startIcon={<IconifyIcon icon="tabler:file-export" />}
            >
              <h6 className="hidden md:block">Export</h6>
            </Button>
          </Box>
        </Box>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        <Box className=" md:px-10">
          
          <Box className="mt-10">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    className="!font-bold"
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 0.5,
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>Image</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.map((row) => {
                    console.log(row);
                    return (
                      <TableRow
                        key={row.prodName}
                        sx={{
                          "&:last-child .MuiTableCell-root": {
                            pb: (theme) => `${theme.spacing(1)} !important`,
                            border: 0,
                          },
                          "& .MuiTableCell-root": {
                            border: 0,
                            py: (theme) => `${theme.spacing(1)} !important`,
                          },
                          "&:first-of-type .MuiTableCell-root": {
                            pt: (theme) => `${theme.spacing(1)} !important`,
                            border: 0,
                          },
                        }}
                      >
                        <TableCell>
                          <Box className="flex items-center">
                            <img
                              width={50}
                              height={50}
                              alt={row.image}
                              className="mr-3 w-12 h-12"
                              src={row.images[0].image}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box className=" max-w-32 !mr-5">
                            <Typography
                              noWrap
                              className="!text-[12px]"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {row.prodName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {row.category}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px] !w-16"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {row.totInStock.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {formatCurrency(row.prodPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            <IconifyIcon icon="tabler:edit" />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default InventoryPage;
