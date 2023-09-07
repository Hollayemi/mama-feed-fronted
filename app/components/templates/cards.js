/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material"

export const TestimonyCard = ({ text, pic, name, nameCap }) => {
    return (
        <Box className="bg-white px-5 py-7 w-80 !h-60 rounded-md m-2">
            <Typography variant="caption" className="!text-14">{text}</Typography>
            <RoundedPicWithName pic={pic} name={name} caption={nameCap} className="mt-5"  />
        </Box>
    )
}
export const RoundedPicWithName = ({ pic, name, caption, className, imageStyle }) => {
    return (
        <Box className={`flex items-center ${className}`}>
            <img src={pic} alt={name} className={`w-10 h-10 rounded-full ${imageStyle}`} />
            <Box className="!ml-3">
                <Typography variant="body1" className="!font-bold whitespace-nowrap !leading-0 text-ellipsis">{name}</Typography>
                <Typography variant="caption" className="!leading-0">{caption}</Typography>
            </Box>
        </Box>
    )
}