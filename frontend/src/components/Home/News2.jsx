import React, { useState, useEffect } from "react";
import { news_2, news_3, news_4, news_5 } from "../../assets/home";
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const images = [news_2, news_3, news_4, news_5]; 
const groupTexts = [
  "Top Computer Engineering Colleges",
  "Top Information Technology Colleges",
  "Top MBA Colleges",
  "Top AI & ML Colleges",
  "Top MCA Colleges"
];

export default function News() {
  const [recommendedColleges, setRecommendedColleges] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2); 

  useEffect(() => {
    fetch("http://localhost:4000/api/recommended")
      .then((response) => response.json())
      .then((data) => {
        const collegesWithImages = data.map((college, index) => ({
          ...college,
          image: images[index % images.length], 
        }));
        setRecommendedColleges(collegesWithImages);
      })
      .catch((error) => {
        console.error("Error fetching recommended colleges:", error);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); 
  };

  const collegesByUniqueWord = recommendedColleges.reduce((acc, college) => {
    const uniqueWord = college['Unique ID']?.trim() || 'Others';
    if (!acc[uniqueWord]) {
      acc[uniqueWord] = [];
    }
    acc[uniqueWord].push(college);
    return acc;
  }, {});

  const groupedCollegesArray = Object.keys(collegesByUniqueWord).map((uniqueWord) => ({
    uniqueWord,
    colleges: collegesByUniqueWord[uniqueWord]
  }));

  const groupsToDisplay = groupedCollegesArray.slice(0, visibleCount);

  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="Recommended For You" classes="text-center" />
          {groupsToDisplay.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">
                {groupTexts[groupIndex] || "Other Colleges"}
              </h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {group.colleges.slice(0, visibleCount * 4).map((college) => (
                  <div
                    className="h-auto w-[320px] mx-auto px-2 pt-2 pb-4 rounded-md border-2 border-gray-200 relative z-10"
                    key={college['_id']}
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={college.image} alt={college['Name']} />
                    </div>
                    <article className="px-2">
                      <h2 className="font-bold text-[25px] hover:text-[#6D9886] transition-colors cursor-pointer my-4">
                        {college['Name']}
                      </h2>
                      <p className="font-light text-[14px]">
                        Located in {college['City']}.
                      </p>
                      <button className="block mx-auto text-[#6D9886] mt-6">
                        Read more
                      </button>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {visibleCount < groupedCollegesArray.length && (
            <div className="text-xl text-center more_news_gradient h-44 w-full text-black font-bold uppercase py-4 flex items-end justify-center relative z-20">
              <button className="cursor-pointer" onClick={handleShowMore}>
                More colleges
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}


