import Image from "next/image";
import { Box, Grid } from "@mui/material";

export const metadata = {
  title: "auth-corislo",
  description: "Showcase your store now",
};

export default function AuthLayout({ children, reverse, image, ...others }) {
  return (
    <Grid container spacing={0} direction={`${reverse ? "row-reverse" : "row"}`}>
      <Grid
        item
        xs={1}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        sm={6}
      >
        <Box className="w-full h-screen bg-slate-500 !overflow-hidden">
          <Image
            src={image || "/images/more/auth-baby.png"}
            alt="auth-mage"
            width={1500}
            height={1500}
            className="!w-full !h-full"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className="w-full h-full bg-white">
          <Box className="flex justify-center items-center h-full min-h-screen overflow-hidden">
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
