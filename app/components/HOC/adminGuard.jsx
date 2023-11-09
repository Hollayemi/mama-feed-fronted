"use client";
import { useData } from "@/app/hooks/useData";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

function AdminRouteGuard(props) {
  const { offline } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.reducer.loginReducer);

  useEffect(() => {
    setLoading(true);
    let decodedToken = {};
    decodedToken = userData?.accessToken
      ? jwt_decode(userData?.accessToken)
      : {};

    if (offline && getUserPath[1] === "admin") {
      setLoading(true);
      router.replace(`/admin/login?returnUrl=${pathname}`);
      setLoading(false);
    }
    if (
      getUserPath[1] === "admin" &&
      decodedToken.role !== "admin" &&
      getUserPath[2] !== "login"
    ) {
      setLoading(true);
      router.replace(`/admin/login?returnUrl=${pathname}`);
      setLoading(false);
    }
    setLoading(false);
  }, [router, offline, getUserPath, setLoading, pathname, userData]);

  const getUserPath = pathname.split("/");

  return <Box>{loading ? <Box>Redirecting...</Box> : props.children}</Box>;
}

export default AdminRouteGuard;
