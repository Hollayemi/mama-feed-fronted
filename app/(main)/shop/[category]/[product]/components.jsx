const { RoundedPicWithName } = require("@/app/components/templates/cards");
const { formatDate } = require("@/app/utils/format");
const { Box, Typography, Rating, Button } = require("@mui/material");

const RatingDisplayLength = ({ rate, percentage, freq }) => {
  const getcolor = (color) => {
    if (color >= 85) {
      return "green";
    }

    if (color >= 70) {
      return "blue";
    }

    if (color >= 50 && color < 70) {
      return "orange";
    }

    if (color > 30 && color < 50) {
      return "gray";
    }

    if (color <= 30) {
      return "red";
    }
  };
  return (
    <Box className="flex items-center">
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {rate}
      </Typography>
      <Box className="flex-grow relative w-44 !mx-2 bg-gray-50">
        <Box
          className={`bg-${getcolor(percentage)}-500 h-1 !rounded-md`}
          sx={{ width: `${percentage}%` }}
        ></Box>
      </Box>
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {freq} Ratings
      </Typography>
    </Box>
  );
};

const StarsAndReviews = ({ stars, review, date, user }) => {
  return (
    <Box className="flex items-start !mb-8 md: px-6">
      <Box className="!w-3/6 overflow-hidden">
        <RoundedPicWithName
          className="!text-[10px]"
          name={user.name}
          caption={user.country}
          pic={user.image}
        />
      </Box>
      <Box className="md:!pl-5">
        <Box className="flex items-center !mb-3">
          <Rating
            defaultValue={stars}
            className=""
            name="size-small"
            size="small"
          />
          <Typography variant="caption" className="!text-sm !ml-4">
            {formatDate(date)}
          </Typography>
        </Box>
        <Typography variant="caption" className="!text-sm ">
          {review}
        </Typography>
      </Box>
    </Box>
  );
};

export const ReviewTab = ({ productId }) => {
  return (
    <Box>
      <Box className="flex justify-evenly ">
        <Box className="flex flex-col items-start">
          <Typography variant="caption" className="!font-bold !text-xs">
            Total Reviews
          </Typography>
          <Typography variant="body2" className="!font-bold !text-xl !mt-3">
            234
          </Typography>
        </Box>
        <Box className="flex flex-col items-start">
          <Typography variant="caption" className="!font-bold !text-xs">
            Average Rating
          </Typography>
          <Box className="!flex items-center !mt-3">
            <Typography variant="body2" className="!font-bold !text-xl !mr-3">
              4.0
            </Typography>
            <Rating
              defaultValue={4}
              className=""
              name="size-small"
              size="small"
            />
          </Box>
        </Box>
        <Box className="flex flex-col items-start">
          <RatingDisplayLength rate={5} percentage={78} freq={7} />
          <RatingDisplayLength rate={4} percentage={20} freq={7} />
          <RatingDisplayLength rate={4} percentage={10} freq={7} />
          <RatingDisplayLength rate={2} percentage={60} freq={7} />
          <RatingDisplayLength rate={1} percentage={57} freq={7} />
        </Box>
      </Box>
      <Box className="h-[2px] border-gray-300 !my-4 !mb-10"></Box>
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{name:"Oluwasusi Stephen Olayemi", country: "Nigeria", image:"/images/avatar/2.png"}}
      />
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{name:"Amuroko Joy", country: "United State", image:"/images/avatar/3.png"}}
      />
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{name:"Stephen Olayemi", country: "Canada", image:"/images/avatar/5.png"}}
      />
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{name:"Tolulope Gbenga", country: "India", image:"/images/avatar/4.png"}}
      />


      <Box className="flex justify-center !mt-10">
        <Button variant="contained" size="large" className="!rounded-full !h-98 !w-40 !text-xs">See More</Button>
      </Box>
    </Box>
  );
};
