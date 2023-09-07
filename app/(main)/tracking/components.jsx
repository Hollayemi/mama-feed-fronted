import IconifyIcon from "@/app/components/icon";
import { formatCurrency, formatDate } from "@/app/utils/format";

const { Box, Typography } = require("@mui/material");

export const OrderStages = ({
  date,
  price,
  at,
}) => {
  const Stage = ({ at = 0 }) => {
    const pickIcon = {
      0: { icon: "tabler:currency-dollar", name: "Paid" },
      1: { icon: "tabler:box", name: "Packaged" },
      2: { icon: "tabler:truck-delivery", name: "Shipped" },
      3: { icon: "tabler:box-seam", name: "Received" },
      4: { icon: "tabler:star-filled", name: "Review" },
    };
    const state = {
      1: "!text-white  !bg-black",
      2: "!text-white  !bg-pink-500",
      3: " !text-black !bg-gray-100",
    };

    return (
      <Box className="flex items-center">
        {Array(5)
          .fill()
          .map((_, index) => (
            <Box key={index} className="flex items-center w-full">
              <Box className="relative">
                <Box
                  className={`!w-8 !h-8 flex items-center justify-center !rounded-full ${
                    at === index ? state[2] : at > index ? state[1] : state[3]
                  }`}
                >
                  <IconifyIcon icon={pickIcon[index].icon} />
                </Box>
                <Typography variant="body2" className="!text-[13px] absolute text-center !mt-3">
                  {pickIcon[index].name}
                </Typography>
              </Box>
              {index !== 4 && (
                <Box
                  className={`!w-8 min-w-fit !h-1 flex-grow ${
                    at === index ? state[2] : at > index ? state[1] : state[3]
                  }`}
                ></Box>
              )}
            </Box>
          ))}
      </Box>
    );
  };
  return (
    <Box>
      <Box className="flex items-center mt-4">
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Order
          </Typography><br />
          <Typography
            variant="caption"
            className="!font-normal !text-[13px] !mt-3"
          >
            Paid
          </Typography>
        </Box>
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Amount
          </Typography><br />
          <Typography
            variant="caption"
            className="!font-normal !text-[14px] !mt-3"
          >
            USD {formatCurrency(price, "USD", "US")}
          </Typography>
        </Box>
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Order
          </Typography><br />
          <Typography
            variant="caption"
            className="!font-normal !text-[13px] !mt-3"
          >
            {formatDate(date)}
          </Typography>
        </Box>
      </Box>
      <br />
      <Stage at={at} />
    </Box>
  );
};