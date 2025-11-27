import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const FormTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0A2342;
  margin-bottom: 30px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a9cce3;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: none;
  background: #2b6cb0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0A2342;
  }
`;

const RedirectText = styled.p`
  margin-top: 30px;
  font-size: 0.9rem;
  color: #2c3e50;

  a {
    color: #2b6cb0;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const Reg = () => {
  return (
    <PageContainer>
      <FormWrapper>
        <FormTitle>Create Your Account</FormTitle>
        <form>
          <InputField type="text" placeholder="Full Name" required />
          <InputField type="email" placeholder="Email" required />
          <InputField type="password" placeholder="Password" required />
          <SubmitButton type="submit">Create Account</SubmitButton>
        </form>
        <RedirectText>
          Already have an account? <Link to="/log">Log In</Link>
        </RedirectText>
      </FormWrapper>
    </PageContainer>
  );
};

export default Reg;
