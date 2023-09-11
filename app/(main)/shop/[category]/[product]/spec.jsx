import IconifyIcon from "@/app/components/icon";
import { Box } from "@mui/material";

export const SpecBox = ({ select, selected, iscolor, all }) => {
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      select((prev) => {
        const newBox = prev.filter((x) => x !== item);
        return [...newBox];
      });
    } else {
      select((prev) => {
        return [...prev, item];
      });
    }
  };
  return (
    <Box className="flex flex-wrap">
      {all.map((item, i) => (
        <Box
          key={i}
          className={`border relative w-6 h-6 md:w-8 md:h-8 cursor-pointer rounded-md text-xs flex-shrink-0 flex m-1 items-center justify-center ${
            iscolor && `bg-${item.toLowerCase()}-500 border-${item}-500`
          }`}
          onClick={() => select && handleSelect(item)}
        >
          {!iscolor && item}
          {selected?.includes(item) && (
            <Box className="w-4 h-4 rounded-full absolute !text-[8px] top-0 right-0 text-white shadow bg-green-500 flex items-center justify-center">
              <IconifyIcon icon="tabler:check" />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
