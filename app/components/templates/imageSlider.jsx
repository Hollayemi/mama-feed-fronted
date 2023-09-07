/* eslint-disable @next/next/no-img-element */
// ** MUI Imports
import Box from "@mui/material/Box";

// ** Third Party Components
import { useKeenSlider } from "keen-slider/react";
import KeenSliderWrapper from "../wrapper/keen-slider";
import { useState } from "react";
import ReactSlickSlider from "../wrapper/react-slick";

const SwiperCentered = ({ direction, children }) => {
  // ** States
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  // ** Hook
  const [ref] = useKeenSlider({
    rtl: direction === "rtl",
    controls: true,
    loop: true,
    centered: true,
    initial: 0,
    slides: {
      perView:
        typeof window !== "undefined" && window.innerWidth > 1000
          ? 4
          : window.innerWidth < 760
          ? 3
          : 1,
      spacing: 20,
      origin: "center",
    },
  });

  return (
    <ReactSlickSlider>
      {children}
    </ReactSlickSlider>
  );
};

export default SwiperCentered;
