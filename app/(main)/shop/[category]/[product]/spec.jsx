import IconifyIcon from "@/app/components/icon";
import { Box } from "@mui/material";

export const SpecBox = ({ select, selected, iscolor, all }) => {
  return (
    <Box className="flex flex-wrap">
      {all.map((item, i) => (
        <Box
          key={i}
          className={`border relative w-8 h-8 cursor-pointer rounded-md flex-shrink-0 flex m-1 items-center justify-center ${
            iscolor && `bg-${item}-500 border-${item}-500`
          }`}
          onClick={() => select && select(item)}
        >
          {!iscolor && item}
          {item === selected && (
            <Box className="w-4 h-4 rounded-full absolute !text-[8px] top-0 right-0 text-white shadow bg-green-500 flex items-center justify-center">
              <IconifyIcon icon="tabler:check" />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
