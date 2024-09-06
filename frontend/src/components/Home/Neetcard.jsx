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

const UniversityCard = ({ institute, course, category, minRank, maxRank, onApply }) => (
  <Card>
    <CardImage src="https://via.placeholder.com/65x69" alt="University Logo" />
    <CardText>
      <CardTitle>{institute}</CardTitle>
      <CardSubtitle>Course: {course}</CardSubtitle>
      <CardSubtitle>Category: {category}</CardSubtitle>
      <CardSubtitle>Min Rank: {minRank}</CardSubtitle>
      <CardSubtitle>Max Rank: {maxRank}</CardSubtitle>
      <CardButton onClick={onApply}>VISIT WEB</CardButton>
    </CardText>
  </Card>
);

const UniversityCardList = ({ universities }) => (
  <CardContainer>
    {Array.isArray(universities) && universities.length > 0 ? (
      universities.map((college) => (
        <UniversityCard
          key={college['_id']}
          institute={college['Allotted Institute']}
          course={college['Course']}
          category={college['Alloted Category']}
          minRank={college['min_rank']}
          maxRank={college['max_rank']}
          onApply={() => {
            const url = "https://example.com"; // Replace with actual URL if available
            const formattedURL = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
            window.open(formattedURL, '_blank');
          }}
        />
      ))
    ) : null}
  </CardContainer>
);

export default UniversityCardList;