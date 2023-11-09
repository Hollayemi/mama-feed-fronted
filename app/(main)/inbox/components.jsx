import { Box, Typography } from "@mui/material";


export const LeftMessageFormat = ({ title, time, brief, isRead }) => {
  return (
    <Box className="pt-3 p-2 border-b-2 border-gray-50 cursor-pointer !pr-5 border-l-4 border-l-transparent hover:border-l-pink-500 my-1 ">
      <Box className="flex justify-between items-center">
        <Typography variant="body2" className={`!text-[15px] ${!isRead ? '!text-black !font-bold' : '!text-gray-400'}`}>{title}</Typography>
        <Typography variant="caption">{time}</Typography>
      </Box>
      <Typography variant="body2" className={`!text-[13px] ${!isRead ? '!text-black' : '!text-gray-400'}`}>{brief}</Typography>
    </Box>
  );
};
