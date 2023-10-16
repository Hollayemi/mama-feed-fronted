"use client";
import { useData } from "@/app/hooks/useData";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

function AdminRouteGuard(props) {
  const { offline } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const { userData } = useSelector((state) => state.reducer.loginReducer);

  useEffect(() => {
    let decodedToken = {};
    decodedToken = userData?.accessToken
      ? jwt_decode(userData?.accessToken)
      : {};

    console.log(offline);
    console.log(decodedToken);
    if (
      offline &&
      decodedToken.role !== "admin" &&
      getUser[1] === "admin" &&
      getUser[2] !== "login"
    ) {
      router.replace(`/admin/login?returnUrl=${pathname}`);
    }
  }, [router, offline, getUser, pathname, userData]);

  const getUser = pathname.split("/");

  return (
    <Box>{offline && !getUser.includes('login') ? <Box>Redirecting...</Box> : props.children}</Box>
  );
}

export default AdminRouteGuard;
