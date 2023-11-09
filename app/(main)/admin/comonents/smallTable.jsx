"use client";
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  CardHeader,
  TableContainer,
  CardContent,
  useTheme,
} from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import OptionsMenu from "@/app/components/option-menu";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/format";

// ** Custom Components Import
import ReactApexcharts from "@/app/components/react-apexcharts";

// ** Util Import
import { hexToRGBA } from "@/app/utils/hex-to-rgba";
import { productData } from "@/app/data/store/productData";
import { useState } from "react";

import useSWR from "swr";

export const BestSellingProducts = ({ analytics }) => {
  return (
    <Card className="!rounded-xl">
      <CardHeader
        title={
          <Typography className="!text-xs !font-bold !text-black">
            Best Selling Product
          </Typography>
        }
        action={
          <OptionsMenu
            icon={
              <Typography className="!text-xs !font-bold !text-black">
                Last 7 days
              </Typography>
            }
            options={["Show all entries", "Refresh", "Download"]}
            iconButtonProps={{
              size: "small",
              sx: { color: "text.disabled", cursor: "pointer" },
              disableRipple: true,
            }}
          />
        }
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  py: 0.5,
                },
              }}
            >
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Unit Sold</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analytics &&
              analytics?.bestSellingProducts?.map((row) => {
                console.log(row)
                return (
                  <TableRow
                    key={row.product.productId}
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
                        <Image
                          width={50}
                          height={50}
                          alt={row.product.prodName}
                          className="mr-3 w-12 h-12"
                          src={row.product.images[0].image}
                        />
                        <Box className="w-36 max-w-40 !mr-5">
                          <Typography
                            noWrap
                            className="!text-[12px]"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {row.product.prodName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        noWrap
                        className="!text-[12px]"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        {row && row?.product?.category[0]?.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        noWrap
                        className="!text-[12px] !w-16"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        {row.quantity.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        noWrap
                        className="!text-[12px]"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        {formatCurrency(row.product.prodPrice)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

let series = [
  {
    name: "Daily Sale",
    data: Array(31).fill(0),
  },
  {
    name: "Monthly Sale",
    data: Array(12).fill(0),
  },
  {
    name: "Yearly Sale",
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
  },
];

export const CardStatisticsProfit = () => {
  // ** Hook
  const [option, setOption] = useState("monthly");
  const { data: chart, isLoading } = useSWR(`/store/chart?interval=${option}`);
  
  let day = Array.from({ length: 31 }, (_, index) => index + 1);

  if(chart){
    chart.data.map((each, i) => series[0].data[each.day] = each.sale)
    chart.data.map((each, i) => series[1].data[each.month] = each.sale)
    // chart.data.map((each, i) => series[2].data[each.year] = each.year)
  }

  // const daySeries = series[0].data.map((day, i) => {
  //   console.log(day, "array day");
  //   const series = chart ? chart.data.map((each, i) => each.day === day ? each.sale : 0) : []

  //   return series
  // });


  let cate = 31;
  if(option === "monthly"){
    cate = 12
  }

  const theme = useTheme();
  var options = {
    chart: {
      height: 450,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 4, 6],
      curve: "straight",
      dashArray: [2, 2, 2],
    },
    title: {
      text: "Page Statistics",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: Array.from({ length: cate }, (_, index) => index + 1),
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <Card className="h-full !rounded-xl">
      <CardHeader
        title={
          <Typography className="!text-xs !font-bold !text-black">
            Sales Chart
          </Typography>
        }
        action={
          <OptionsMenu
            icon={
              <Typography className="!text-xs !font-bold !text-black">
                {option}
              </Typography>
            }
            options={["yearly", "monthly", "daily"]}
            setOption={setOption}
            iconButtonProps={{
              size: "small",
              sx: { color: "text.disabled", cursor: "pointer" },
              disableRipple: true,
            }}
          />
        }
      />
      <CardContent className="md:h-20">
        <ReactApexcharts
          type="line"
          className="h-full"
          //   height={167}
          series={series}
          options={options}
        />
        {/* <Box
          sx={{
            gap: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">684k</Typography>
          <Typography variant="body2" sx={{ color: "success.main" }}>
            +8.35%
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};
