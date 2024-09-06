import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%; /* Use full width of the container */
  max-width: 1175px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px; /* Add padding to avoid content touching edges */
  box-sizing: border-box; /* Ensure padding is included in width */
  margin: 0 auto; /* Center align the container */
`;

export const Card = styled.div`
  flex: 1 1 calc(25% - 20px); /* Responsive width for the cards */
  max-width: 272px; /* Ensure maximum width is not exceeded */
  height: auto; /* Adjust height based on content */
  background: white;
  border-radius: 22px;
  border: 1px #d5cdcd solid;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box; /* Ensure padding is included in width */
  overflow: hidden; /* Hide overflowing content */

  /* Responsive design for different screen sizes */
  @media (max-width: 1200px) {
    flex: 1 1 calc(33.33% - 20px);
  }

  @media (max-width: 992px) {
    flex: 1 1 calc(50% - 20px);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(100% - 20px);
  }
`;

export const CardImage = styled.img`
  width: 65px;
  height: 69px;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 8px;
`;

export const CardText = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column; /* Align items vertically */
`;

export const CardTitle = styled.div`
  color: black;
  font-size: 17px;
  font-family: Judson, sans-serif;
  font-weight: 400;

  /* Responsive design */
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const CardSubtitle = styled.div`
  color: black;
  font-size: 12px;
  font-family: Judson, sans-serif;
  font-weight: 400;
  margin-top: 5px;

  /* Responsive design */
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const CardButton = styled.div`
  margin-top: 10px;
  color: #ff9c00;
  font-size: 14px;
  font-family: Judson, sans-serif;
  font-weight: 400;
  cursor: pointer;

  /* Responsive design */
  @media (max-width: 768px) {
    font-size: 12px;
  }

  &:hover {
    text-decoration: underline;
  }
`;