import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const DigitWithTopTag = ({ tag, digit, percentage, className }) => {
  return (
    <Box className={`flex flex-col items-start ${className}`}>
      <Typography variant="caption" className="!text-[10px]">
        {tag}
      </Typography>
      <Typography variant="body1" className="!font-bold !text-[20px]">
        {digit}
      </Typography>
      {percentage && (
        <Typography
          variant="caption"
          className={`!text-[9px] !text-${
            percentage > 30 ? "green" : "red"
          }-500`}
        >
          {percentage?.toFixed(1)} %
        </Typography>
      )}
    </Box>
  );
};

export const Category = ({ image, text, params }) => {
  const route = useRouter();
  return (
    <Box
      onClick={() => route.push(`${text.replace(" ", "-")}`)}
      className={`!w-24 !h-24 flex flex-col cursor-pointer flex-shrink-0 justify-center items-center m-1.5 border-[3px] ${
        params?.category?.replace("-", " ") === text
          ? "border-pink-500 bg-pink-50"
          : "bg-white border-white"
      }  rounded-xl  hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50`}
    >
      <Image src={image} alt={text} width={30} height={30} />
      <Typography variant="caption" className="!mt-2.5 !text-[10px]">
        {text}
      </Typography>
    </Box>
  );
};
