import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #0A2342; 
  color: #fff;
  padding: 80px 50px 30px 50px;
  text-align: center;
`;

const CtaWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 60px auto;
`;

const CtaHeadline = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const CtaSubheadline = styled.p`
  font-size: 1.2rem;
  color: #e0e7ff;
  margin-bottom: 40px;
  opacity: 0.9;
`;

const CtaButton = styled.button`
  border-radius: 50px;
  background: #a9cce3;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 1.2rem;
  font-weight: 700;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #fff;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #2c3e50;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px; /* Adds space if items wrap */
`;


const FooterInfo = styled.div`
  text-align: left;
`;

const CopyrightText = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;


const AddressText = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 8px; /* Adds a little space below the copyright */
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIconLink = styled.a`
  color: #fff;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #a9cce3;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CtaWrapper>
        <CtaHeadline>Ready to Begin Your Journey?</CtaHeadline>
        <CtaSubheadline>
          Join millions finding peace with Serene. It's free to get started and takes less than a minute.
        </CtaSubheadline>
        <CtaButton>Start For Free</CtaButton>
      </CtaWrapper>
      <FooterBottom>
        <FooterInfo>
          <CopyrightText>© {new Date().getFullYear()} Serene. All Rights Reserved.</CopyrightText>
          <AddressText>123 Serenity Lane, Mindfulness, CA 90210</AddressText>
        </FooterInfo>

        <SocialIcons>
          <SocialIconLink href="#" target="_blank" aria-label="Facebook"><FaFacebook /></SocialIconLink>
          <SocialIconLink href="#" target="_blank" aria-label="Instagram"><FaInstagram /></SocialIconLink>
          <SocialIconLink href="#" target="_blank" aria-label="Twitter"><FaTwitter /></SocialIconLink>
        </SocialIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

