import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DropdownContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.1);
  width: 250px;
  padding: 20px;
  z-index: 100;
  border: 1px solid #e2e8f0;
`;

const UserInfo = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

const UserName = styled.p`
  font-weight: 700;
  color: #0A2342;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: #2c3e50;
  margin: 0;
`;

const LogoutButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #e53e3e;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Profiledropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DropdownContainer>
      <UserInfo>
        <UserName>{user?.username || "Guest"}</UserName>
        <UserEmail>{user?.email || "No email"}</UserEmail>
      </UserInfo>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
    </DropdownContainer>
  );
};

export default Profiledropdown;





