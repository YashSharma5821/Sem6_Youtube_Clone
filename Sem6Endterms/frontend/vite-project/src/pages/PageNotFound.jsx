import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #748067;
  background-color: #BBCEA8; /* Updated background color */
  padding: 2rem; /* Added padding for spacing */
  gap: 1.5rem; /* Uniform gap between items */
  border-radius: 10px; /* Added rounded corners */
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #E3D87E; /* Updated background color */
  border: 2px solid #748067; /* Updated border color and width */
  padding: 2rem 3rem; /* Adjusted padding */
  gap: 1.5rem; /* Adjusted gap */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added shadow for a polished look */
  border-radius: 10px; /* Rounded corners for modern design */
`;

const Title = styled.h1`
  font-size: 2rem; /* Adjusted font size for better readability */
  font-weight: bold; /* Added boldness to enhance appearance */
  color: #0B0A07; /* Updated color */
  margin: 1rem 0; /* Added margin for spacing */
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? `150px` : `350px`)}; /* Adjusted height */
  flex: 1;
  border-radius: 8px; /* Added rounded corners to the image */
  @media only screen and (max-width: 700px) {
    height: 250px; /* Adjusted responsive height */
  }
`;



const PageNotFound = () => {
    return (
        <Container>
            <Wrapper>
                <Image
                    src="https://cdn1.iconfinder.com/data/icons/photo-stickers-words/128/word_18-1024.png"
                    alt="Not Found"
                />

                <Link to="/">
                    <Title>Go to Home  </Title>
                </Link>
            </Wrapper>

        </Container>
    );
};
export default PageNotFound;