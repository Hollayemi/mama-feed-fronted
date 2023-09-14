import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PictureSide } from "../components";

const UserMangement = () => {
  return (
    <Box>
      <Box className="flex justify-between">
        <Typography
          variant="body1"
          className="!text-[16px] !font-bold !text-black"
        >
          Add User
        </Typography>

        <Button variant="contained" className="h-10 !mt-7 !rounded-full !w-48">
          Add new user
        </Button>
      </Box>

      <Box className="mt-8">
        <Grid container spacing={2}>
          <Grid item xs={12} sm="6" md={4}>
            <TextField
              sx={{ mb: 0.5 }}
              fullWidth
              id="textarea-outlined"
              placeholder="First Name"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm="6" md={4}>
            <TextField
              sx={{ mb: 0.5 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Email Address"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12} sm="6" md={4}>
            <TextField
              sx={{ mb: 0.5 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Password"
              label="Password"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserMangement;
