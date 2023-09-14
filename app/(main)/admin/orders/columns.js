import * as React from "react";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import {
    formatCurrency,
  formatDate,
  timeSince,
} from "@/app/utils/format";

export const orderColumns = [
  {
    flex: 0.4,
    headerName: "Order ID",
    field: "orderSlug",
    renderCell: (params) => console.log(params),
  },
  {
    flex: 0.4,
    headerName: "Customer Name",
    field: "name",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.userPhone}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "No of Products",
    field: "prodNum",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.id}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Status",
    field: "status",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.id}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Total",
    field: "totalPrice",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatCurrency(params.row.id, "USD", US)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Date",
    field: "orderDate",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {timeSince(params.row.orderDate)}
      </Typography>
    ),
  },
];

