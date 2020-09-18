import React from 'react';
import { useHistory } from 'react-router-dom'
import Logo from '../img/labex.png'
import Styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { theme } from './Style/Style'
import { MuiThemeProvider } from '@material-ui/core';

const Container = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  img {
      width: 130px;
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
  }

  button {
      margin: 0;
      color: white;
      border-color: white;
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
  }
`

function HeaderLogin(props) {
  const history = useHistory()

  const goToHome = () => {
    history.push('/')
  }
  const goToLogin = () => {
    history.push('/login')
  }

  return (
    <Container>
      <MuiThemeProvider theme={theme}>
        <img alt={'LabeX'} onClick={goToHome} src={Logo} />
        <Button variant={'outlined'} color={'primary'} onClick={goToLogin}>Login</Button>
      </MuiThemeProvider>
    </Container>
  );
}

export default HeaderLogin;