import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const settings = {
    infinite: true,
    centerMode: true,
    variableWidth: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
};
const configs = {
    1: settings
}


const ReactSlickSlider = ({ config = 1, children }) => {
    return (
        <Slider {...configs[config]}>
            {children}
        </Slider>
    )
}

export default ReactSlickSlider