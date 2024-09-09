import React, { useState, useEffect } from 'react';
import './sliderStyles.css'; 

const Slider = ({ universities, onRangeChange }) => {
  const [maxxRank, setMaxxRank] = useState(100); 
  const [sliderValue, setSliderValue] = useState(100); 

  useEffect(() => {
    if (universities.length > 0) {
        const maxRanks = universities.map((college) => Math.floor(college.maxRank));
        const maxxRank = Math.max(...maxRanks); 
        setMaxxRank(maxxRank);
        setSliderValue(maxxRank);
    }
  }, [universities]);

  // Handle slider value change
  const handleChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    onRangeChange([0, value]); // Trigger range change with updated value
  };

  // Tooltip positioning logic
  const getTooltipStyle = () => {
    const percent = (sliderValue / maxxRank) * 100;
    return {
      left: `${percent}%`,
      transform: `translateX(-${percent}%)`,
    };
  };

  return (
    <div className="sliderBox">
      <div className="slidecontainer">
        {/* Slider input */}
        <input
          type="range"
          min="0"
          max={maxxRank} // Dynamic max based on valid maxRank values
          className="slider"
          value={sliderValue}
          onChange={handleChange}
        />

        {/* Display the range values */}
        <div className="rangeValues">
          <span>0</span>
          <span>{maxxRank}</span> {/* Safely display the max rank */}
        </div>

        {/* Tooltip showing current slider value */}
        <div className="tooltip" style={getTooltipStyle()}>
          {sliderValue}
        </div>
      </div>
    </div>
  );
};

export default Slider;
