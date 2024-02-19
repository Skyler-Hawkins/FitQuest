import React from 'react'
import styled from 'styled-components'
import link from 'next/link'




const NavBar = () => {
    // ADD in a button for the fitquest logo that links to the index.js file (homepage)


  return (
    <Container>
    <Holder>
    <LogoBox>
        
        <NavHomeButton> <StyledLink href="/"> FitQuest</StyledLink></NavHomeButton>

    </LogoBox>
    <NavButtonHolder>
        <NavElement>
            <StyledLink href="/My_Info">My Info</StyledLink>
        </NavElement>
        <NavElement>
            <StyledLink href="/Fitness">Fitness</StyledLink>
        </NavElement>
    </NavButtonHolder>
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
    // padding-top: 1vw;
    // padding-left: 1vw;
    // padding-right: 1vw;




`


const NavHomeButton = styled.button`
    all: unset;
    padding: 1.5vw;
    font-size: 6.5vw;
    // background-color: #7C8C94;
    border: none;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 0.5vw;
    font-weight: bold;

    &:hover{
        background-color: #C0C0C0;
    }
`;
const Holder = styled.div`
    display:flex;
    width: 100%;
    background-color: #7C8C94;
    
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

const NavElement = styled.button`
padding: 1.5vw;
font-size: 3.0vw;
background-color: gainsboro;
border: none;
cursor: pointer;
transition: 0.3s ease all;

border-radius: 0.5vw;

&:hover{
    background-color: green;
}

`






export default NavBar