import React from 'react';
import { Form, FormData, Label } from '../Style/FormStyle'
import { useHistory } from 'react-router-dom'
import HeaderLogin from './HeaderLogin';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Container, GridViagens, theme } from '../Style/Style'
import { useInputValue } from '../Hooks/useInputValue';
import axios from 'axios'
import { MuiThemeProvider } from '@material-ui/core';

function Login() {
  const history = useHistory()
  const [email, setEmail, onChangeEmail] = useInputValue()
  const [password, setPassword, onChangePassword] = useInputValue()

  const goToListTripsPage = () => {

    const body = {
      "email": email,
      "password": password
    }

    axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/login',
      body)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        history.push(`/lista-viagens/`)
      })
      .catch(err => {
        window.alert('Login falhou')
      })
  }

  return (
    <Container>
      <HeaderLogin />
      <GridViagens>
        <Form>
          <MuiThemeProvider theme={theme}>
            <h2>Login</h2>
            <FormData>
              <Label>Email:</Label>
              <Input onChange={onChangeEmail} value={email} />
              <Label>Senha:</Label>
              <Input type={'password'} onChange={onChangePassword} value={password} />
            </FormData>
            <Button variant={'contained'} color={'primary'} onClick={goToListTripsPage}>Entrar</Button>
            <h2>Cadastre-se</h2>
            <FormData>
              <Label>Email:</Label>
              <Input disabled />
              <Label>Senha:</Label>
              <Input disabled />
            </FormData>
            <Button variant={'contained'} color={'primary'} onClick={goToListTripsPage} disabled>Cadastrar</Button>
          </MuiThemeProvider>
        </Form>
      </GridViagens>
    </Container>
  );
}

export default Login;