import React, { useState, useEffect } from 'react';
import Slider from './Slider1'; 
import {
  Card,
  CardContainer,
  CardText,
  CardTitle,
  CardSubtitle,
  CardButton
} from './UniversityCard.styles';

const NEETCard = ({ institute, course, category, minRank, maxRank, onApply }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [firstPart, rest] = institute.split(',', 2); 

  return (
    <Card>
      <CardText>
        <CardTitle>
          {firstPart}
          {showFullDetails && `,${rest}`}
          {!showFullDetails && rest && (
            <button
              onClick={() => setShowFullDetails(true)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              .Read More
            </button>
          )}
        </CardTitle>
        <CardSubtitle>Course: {course}</CardSubtitle>
        <CardSubtitle>Category: {category}</CardSubtitle>
        <CardSubtitle>Clossing Rank: {maxRank}</CardSubtitle>
        {/*<CardButton onClick={onApply}>VISIT WEB</CardButton>*/}
      </CardText>
    </Card>
  );
};

const NEETCardList = ({ universities = [] }) => {
  const [filteredUniversities, setFilteredUniversities] = useState(universities);

  const handleRangeChange = (range) => {
    setFilteredUniversities(
      universities.filter((college) => {
        const roundedMaxRank = Math.floor(college.max_rank);
        return (
          roundedMaxRank >= range[0] &&
          roundedMaxRank <= range[1]
        );
      })
    );
  };

  useEffect(() => {
    if (universities.length > 0) {
      const maxRanks = universities.map((college) => Math.floor(college.max_rank));
      const maxxRank = Math.max(...maxRanks);
      handleRangeChange([0, maxxRank]);
    }
  }, [universities]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <Slider universities={universities} onRangeChange={handleRangeChange} />
      </div>
      
      <CardContainer>
        {Array.isArray(filteredUniversities) && filteredUniversities.length > 0 ? (
          filteredUniversities.map((college) => (
            <NEETCard
              key={college['_id']}
              institute={college['Allotted Institute']}
              course={college['Course']}
              category={college['Alloted Category']}
              minRank={Math.floor(college['min_rank'])} 
              maxRank={Math.floor(college['max_rank'])}
              onApply={() => {
                const url = "https://example.com"; 
                const formattedURL =
                  url.startsWith('http://') || url.startsWith('https://')
                    ? url
                    : `http://${url}`;
                window.open(formattedURL, '_blank');
              }}
            />
          ))
        ) : (
          <p>No institutes found</p>
        )}
      </CardContainer>
    </div>
  );
};

export default NEETCardList;
