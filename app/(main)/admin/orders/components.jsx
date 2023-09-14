import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const LeftTab = ({ title, setShowing, showing, isRead }) => {
  return (
    <Box
      onClick={() => setShowing(title)}
      className={`flex border-l-4 h-8 my-2 items-center border-transparent ${
        showing === title ? "border-pink-500 text-pink-500" : "!text-black"
      }  hover:border-pink-500 hover:!text-pink-500 !pl-4`}
    >
      <Typography variant="body1" className="!text-[16px] !font-normal">
        {title}
      </Typography>
    </Box>
  );
};

export const PictureSide = () => {
  return (
    <Box>
      <Box className="flex items-center">
        <Box>
          <Image
            src="/images/avatar/2.png"
            alt="profile"
            width={60}
            height={60}
            className="!rounded-full"
          />
        </Box>
        <Box className="ml-4">
          <Typography variant="body1" className="!text-[14px] !font-bold">
            Edit your photo
          </Typography>
          <Box className="!flex !items-center mt-2">
            <Typography
              variant="body1"
              className="!text-[14px] !text-red-600 !font-normal"
            >
              Delete
            </Typography>
            <Typography
              variant="body1"
              className="!text-[14px] !text-blue-600 !ml-8 !font-normal"
            >
              Update
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
