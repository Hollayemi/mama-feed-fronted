import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export default function MyPagination({
  totalNumber,
  currentPage,
  searchParams,
}) {
  const router = useRouter();
  const currentSearchParams = new URLSearchParams(router.asPath);
  const newPage = (page) => {
    for (const para of Object.keys(searchParams)) {
      const value = searchParams[para];
      currentSearchParams.set(para, value);
    }
    currentSearchParams.set("page", page);
    // const updatedUrl = `${
    //   window.location.pathname
    // }?${currentSearchParams.toString()}`;

    router.push(`?${currentSearchParams.toString()}`);
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(totalNumber / 5)}
        color="primary"
        variant="outlined"
        defaultPage={parseInt(currentPage)}
        onChange={(e) =>newPage(parseInt(e.target.textContent))}
        shape="rounded"
      />
    </Stack>
  );
}
