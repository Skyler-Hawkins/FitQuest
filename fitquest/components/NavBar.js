import React from 'react'
import styled from 'styled-components'
import link from 'next/link'




const NavBar = () => {
    // ADD in a button for the fitquest logo that links to the index.js file (homepage)


  return (
    <Container>
    <Holder>
  
    <LogoBox>
        
        <NavElement>
            <NavHomeButton> <StyledLink href="/"> FitQuest</StyledLink></NavHomeButton>
        </NavElement>
    </LogoBox>
    <NavButtonHolder>
        <NavElement>
            <StyledLink href="/login">Login</StyledLink>
        </NavElement>
        <NavElement>
            <StyledLink href="/My_Info">My Info</StyledLink>
        </NavElement>
        <NavElement>
            <StyledLink href="/Fitness">Fitness</StyledLink>
        </NavElement>
    </NavButtonHolder>
    <br></br>
    </Holder>
    </Container>
  )
}

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`;
const Container = styled.div`

    width: 98wv;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    // padding-top: 1vw;
    // padding-left: 1vw;
    // padding-right: 1vw;




`


const NavHomeButton = styled.div`
    all: unset;
    // padding: 1.5vw;
    font-size: 3.5vw;
`;

const NavElement = styled.button`
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #090909;
  padding: 0.7em 1.7em;
  cursor: pointer;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }

  &:before, &:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  &:after {
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #009087;
  }

  &:hover {
    color: #ffffff;
    border: 1px solid #009087;

    &:before {
      top: -35%;
      background-color: #009087;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    &:after {
      top: -45%;
      background-color: #009087;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
  }
`;


const Holder = styled.div`
    display:flex;
    width: 100%;
    background-color: #f2f2e6;  //very light grey
    
    justify-content: space-between;
    padding: 1vw;
`
const LogoBox = styled.div`
    font-size: 4.5vw;
    // font-weight: bold;
    
`

const NavButtonHolder = styled.div`
display:flex;
// justify-content: space-between;
align-items: center;
gap: 8vw;
`

// const NavElement = styled.button`
// padding: 1.5vw;
// font-size: 2.5vw;
// background-color: #e3e3da;
// border: none;
// cursor: pointer;
// transition: 0.3s ease all;

// border-radius: 0.5vw;

// &:hover{
//     background-color: green;
// }

// `






export default NavBar