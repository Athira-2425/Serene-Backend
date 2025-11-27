import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SectionContainer = styled.div`
  padding: 100px 50px 120px 50px;
  background: #f0f4f8; 
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #0A2342;
  margin-bottom: 70px;
`;

const SliderWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  .slick-dots li button:before {
    font-size: 12px;
    color: #0A2342;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    color: #2b6cb0;
    opacity: 1;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 25px;
    color: #0A2342;
  }
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
  margin: 0 15px;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  font-size: 2.5rem;
  color: #a9cce3;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const QuoteText = styled.p`
  font-size: 1.15rem;
  color: #2c3e50;
  line-height: 1.7;
  font-family: 'Georgia', 'serif';
  font-style: italic;
  flex-grow: 1;
  text-align: left;
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 3px solid #e0e7ff;
`;

const UserDetails = styled.div`
  text-align: left;
`;

const QuoteAttribution = styled.p`
  font-size: 1rem;
  color: #0A2342;
  font-weight: 700;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 5px;
  color: #f7b731;
`;

const testimonialsData = [
  {
    quote: "I never thought I could meditate. Serene made it so easy. The 10-minute anxiety sessions have been a game-changer for my workday.",
    name: "Jessica L.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "The Sleep Stories are magical. I used to lie awake for hours, and now I'm out before the story even ends. This app is worth every penny.",
    name: "Michael B.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "As a busy student, the focus music and breathing exercises have drastically improved my study sessions. I feel less stressed and more productive.",
    name: "Sarah K.",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote: "The mood tracker has helped me understand my emotional patterns in a way I never could before. It’s like having a personal wellness coach.",
    name: "David R.",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TestimonialSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <SectionContainer>
      <SectionTitle>Loved by Users Everywhere</SectionTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard>
                <QuoteIcon />
                <QuoteText>"{testimonial.quote}"</QuoteText>
                <UserInfo>
                  <Avatar src={testimonial.avatar} alt={testimonial.name} />
                  <UserDetails>
                    <QuoteAttribution>{testimonial.name}</QuoteAttribution>
                    <StarRating>
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </StarRating>
                  </UserDetails>
                </UserInfo>
              </TestimonialCard>
            </div>
          ))}
        </Slider>
      </SliderWrapper>
    </SectionContainer>
  );
};


export default TestimonialSection;