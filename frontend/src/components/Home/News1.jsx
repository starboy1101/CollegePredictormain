import React from "react";
import { news_2, news_3, news_4, news_5 } from "../../assets/home";
import Container from "../Container";
import SectionTitle from "./SectionTitle";


export default function News() {
  const cards = [
    { id: 1, courseName: "B.Tech", branch: "Computer Science" },
    { id: 2, courseName: "M.Tech", branch: "Mechanical Engineering" },
    { id: 3, courseName: "BCA", branch: "Information Technology" },
    { id: 4, courseName: "MBA", branch: "Finance" },
    // Add more cards as needed
  ];

  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="Recommended For You" classes="text-center" />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-4 mt-8">
            {cards.map((card) => (
              <div
                className="h-auto w-[320px] mx-auto px-2 pt-2 pb-4 rounded-md border-2 border-gray-200 relative z-10"
                key={card.id}
              >
                <div className="relative rounded-xl overflow-hidden">
                </div>
                <article className="px-2">
                  <h2 className="font-bold text-[25px] hover:text-[#6D9886] transition-colors cursor-pointer my-4">
                    {card.courseName}
                  </h2>
                  <p className="font-light text-[14px]">{card.branch}</p>
                  <button className="block mx-auto text-[#6D9886] mt-6">
                    Add to Cart
                  </button>
                </article>
              </div>
            ))}
          </div>
          <div className="text-xl text-center more_news_gradient h-44 w-full text-black font-bold uppercase py-4 flex items-end justify-center relative z-20">
            <a className="cursor-pointer">More courses</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
