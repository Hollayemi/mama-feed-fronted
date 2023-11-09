/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";

const { Box } = require("@mui/material");
const { default: ReactSlickSlider } = require("../wrapper/react-slick");
const { default: Image } = require("next/image");

export const FlashSales = () => {
  const { data, isLoading } = useSWR("/store/campaign/flash-sale");
  const images = data ? data?.data[0].image : [];
  console.log(images);
  return (
    <ReactSlickSlider options={{ dots: true, arrows: false }}>
      {images.map((image, i) => (
        <Box className="mx-1 md:mx-3 !rounded-xl" key={i}>
          <img
            src={image}
            alt="new app"
            width={400}
            height={400}
            className="!w-52 h-32 md:!w-[400px] md:h-44 !rounded-xl"
          />
        </Box>
      ))}
      {/* <Box className="mx-1 md:mx-3 !rounded-xl">
        <Image
          src="/images/banner/5.jpg"
          alt="new app"
          width={400}
          height={400}
          className="!w-52 h-32 md:!w-[400px] md:h-44 !rounded-xl"
        />
      </Box>
      <Box className="mx-1 md:mx-3 !rounded-xl">
        <Image
          src="/images/banner/flyer2.png"
          alt="new app"
          width={400}
          height={400}
          className="!w-52 h-32 md:!w-[400px] md:h-44 !rounded-xl"
        />
      </Box> */}
    </ReactSlickSlider>
  );
};
