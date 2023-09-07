import HomeWrapper from "@/app/components/view/home";
import { Box, Grid, Typography } from "@mui/material";
import { LeftMessageFormat } from "./components";
import IconifyIcon from "@/app/components/icon";

const Inbox = () => {
  return (
    <HomeWrapper>
      <Box className="!py-6 !px-16">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3.5}>
            <Box className="bg-white !rounded-xl p-2">
              <Box className="flex justify-between items-center border-b-2 !pb-1">
                <Typography
                  variant="body1"
                  className="!text-[16px] !font-bold !text-black"
                >
                  Inbox Messages
                </Typography>
                <Typography variant="caption" className="!text-pink-500">
                  Mark all as read
                </Typography>
              </Box>
              <LeftMessageFormat
                title="Order Confirmation"
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
              <LeftMessageFormat
                title="Order Confirmation"
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
              <LeftMessageFormat
                title="Order Confirmation"
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
              <LeftMessageFormat
                title="Order Confirmation"
                isRead
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
              <LeftMessageFormat
                title="Order Confirmation"
                isRead
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
              <LeftMessageFormat
                title="Order Confirmation"
                brief="Thank you for shopping with MamaFeeds! Your...."
                time="20 mins"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <Box className="w-full h-full bg-white !rounded-md p-4 py-4">
              <Box className="flex justify-between items-center !pb-1">
                <Typography
                  variant="body1"
                  className="!text-[16px] !font-bold !text-black"
                >
                  Order Out for Delivery
                </Typography>
                <Box className="flex items-center !pb-1 !font-bold">
                  <IconifyIcon
                    icon="tabler:trash"
                    className="text-sm text-red-500 mr-2 -mt-1"
                  />

                  <Typography variant="caption" className="!text-red-500">
                    Delete
                  </Typography>
                </Box>
              </Box>

              <Box className="h-full w-full flex items-center justify-center">
                <Box className="flex items-center justify-center h-16 w-16 !rounded-full bg-gray-100 !text-9xl">
                  <IconifyIcon
                    icon="tabler:inbox"
                    className="text-4xl text-gray-200"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default Inbox;
