import React from 'react'

import styled from 'styled-components';
import { keyframes } from 'styled-components'

const Loading = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #BBCEA8; /* Updated background color */
  color: #0B0A07; /* Updated text color */
  padding: 1rem; /* Added padding for spacing */
  border-radius: 8px; /* Rounded corners for cleaner design */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }
  50% { 
    margin-bottom: 1rem;
  }
  100% { 
    margin-bottom: 0;
  }
`;

const Dot = styled.div`
  background-color: #E3D87E; /* Updated dot color */
  border-radius: 50%;
  width: 0.8rem; /* Slightly larger size */
  height: 0.8rem; /* Adjusted height */
  margin: 0 0.3rem; /* Spacing between dots */
  /*Animation*/
  animation: ${BounceAnimation} 0.6s ease-in-out infinite; /* Adjusted animation timing */
  animation-delay: ${(props) => props.delay};
`;



const LoadingComp = () => {
  return (
    <Loading>Loading...
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </Loading>
  )
}

export default LoadingComp