import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Returns = () => {
  const EachOrder = ({ prodName, reason, image }) => {
    return (
      <Box className="flex items-start !mb-3">
        <Image
          src={image}
          alt="order-image"
          width={150}
          height={150}
          className="!w-20 !h-20 !rounded-md"
        />
        <Box className="!pl-3">
          <Typography variant="body1" className="!font-bold !text-[16px]">
            {prodName}
          </Typography>
          <Box className="flex items-center">
            <Typography
              variant="caption"
              className="!font-semibold !text-gray-400"
            >
              Reason:
            </Typography>
            <Typography variant="caption" className="!font-semi !ml-3">
              {reason}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Box className="w-full bg-white rounded-md px-4 py-5">
      <Typography variant="body1" className="!font-bold">
        Returned Items (2)
      </Typography>

      <Box className="mt-8">
        <EachOrder
          image="/images/more/12.png"
          prodName="Summer boys clothes children Sets Casual striped short-s"
          reason="Size Doesn't Fit"
        />
        <EachOrder
          image="/images/more/11.png"
          prodName="Summer boys clothes children Sets Casual striped short-s"
          reason="Size Doesn't Fit"
        />
        <EachOrder
          image="/images/more/14.png"
          prodName="Childs Sleeveless clothing suits summer handsome baby bo...."
          reason="Incorrect Item Received"
        />
      </Box>
    </Box>
  );
};
export default Returns;
