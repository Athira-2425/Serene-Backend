import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  padding: 100px 50px;
  background: #ffffff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  color: #0A2342;
  margin-bottom: 70px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 30px;
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: #0A2342;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #2c3e50;
  line-height: 1.6;
`;

const FeatureSection = () => {
  return (
    <SectionContainer>
      <SectionTitle>Your Toolkit for Well-being</SectionTitle>
      <GridWrapper>

        
        <FeatureCard>
          <FeatureImage 
            src="https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Person sitting in a classic meditation pose outdoors." 
          />
          <CardContent>
            <CardTitle>Guided Meditations</CardTitle>
            <CardText>Find calm in minutes. Our sessions help you manage anxiety and find focus with guidance for every experience level.</CardText>
          </CardContent>
        </FeatureCard>

       
        <FeatureCard>
          <FeatureImage 
            src="https://images.pexels.com/photos/3932950/pexels-photo-3932950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Mother reading a bedtime story to her child in a cozy bed." 
          />
          <CardContent>
            <CardTitle>Sleep Stories</CardTitle>
            <CardText>Drift off to deep, restful sleep. Listen to soothing tales designed to quiet your mind and help you fall asleep naturally.</CardText>
          </CardContent>
        </FeatureCard>

       
        <FeatureCard>
          <FeatureImage 
            src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="A person analyzing colorful charts and graphs on a desk." 
          />
          <CardContent>
            <CardTitle>Daily Mood Tracker</CardTitle>
            <CardText>Check in with yourself. Our tracker asks simple, insightful questions to help you identify your feelings and visualize your emotional wellness over time.</CardText>
          </CardContent>
        </FeatureCard>
        
       
        <FeatureCard>
          <FeatureImage 
            src="https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Woman practicing a controlled breathing technique outdoors." 
          />
          <CardContent>
            <CardTitle>Breathing Exercises</CardTitle>
            <CardText>Ground yourself anywhere. Use our quick breathing exercises to find immediate calm during a busy day or moment of stress.</CardText>
          </CardContent>
        </FeatureCard>

      </GridWrapper>
    </SectionContainer>
  );
};

export default FeatureSection;
