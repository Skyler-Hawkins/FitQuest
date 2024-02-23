import React, { useState } from 'react';
import styled from 'styled-components';

// Style for dropdown button
const Dropbtn = styled.button`
    color: white;
    padding: 10px;
    font-size: 15px;
    border: none;
    cursor: pointer;
`;

// Style for dropdown content
const DropdownContent = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'show',
  })`
    display: ${props => (props.showDropdown ? 'block' : 'none')};
    position: absolute;
    background-color: #ffffff;
    min-width: 85px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

// Style for each content div
const DropdownItem = styled.div`
    padding: 10px 5px;
`;

// Highlight dropdown options on hover


// Show the dropdown menu on click
const HoverDropdown = styled.div`
    position: relative;
    background-color: #eaeaea;

`;

// Highlight dropdown button when dropdown menu is open
const HoverDropbtn = styled(Dropbtn)`
    background-color: #3d3d7a;

`;


export default function Dropdown() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        console.log("dropdown " + showDropdown)
    };

    return (
        <span className="dropdown">
            <HoverDropbtn onClick={toggleDropdown}>Dropdown</HoverDropbtn>
            <HoverDropdown>
                <DropdownContent show={showDropdown}>
                    <DropdownItem>Name</DropdownItem>
                    <DropdownItem>Age</DropdownItem>
                    <DropdownItem>Weight</DropdownItem>
                    <DropdownItem>Height</DropdownItem>

                </DropdownContent>
            </HoverDropdown>
        </span>
    );
}
