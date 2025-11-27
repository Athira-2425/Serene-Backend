import React from 'react';
import styled from 'styled-components';
import HeroBackgroundImage from '../asset/images/hero-background.jpg';
import Header from './Header';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  background-image: url(${HeroBackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 35, 66, 0.6); 
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 800px;
  padding: 20px;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroH1 = styled.h1`
  color: #fff;
  font-size: 3.8rem; 
  font-weight: 700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  margin-top: 3vh;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroP = styled.p`
  color: #e0e7ff;
  margin-top: 24px;
  font-size: 1.3rem; 
  max-width: 600px;
  line-height: 1.6;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroH1>Find Your Inner Peace</HeroH1>
        <HeroP>
          Join millions experiencing lower stress, less anxiety, and more restful sleep with our guided meditations, sleep stories, and music.
        </HeroP>
      </HeroContent>
    </HeroContainer>
  );
};


export default HeroSection;
