import { Box } from "@mui/material"
import StoreTopBar from "./AppBar"

const StoreWrapper = ({ children }) => {
  return (
    <Box>
      <StoreTopBar />
      <Box className="mt-20">{children}</Box>
    </Box>
  );
}

export default StoreWrapper