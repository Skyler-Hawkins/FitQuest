import React from 'react'
import styled from 'styled-components'




const NavBar = () => {
  return (
    <Container>
    <Holder>
    <LogoBox>
        FitQuest
        {/* <img src = "FitQuestLogo.jpg"/> */}
    </LogoBox>
    <NavButtonHolder>
        <NavElement>
            Home
        </NavElement>
        <NavElement>
            My Info
        </NavElement>
        <NavElement>
            Fitness
        </NavElement>
        <NavElement>
            other
        </NavElement>
    </NavButtonHolder>
    </Holder>
    </Container>
  )
}


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
const Holder = styled.div`
    display:flex;
    width: 100%;
    background-color: grey;
    justify-content: space-between;
    padding: 1vw;
`
const LogoBox = styled.div`
    font-size: 4.5vw;
    font-weight: bold;
    
`

const NavButtonHolder = styled.div`
display:flex;
// justify-content: space-between;
align-items: center;
gap: 8vw;
`

const NavElement = styled.button`
padding: 1.5vw;
font-size: 2.4vw;
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