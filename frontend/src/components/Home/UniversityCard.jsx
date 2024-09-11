import React, { useState, useEffect} from 'react';
import Slider from './Slider'; 
import {
  Card,
  CardContainer,
  CardText,
  CardTitle,
  CardSubtitle,
  CardButton
} from './UniversityCard.styles';

const UniversityCard = ({ name, city, branch, percentile, onApply }) => {
  const [showFullName, setShowFullName] = useState(false);
  const [firstPart, rest] = name.split(',', 2);

  return (
    <Card>
      <CardText>
        <CardTitle>
          {firstPart}
          {showFullName && `,${rest}`}
          {!showFullName && rest && (
            <button
              onClick={() => setShowFullName(true)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              .Read More
            </button>
          )}
        </CardTitle>
        <CardSubtitle>Branch: {branch}</CardSubtitle>
        <CardSubtitle>Percentile: {percentile}</CardSubtitle>
        {/* <CardButton onClick={onApply}>Apply Now</CardButton> */}
      </CardText>
    </Card>
  );
};

const UniversityCardList = ({ universities = [] }) => {
  const [filteredUniversities, setFilteredUniversities] = useState(universities);

  const handleRangeChange = (range) => {
    setFilteredUniversities(
      universities.filter((college) => {
        const roundedPercentile = Math.floor(college.percentile);
        return (
          roundedPercentile >= range[0] &&
          roundedPercentile <= range[1]
        );
      })
    );
  };

  useEffect(() => {
    if (universities.length > 0) {
      const percentiles = universities.map((college) => Math.floor(college.percentile));
      const maxPercentile = Math.max(...percentiles);
      handleRangeChange([0, maxPercentile]); 
    }
  }, [universities]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Slider Section */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <Slider universities={universities} onRangeChange={handleRangeChange} />
      </div>
      
      <CardContainer>
        {Array.isArray(filteredUniversities) && filteredUniversities.length > 0 ? (
          filteredUniversities.map((college) => (
            <UniversityCard
              key={college['_id']}
              name={college['College Name']}
              percentile={Math.floor(college['percentile'])} 
              branch={college['Branch Name']}
              city={college['District']}
              onApply={() => {
                const url = college['Website URL'];
                const formattedURL =
                  url.startsWith('http://') || url.startsWith('https://')
                    ? url
                    : `http://${url}`;
                window.open(formattedURL, '_blank');
              }}
            />
          ))
        ) : (
          <p>No colleges found</p>
        )}
      </CardContainer>
    </div>
  );
};

export default UniversityCardList;










