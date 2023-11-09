// ** MUI Imports
import useSWR from "swr";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import tokens from "@/app/configs/tokens";

// ** Icon Imports
import Icon from '@/app/components/icon'

// ** Custom Components Imports
import CustomAvatar from '@/app/components/avatar'

const data = [
  {
    stats: "12,400",
    title: "Overall Products",
    more: "Total Products that has everbeen available in all stores",
    color: "primary",
    icon: "tabler:users-group",
  },
  {
    color: "info",
    stats: "5,300",
    title: "Available Products",
    more: "Total Products that are available for purchase in all stores",
    icon: "tabler:users",
  },
  {
    color: "error",
    stats: "7,943",
    title: "Sold Products",
    more: "Total Products that has ever been sold in all stores",
    icon: "tabler:shopping-cart",
  },
];

const renderStats = (data) => {
  console.log(data);
  return data.map((sale, index) => (
    <Grid item xs={6} sm={4} md={4} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "start" }}>
        <CustomAvatar
          skin="light"
          color={sale.color}
          sx={{ mr: 2, mt: 2, width: 46, height: 46 }}
        >
          <Icon icon={sale.icon} />
        </CustomAvatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            color="text.primary"
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            {sale.stats}
          </Typography>
          <Typography
            color="text.primary"
            variant="body2"
            className="!font-bold"
          >
            {sale.title}
          </Typography>
          {sale.percent && <Typography
            color="text.primary"
            variant="caption"
            className="!text-[10px] !mt-1 !text-gray-500"
          >
            {sale.percent}%
          </Typography>}
        </Box>
      </Box>
    </Grid>
  ));
}

const OverViewCard = ({ data }) => {
  const template = [
    {
      stats: data.allAccounts.length,
      title: "All Customers",
      // percent: "100%",
      color: "primary",
      icon: "tabler:users-group",
    },
    {
      color: "info",
      stats: data.active,
      title: "Active Customers",
      percent: data.activePercent,
      icon: "tabler:users",
    },
    {
      color: "error",
      stats: data.abandoned.length,
      title: "Abandoned Cart",
      percent: data.abandonedPercent,
      icon: "tabler:shopping-cart",
    },
  ];
  return (
    <Box
      sx={{ pt: (theme) => `${theme.spacing(0.5)} !important` }}
      className="bg-white !p-5 !rounded-xl"
    >
      <Grid container spacing={1}>
        {renderStats(template)}
      </Grid>
    </Box>
  );
}

export default OverViewCard
