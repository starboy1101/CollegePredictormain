import { discover_1, discover_2, discover_3, news_5 } from "../../assets/home";
//import { discover_4 } from "../../assets/home/trusted";
import { useNavigate } from 'react-router-dom';
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const cards = [
  {
    id: 1,
    image: discover_1,
    title: "Epaper",
  },
  {
    id: 2,
    image: discover_2,
    title: "CutOffs",
  },
  {
    id: 3,
    image: discover_3,
    title: "College Predictor",
  },
  {
    id:4,
    image: news_5,
    title: "Admission portal ",
  },
  {
    id: 5,
    image: discover_3,
    title: "Neet Predictor",
  },
];

const DiscoverCard = ({ card }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (card.title === "Admission portal ") {
      navigate('/admportal');
    } else if (card.title === "College Predictor") {
      navigate('/collpred');
    } else if (card.title === "Epaper") {
      window.location.href = 'https://epaper.vidyarthimitra.org'; 
    } else if (card.title === "Neet Predictor") {
      navigate('/Neetpred');
    } else {
      navigate(`/discover/${card.id}`);
    } 
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
      style={{ width: '300px', height: '400px' }}  
    >
      <img
        src={card.image}
        alt="discover_image"
        className="object-cover w-full h-full" // Ensure the image covers the entire card
      />
      <div className="absolute bottom-10 left-10">
        <div className="flex items-center justify-center w-[110px] h-[80px] bg-black rounded-lg">
          <span className="capitalize text-white font-bold md:text-[20px] text-[16px]">
            {card.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Discover() {
  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="Our Products" />
          <div className="grid lg:grid-cols-3 mt-8 sm:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4">
            {cards.map((card) => (
              <DiscoverCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
