import {
  Tab,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Icon from "@/app/components/icon";
// import { rows } from "../row";



export const statusObj = [
  { title: "current", color: "primary" },
  { title: "processed", color: "success" },
  { title: "cancelled", color: "error" },
  { title: "waiting", color: "warning" },
  { title: "pending", color: "info" },
];

export const DetailsDesign = ({
  icon,
  title,
  info,
  btnFunc,
  btnText,
  color,
}) => {
  return (
    <Box className="flex w-full md:w-64 md:max-w-300px mt-6">
      <Box
        className="w-10 h-10 mr-2 shrink-0 rounded-full flex items-center justify-center"
        bgcolor="custom.bodyGray"
        color={color}
      >
        <Icon icon={icon} />
      </Box>
      <Box>
        <Typography className="!font-bold !text-sm !mb-3">{title}</Typography>
        <Box>
          {info.map((each, i) => {
            return (
              <Box
                className="flex items-cente !text-xs text-gray-500 mb-2"
                key={i}
              >
                <Typography className="!mr-2 shrink-0 !text-xs">
                  {each.key}:{" "}
                </Typography>
                <Typography className="!text-xs !whitespace-break-spaces">
                  {each.value}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {btnText && (
          <Button className="!text-xs !border bg-slate-100" onClick={btnFunc}>
            {btnText}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export const Summarize = ({ info }) => {
  return (
    <Box>
      {info.map((each, i) => {
        return (
          <Box
            className={`flex items-cente !text-xs mt-2 text-gray-500 mb-8 md:mb-6 `}
            key={i}
          >
            <Typography
              className={`mr-2 shrink-0 !w-36 md:!w-44 !text-xs ${
                each.bold && "!font-bold"
              } `}
            >
              {each.key}
            </Typography>
            <Box
              className={`!text-xs !whitespace-break-spaces ${
                each.bold && "!font-bold"
              }`}
            >
              {each.value}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
