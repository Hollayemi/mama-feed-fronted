import Chip from "@/app/components/chip";
import { formatCurrency } from "@/app/utils/format";
import { Typography } from "@mui/material";

export const customerColumns = (abandoneCart) => [
  {
    flex: 1,
    headerName: "Customer",
    field: "customer",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {`${params.row.lastname} ${params.row.firstname}`}
      </Typography>
    ),
  },
  {
    flex: 0.9,
    headerName: "Customer Email",
    field: "email",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    headerName: "Phone Number",
    field: "phone",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.phone}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    headerName: "Total Orders",
    field: "no_of_orders",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.no_of_orders}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    headerName: "Total Spent",
    field: "totalAmount",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
          {formatCurrency(params.row.totalAmountSpent)}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    headerName: "Account Status",
    field: "status",
    renderCell: (params) => {
        const userStatus = abandoneCart.includes(params.row.id)
          ? "abandoned cart"
          : params.row.status;

      const status = statusObj.filter((e) => e.title === userStatus)[0];

      return (
        <Chip
          rounded
          size="small"
          skin="light"
          color={status?.color}
          label={status?.title}
          sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
        />
      );
    },
  },
];

export const statusObj = [
  { title: "active", color: "success" },
  { title: "in-active", color: "error" },
  { title: "abandoned cart", color: "warning" },
  { title: "waiting", color: "warning" },
  { title: "pending", color: "info" },
];
