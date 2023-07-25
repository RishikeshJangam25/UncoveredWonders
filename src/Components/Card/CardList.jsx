import Slider from "react-slick";
import { indiaVisits } from "../../assets/Data/indiaVisits";
import SingleCard from "./SingleCard";
import "./Card.css";

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  pauseOnHover: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  className: "slick_slider",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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
function CardList({ cards }) {
  return (
    <div className="mb-3">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id}>
            <SingleCard card={card} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardList;
