import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  background: linear-gradient(90deg, #0062E6 0%, #33A7FF 100%);
  padding: 1rem;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const BrandLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  &:hover {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 0.5rem;
    gap: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 0 0 8px 8px;
    z-index: 1000;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      height: 3px;
      background-color: white;
      border-radius: 3px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
    color: #0062E6;
    border-radius: 0;
    font-weight: 500;
    
    &:hover {
      background-color: #f5f8ff;
      transform: none;
    }

    &.active {
      background-color: #f0f7ff;
      color: #0062E6;
      font-weight: 600;
      box-shadow: none;
      
      &:after {
        display: none;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: #0062E6;
        border-radius: 0 2px 2px 0;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid #eef2f7;
    }
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarWrapper>
      <NavContainer>
        <BrandLink to="/">Interview Scheduler</BrandLink>
        <HamburgerButton onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </HamburgerButton>
        <NavLinks isOpen={isOpen}>
          <StyledLink
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </StyledLink>
          <StyledLink
            to="/calendar"
            className={location.pathname === '/calendar' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Calendar
          </StyledLink>
          <StyledLink
            to="/schedule"
            className={location.pathname === '/schedule' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Schedule Interview
          </StyledLink>
        </NavLinks>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar; 