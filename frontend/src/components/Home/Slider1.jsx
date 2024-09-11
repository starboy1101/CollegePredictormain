import React, { useState, useEffect } from 'react';
import './sliderStyles.css'; 

const Slider = ({ universities, onRangeChange }) => {
  const [maxxRank, setMaxxRank] = useState(100); 
  const [sliderValue, setSliderValue] = useState(100); 

  useEffect(() => {
    if (universities.length > 0) {
        const maxRanks = universities.map((college) => Math.floor(college.max_rank));
        const maxxRank = Math.max(...maxRanks); 
        setMaxxRank(maxxRank);
        setSliderValue(maxxRank);
    }
  }, [universities]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    onRangeChange([0, value]); 
  };

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
        <input
          type="range"
          min="0"
          max={maxxRank} 
          className="slider"
          value={sliderValue}
          onChange={handleChange}
        />
        <div className="rangeValues">
          <span>0</span>
          <span>{maxxRank}</span>
        </div>
        <div className="tooltip" style={getTooltipStyle()}>
          {sliderValue}
        </div>
      </div>
    </div>
  );
};

export default Slider;
