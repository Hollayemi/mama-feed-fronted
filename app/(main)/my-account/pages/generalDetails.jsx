import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { PictureSide } from "../components"

const GeneralDetails = () => {
    return (
        <Grid container spacing={2}>
                <Grid item xs={12} sm={4} className="flex-shrink-0">
                  <Box>
                    <Typography
                      variant="body1"
                      className="!text-[16px] !font-bold !text-black"
                    >
                      Profile Picture
                    </Typography>
                    <br />
                    <Box></Box>
                    <PictureSide />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box>
                    <Typography
                      variant="body1"
                      className="!text-[16px] !font-bold !text-black"
                    >
                      Personal Information
                    </Typography>
                    <br />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="First Name"
                          label="First Name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="Last Name"
                          label="Last Name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="Email Address"
                          label="Email Address"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="Country"
                          label="Country"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="Phone Number"
                          label="Phone Number"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          sx={{ mb: 0.5 }}
                          fullWidth
                          id="textarea-outlined"
                          placeholder="Date of Birth"
                          label="Date of Birth"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="flex md:justify-end mt-16">
                    <Button variant="contained" className="!h-10 !rounded-full !text-xs w-52">Save Changes</Button>
                  </Box>
                </Grid>
              </Grid>
    )
}

export default GeneralDetails