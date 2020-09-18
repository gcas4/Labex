import Styled from 'styled-components'

export const NavBar = Styled.div`
background-color: transparent;
text-align: right;
padding: 2px 20px;
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`
export const ButtonChangePage = Styled.button`
padding: 5px 5px;
background-color: transparent;
color: #FF5F00;
border: none;
border-radius: 7px;
font-size: 17px;
cursor: pointer;
margin-left: 20px;

:hover {
  opacity: 0.8;
}
`
export const ButtonPage = Styled.button`
background-color: transparent;
padding: 5px 5px;
color: white;
border: none;
border-radius: 7px;
font-size: 17px;
margin-left: 50px;
`