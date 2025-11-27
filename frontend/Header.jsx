import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';  
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const BrandName = styled(Link)`
  color: #2b6cb0; 
  font-weight: 700;
  font-size: 1.5rem; 
  text-decoration: none;  /* remove underline */
`;

const NavItem = styled(Link)` 
  color: #1a202c;
  font-weight: 700;
  font-size: 1.1rem; 
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    color: #2b6cb0;
  }
`;

const UserLogoContainer = styled.div`
  color: #1a202c;
  font-size: 2.8rem; 
  cursor: pointer;
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 10px 15px;
  min-width: 180px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    font-size: 1rem;
    font-weight: 500;
    color: #2b2d42;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 6px;
  }

  div:hover {
    background: #f1f5f9;
  }
`;

const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 50px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  transition: background 0.3s ease-in-out;

  &.scrolled {
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem; 
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const dropdownRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("completedTasks");
        navigate('/login', { replace: true });
    
    window.location.reload();
    
  };

  return (
    <Nav className={scrolled ? 'scrolled' : ''}>
      <NavMenu>
        <BrandName to="/landing">Serene</BrandName>
        <NavItem to="/sleep">Sleep</NavItem>
        <NavItem to="/stress">Stress</NavItem>
        <NavItem to="/mind">Mind</NavItem>
      </NavMenu>

      <NavMenu>
        <NavItem to="/chat">Chat </NavItem>
        <NavItem to="/progresstracker">Progress Tracker</NavItem>

        <UserLogoContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle />
          {dropdownOpen && (
            <Dropdown>
              <div>Hello, {currentUser?.username || "Guest"}</div>
              <div onClick={handleLogout}>Logout</div>
            </Dropdown>
          )}
        </UserLogoContainer>
      </NavMenu>
    </Nav>
  );
};

export default Header;
