import React, { useState } from 'react';
import styled from 'styled-components';

export default function PasteDropdown({displayText, menu1, menu2, menu3, onSelect = () => {} }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [textDisplay, setTextDisplay] = useState(displayText);
  
    const handleMouseEnter = () => {
      if (!isClicked) {
        setShowDropdown(true);
      }
    };
    const handleLinkClick = (event, newDisplay) => {
      //have the *menu* selection of the dropdown link be the displayed text (displayText)
      const id = event.target.id;
      onSelect(id);
      setTextDisplay(newDisplay);
      event.preventDefault();
    }

  
    const handleMouseLeave = () => {
      if (!isClicked) {
        setShowDropdown(false);
      }
    };
  
    const handleClick = () => {
      setIsClicked(!isClicked);
      setShowDropdown(!showDropdown);
    };
  
    return (
        <PasteButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Button>
            {textDisplay}&nbsp; ▼
          </Button>
          <DropdownContent show={showDropdown}>
            <DropdownLink id={menu1} href="#" onClick={(event) => handleLinkClick(event, menu1)} >{menu1}</DropdownLink>
            <DropdownLink id={menu2} href="#" onClick={(event) => handleLinkClick(event, menu2)}>{menu2}</DropdownLink>
            <DropdownLink id={menu3} href="#" onClick={(event) => handleLinkClick(event, menu3)} >{menu3} </DropdownLink>
          </DropdownContent>
        </PasteButton>
      );
    }




  
    const Button = styled.button`
    background-color: #9094ec;
    color: #212121;
    padding: 0.8vw 1.2vw;
    font-size: 1.2vw;
    font-weight: bold;
    border: 0.15vw solid transparent;
    border-radius: 1.2vw;
    cursor: pointer;
    transition: 0.1s;
  
    &:hover {
      background-color: #6e72db;
      color: white;
    }
  
    &:focus {
      background-color: #6e72db;
    //   color: white;
    }
  `;

    const PasteButton = styled.div`
    position: relative;
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
    &:hover ${Button} {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  `;

  
  const DropdownContent = styled.div`
    display: ${props => (props.show ? 'block' : 'none')};
    font-size: 1vw;  // Smaller font size
    position: absolute;
    z-index: 1;
    min-width: 16vw;  // Smaller min-width
    background-color: #9094ec;
    border: 0.15vw solid #6e72db;  // Smaller border
    border-radius: 0px 1.2vw 1.2vw 1.2vw;  // Smaller border radius
    box-shadow: 0px 0.6vw 1.2vw 0px rgba(0,0,0,0.2);  // Smaller box-shadow
  `;
  
  const DropdownLink = styled.a`
  //   color: #4CAF50;
    padding: 0.6vw 0.8vw;  // Smaller padding
    text-decoration: none;
    display: block;
    transition: 0.1s;
  
    &:hover {
      background-color: #6e72db;
      color: white;
      border-radius: 1.2vw;  // Smaller border radius

    }
  
    &:focus {
      background-color: #6e72db;
      color: white;
      border-radius: 1.2vw;  // Smaller border radius

    }
  `;
  