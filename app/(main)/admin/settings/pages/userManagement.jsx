/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { PictureSide } from "../components";
import { useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { adminActivation, newAdmin } from "@/app/redux/state/slices/admin/auth";
import IconifyIcon from "@/app/components/icon";

const UserMangement = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const { data } = useSWR("/admin/get-accounts");
  console.log(data);

  return (
    <Box>
      <Box className="flex justify-between">
        <Typography
          variant="body1"
          className="!text-[16px] !font-bold !text-black"
        >
          Add User
        </Typography>

        <Button
          variant="contained"
          onClick={() => newAdmin(values, dispatch)}
          className="h-10 !mt-7 !rounded-full !w-48"
        >
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
              value={values.fullname}
              onChange={handleChange("fullname")}
              placeholder="Fullname"
              label="fullname"
            />
          </Grid>
          <Grid item xs={12} sm="6" md={4}>
            <TextField
              sx={{ mb: 0.5 }}
              fullWidth
              id="textarea-outlined"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange("email")}
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12} sm="6" md={4}>
            <TextField
              sx={{ mb: 0.5 }}
              fullWidth
              type="password"
              id="textarea-outlined"
              placeholder="Password"
              value={values.password}
              onChange={handleChange("password")}
              label="Password"
            />
          </Grid>
        </Grid>
      </Box>

      <Box className="mt-10">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                className="!font-bold"
                sx={{
                  "& .MuiTableCell-root": {
                    py: 0.5,
                    border: 0,
                  },
                }}
              >
                <TableCell></TableCell>
                <TableCell>Admin Full Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row) => {
                console.log(row);
                return (
                  <TableRow
                    key={row.email}
                    sx={{
                      "&:last-child .MuiTableCell-root": {
                        pb: (theme) => `${theme.spacing(1)} !important`,
                        border: 0,
                      },
                      "& .MuiTableCell-root": {
                        border: 0,
                        py: (theme) => `${theme.spacing(1)} !important`,
                      },
                      "&:first-of-type .MuiTableCell-root": {
                        pt: (theme) => `${theme.spacing(1)} !important`,
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Box className="flex items-center">
                        <img
                          width={50}
                          height={50}
                          alt={row.fullname}
                          className="mr-3 w-12 h-12 rounded-full"
                          src={row.picture || "/images/avatar/1.png"}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className=" max-w-32 !mr-5">
                        <Typography
                          noWrap
                          className="!text-[12px]"
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          {row.fullname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        noWrap
                        className="!text-[12px]"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        className="flex items-center cursor-pointer"
                        onClick={() => adminActivation({status: row.status, email: row.email}, dispatch)}
                      >
                        {row.status === "in-active" ? (
                          <IconifyIcon
                            icon="tabler:play"
                            className="!text-[14px] !text-green-500"
                          />
                        ) : (
                          <IconifyIcon
                            icon="tabler:trash"
                            className="!text-[14px] !text-red-500"
                          />
                        )}
                        <Typography
                          variant="body2"
                          className={`!text-[12px] !text-${
                            row.status === "in-active" ? "green" : "red"
                          }-500 !ml-2`}
                          sx={{ fontWeight: 500, color: "text.secondary" }}
                        >
                          {row.status === "in-active"
                            ? "Activate"
                            : "Inactivate"}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserMangement;
