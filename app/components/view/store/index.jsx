import { Box } from "@mui/material";
import StoreTopBar from "./AppBar";

const StoreWrapper = ({ children }) => {
  return (
    <Box className="flex justify-center bg-black">
      <Box
        className="w-full max-w-[1500px] h-auto min-h-screen"
        bgcolor="custom.bodyGray"
      >
        <StoreTopBar />
        <Box className="mt-20">{children}</Box>
      </Box>
    </Box>
  );
};

export default StoreWrapper;
