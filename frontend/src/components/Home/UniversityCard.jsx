import React from 'react';
import {
  Card,
  CardContainer,
  CardImage,
  CardText,
  CardTitle,
  CardSubtitle,
  CardButton
} from './UniversityCard.styles';

const UniversityCard = ({ name, city, branch, percentile, onApply }) => (
  <Card>
    <CardImage src="https://via.placeholder.com/65x69" alt="University Logo" />
    <CardText>
      <CardTitle>{name}</CardTitle>
      <CardSubtitle>City: {city}</CardSubtitle>
      <CardSubtitle>Branch: {branch}</CardSubtitle>
      <CardSubtitle>Percentile: {percentile}</CardSubtitle>
      <CardButton onClick={onApply}>Apply Now</CardButton>
    </CardText>
  </Card>
);

const UniversityCardList = ({ universities }) => (
  <CardContainer>
    {Array.isArray(universities) && universities.length > 0 ? (
     universities.map((college) => (
      <UniversityCard
        key={college['_id']}
        name={college['College Name']}
        percentile={college['percentile']}
        branch={college['Branch Name']}
        city={college['District']}
        websiteURL={college['Website URL']} 
        onApply={() => {
          const url = college['Website URL'];
          const formattedURL = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
          window.open(formattedURL, '_blank');
        }}
      />
    ))
  ) : (
    <p></p>
    )}
  </CardContainer>
);


export default UniversityCardList;