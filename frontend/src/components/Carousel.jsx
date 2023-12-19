import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ children, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 3000,
    cssEase: 'ease-out',
    swipeToSlide: true,
    arrows: true,
    draggable: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
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
const NextArrow = ({ onClick }) => {
  // must pass onClick as props
  return (
    <button
      onClick={onClick}
      type="button"
      className="slide-arrow-wrap right-arrow"
    >
      <span className="material-symbols-outlined arrow">arrow_forward_ios</span>
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="slide-arrow-wrap left-arrow"
    >
      <span className="material-symbols-outlined arrow">arrow_back_ios</span>
    </button>
  );
};

export default Carousel;
