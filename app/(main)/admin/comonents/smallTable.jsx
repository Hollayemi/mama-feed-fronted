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
import ReactApexcharts from '@/app/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from '@/app/utils/hex-to-rgba'
import { productData } from "@/app/data/store/productData";



export const BestSellingProducts = () => {
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
            {productData.map((row) => {
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
                      <Image
                        width={50}
                        height={50}
                        alt={row.image}
                        className="mr-3 w-12 h-12"
                        src={`/images/more/${row.image}.png`}
                      />
                      <Box className="w-36 max-w-40 !mr-5">
                        <Typography
                          noWrap
                          className="!text-[12px]"
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          {row.prodName}
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
                      {row.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      className="!text-[12px] !w-16"
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      {row.unit_sold.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      noWrap
                      className="!text-[12px]"
                      sx={{ fontWeight: 500, color: "text.secondary" }}
                    >
                      {formatCurrency(row.price)}
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



const series = [
  { data: [0, 19, 7, 27, 15, 40], name: "Last year" },
  { data: [0, 17, 7, 27, 1, 40], name: "This year" },
  { data: [0, 19, 7, 27, 15, 10], name: "2 years ago" },
];

export const CardStatisticsProfit = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    stroke: { width: 2 },
    tooltip: { enabled: false },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 3.5,
      strokeWidth: 3,
      strokeColors: 'transparent',
      colors: [theme.palette.info.main],
      discrete: [
        {
          size: 5,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1
        }
      ]
    },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -13,
        left: -4,
        right: 8,
        bottom: 2
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

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
                Last Year
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
      <CardContent className="md:h-20">
        <ReactApexcharts
          type="line"
          className="h-full"
        //   height={167}
          series={series}
          options={options}
        />
        <Box
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
        </Box>
      </CardContent>
    </Card>
  );
}
