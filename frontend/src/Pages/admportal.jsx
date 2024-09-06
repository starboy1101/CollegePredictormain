import { useState } from "react";
import Front from "../components/Home/Front";
import Stats from "../components/Home/Stats2";
import News from "../components/Home/News1";
import HowItWorks from "../components/Home/HowItWorks1";

export default function Admportal() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleSelectCourse = (course) => {
    setSelectedCourses((prevCourses) => [...prevCourses, course]);
  };

  const handleGoToCart = () => {
    setIsCartVisible(true);
  };

  const handleRemoveCourse = (indexToRemove) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  return (
    <main>
      <Front />
      <Stats onSelectCourse={handleSelectCourse} onGoToCart={handleGoToCart} />
      <News />
      <HowItWorks />

      {/* Cart Modal */}
      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px]">
            <h2 className="text-lg font-bold mb-4">Selected Courses</h2>
            <ul className="list-disc ml-5 mb-4">
              {selectedCourses.length > 0 ? (
                selectedCourses.map((course, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {course}
                    <button
                      className="text-red-500 ml-4"
                      onClick={() => handleRemoveCourse(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li>No courses selected yet.</li>
              )}
            </ul>
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded w-full"
              onClick={handleCloseCart}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
