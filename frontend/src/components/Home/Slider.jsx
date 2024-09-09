import React, { useState, useEffect } from 'react';
import './sliderStyles.css'; 

const Slider = ({ universities, onRangeChange }) => {
  const [maxPercentile, setMaxPercentile] = useState(100);
  const [sliderValue, setSliderValue] = useState(100);

  useEffect(() => {
    if (universities.length > 0) {
      const percentiles = universities.map((college) => Math.floor(college.percentile));
      const maxPercentile = Math.max(...percentiles);
      setMaxPercentile(maxPercentile);
      setSliderValue(maxPercentile);
    }
  }, [universities]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    onRangeChange([0, value]);
  };

  const getTooltipStyle = () => {
    const percent = (sliderValue / maxPercentile) * 100;
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
          max={maxPercentile}
          className="slider"
          value={sliderValue}
          onChange={handleChange}
        />
        <div className="rangeValues">
          <span>0</span>
          <span>{maxPercentile}</span>
        </div>
        <div className="tooltip" style={getTooltipStyle()}>
          {sliderValue}
        </div>
      </div>
    </div>
  );
};

export default Slider;








