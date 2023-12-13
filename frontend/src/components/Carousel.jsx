import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ children, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    // slidesToScroll: 3,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: 'ease-out',
    swipeToSlide: true,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h2 className="section-title">{title}</h2>
      <Slider {...settings}>{children}</Slider>
    </>
  );
};

export default Carousel;
