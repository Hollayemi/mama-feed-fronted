import IconifyIcon from "@/app/components/icon";
import { formatCurrency } from "@/app/utils/format";

const { Box, Typography } = require("@mui/material");

export const OrderBriefLeftContentSample = ({
  orderId,
  price,
  unit,
  at,
  type,
  onClick,
  selected,
}) => {
  const Stage = ({ at = 0 }) => {
    return (
      <Box className="flex items-center">
        {Array(5)
          .fill()
          .map((_, index) => (
            <Box key={index} className="flex items-center">
              <Box
                className={`!w-3 !h-3 !rounded-full bg-${
                  index <= at - 1 ? "pink" : "slate"
                }-500`}
              ></Box>
              {index !== 4 && (
                <Box
                  className={`!w-5 !h-1 !-ml-1 bg-${
                    index <= at - 1 ? "pink" : "slate"
                  }-500`}
                ></Box>
              )}
            </Box>
          ))}
      </Box>
    );
  };
  return (
    <Box
      onClick={onClick}
      className="flex items-end justify-between border-b orderParent relative border-gray-200 cursor-pointer px-3 pb-3 mb-3"
    >
      <Box
        className={`w-1 h-full absolute top-0 indicator -mt-1 -left-4 transition-all ${
          selected ? "bg-pink-500" : "bg-transparent"
        }`}
      ></Box>
      <Box>
        <Typography variant="body2" className="!font-bold !text-[16px] !mt-3">
          {orderId}
        </Typography>
        <Typography variant="body2" className="!font-bold !text-[14px] !mt-3">
          USD {formatCurrency(price, "USD", "US")}
        </Typography>
        <Typography variant="caption" className="!text-xs !mt-3">
          {unit} Items
        </Typography>
      </Box>
      {type !== "reviews" ? (
        <Box>
          <Box className="flex items-center ml-2">
            <IconifyIcon
              icon="tabler:truck-delivery"
              className="text-pink-500"
            />
            <Typography
              variant="caption"
              className="!text-[13px] !ml-2 text-pink-500 "
            >
              5 In Progress
            </Typography>
          </Box>
          <Stage at={at} />
        </Box>
      ) : (
        <Typography variant="body2" className="!font-bold !text-[14px] !mt-3">
          Completed
        </Typography>
      )}
    </Box>
  );
};

export const OrderLeftSide = ({ type, data, setDisplay, display }) => {
  console.log(display.orderSlug);
  let realData;
  if (data) {
    if (typeof window !== "undefined" && window.screen.width < 959) {
      if (display.orderSlug) {
        realData = data.data.filter((x) => x.orderSlug === display.orderSlug);
      } else {
        realData = data?.data;
      }
    }else{
      realData = data?.data;
    }
  }
  return (
    <Box className="">
      {realData &&
        realData.map((item, i) => (
          <OrderBriefLeftContentSample
            orderId={item.orderSlug}
            selected={display?.orderSlug === item.orderSlug}
            key={i}
            at={3}
            unit={item.order_items.items}
            price={item.order_items.totalAmount}
            type={type}
            onClick={() => setDisplay(item)}
          />
        ))}
    </Box>
  );
};
