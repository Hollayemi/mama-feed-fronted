import * as React from "react";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { formatCurrency, timeSince } from "@/app/utils/format";

export const orderColumns = [
  {
    flex: 0.4,
    headerName: "Order ID",
    field: "orderSlug",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.orderSlug}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Customer Email",
    field: "name",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.userEmail}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "No of Products",
    field: "items",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.order_items.items}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Status",
    field: "status",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.status}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Total",
    field: "totalAmount",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatCurrency(params.row.order_items.totalAmount)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Date",
    field: "orderDate",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {timeSince(new Date(params.row.createdAt))}
      </Typography>
    ),
  },
];
