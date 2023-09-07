/* eslint-disable @next/next/no-img-element */
// ** MUI Imports
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MuiTimeline from "@mui/lab/Timeline";

import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
// ** Icon Imports
import Icon from "@/app/components/icon";
import { timelineData } from "./data";
import { formatDate } from "@/app/utils/format";

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

// Styled component for the image of a shoe
const ImgShoe = styled("img")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const TimelineLeft = () => {
  const getStatus = {
    completed: "success",
    waiting: "text",
    processing: "warning",
  };

  return (
    <Timeline>
      {timelineData.map((item, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator>
            <TimelineDot color={getStatus[item.status]} />
            <TimelineConnector color={getStatus[item.status]} />
          </TimelineSeparator>
          <TimelineContent sx={{ "& svg": { verticalAlign: "bottom", mx: 4 } }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
              >
                {item.action}
              </Typography>
              <Typography variant="caption">{formatDate(item.date)}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {item.info}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineLeft;
