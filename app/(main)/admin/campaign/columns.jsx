import * as React from "react";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { formatCurrency, formatDate, timeSince } from "@/app/utils/format";

export const discountColumns = [
  {
    flex: 0.4,
    headerName: "Discount Name",
    field: "name",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.name}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Discount Type",
    field: "type",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.type}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Discount Value",
    field: "value",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.value} %
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Start Date",
    field: "start_date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.start_date)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "End Date",
    field: "end_date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.end_date)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Usage Limit",
    field: "usage_limit",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.usage_limit}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Minimum Order",
    field: "minimum_order",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.minimum_order}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Maximum Order",
    field: "maximum_order",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.maximum_order}
      </Typography>
    ),
  },
];
export const CampaignColumns = [
  {
    flex: 0.4,
    headerName: "Campaign Name",
    field: "name",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.name}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Campaign Type",
    field: "type",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.type}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Campaign Value",
    field: "value",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.value} %
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Start Date",
    field: "start_date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.start_date)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "End Date",
    field: "end_date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.end_date)}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Usage Limit",
    field: "usage_limit",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.usage_limit}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Minimum Order",
    field: "minimum_order",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.minimum_order}
      </Typography>
    ),
  },
  {
    flex: 0.4,
    headerName: "Maximum Order",
    field: "maximum_order",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.maximum_order}
      </Typography>
    ),
  },
];
