const { Box } = require("@mui/material");
const { default: ReactSlickSlider } = require("../wrapper/react-slick");
const { default: Image } = require("next/image");

export const FlashSales = () => {
  return (
    <ReactSlickSlider>
      <Box className="mx-1 md:mx-3 !rounded-xl"><Image src="/images/banner/1.jpg" alt="new app" width={400} height={400} className="!w-52 md:!w-[400px] md:h-44 !rounded-xl" /></Box>
      <Box className="mx-1 md:mx-3 !rounded-xl"><Image src="/images/banner/2.jpg" alt="new app" width={400} height={400} className="!w-52 md:!w-[400px] md:h-44 !rounded-xl" /></Box>
      <Box className="mx-1 md:mx-3 !rounded-xl"><Image src="/images/banner/3.jpg" alt="new app" width={400} height={400} className="!w-52 md:!w-[400px] md:h-44 !rounded-xl" /></Box>
    </ReactSlickSlider>
  );
};
