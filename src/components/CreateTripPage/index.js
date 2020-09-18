import React, { useEffect } from 'react';
import { NavBar, ButtonChangePage, ButtonPage } from '../Style/NavBarStyle'
import { Form, FormData, Label, SelectStyled } from '../Style/FormStyle'
import { useHistory } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import HeaderLogout from '../HeaderLogout';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Container, GridViagens, theme } from '../Style/Style'
import axios from 'axios'
import { MuiThemeProvider } from '@material-ui/core';
import { planets } from '../Selects';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText'

function CreateTripPage() {
  const history = useHistory()
  const { form, onChange, resetValues } = useForm({
    name: '',
    planet: '',
    date: '',
    description: '',
    durationInDays: ''
  })

  const handleInputChange = e => {
    const { value, name } = e.target;
    onChange(name, value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('form', form)
    createTrip()
  }

  useEffect(() => {
    localStorage.getItem('token') === null && history.push('/')
  }, [history])

  const goToListTrips = () => {
    history.push('/lista-viagens')
  }

  const createTrip = () => {

    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/trips`,
      form,
      {
        headers: { 'auth': localStorage.getItem('token') }
      })
      .then(res => {
        window.alert(`Viagem ${res.data.trip.name} criada com sucesso!`)
        resetValues()
      })
      .catch(err => {
        window.alert('Cadastrar viagem falhou')
      })
  }

  let today = new Date()
  let day = today.getDate()
  let month = today.getMonth() + 1
  const year = today.getFullYear();
  if (day < 10) { day = '0' + day }
  if (month < 10) { month = '0' + month }
  today = year + '-' + month + '-' + day

  return (
    <Container>
      <HeaderLogout />
      <NavBar>
        <ButtonChangePage onClick={goToListTrips}>Lista de Viagens</ButtonChangePage>
        <ButtonPage>Criar Viagem</ButtonPage>
      </NavBar>
      <GridViagens>
        <Form onSubmit={handleSubmit}>
          <MuiThemeProvider theme={theme}>
            <h2>Criar Viagem</h2>
            <FormData>
              <Label>Nome:</Label>
              <Input onChange={handleInputChange} value={form.name} name={'name'} type={'text'} inputProps={{ pattern: '[A-Za-zÀ-ú ]{5,}', title: 'O nome deve conter no mínimo 5 letras.' }} required />
              <Label>Planeta:</Label>
              <SelectStyled onChange={handleInputChange} value={form.planet} name={'planet'} type={'text'}>
                {
                  planets.map((planet, i) => {
                    return (
                      <MenuItem key={i} value={planet}>{planet}</MenuItem>
                    )
                  })
                }
              </SelectStyled>
              {!form.planet && <FormHelperText>Campo obrigatório!</FormHelperText>}
              <Label>Duração:</Label>
              <Input onChange={handleInputChange} value={form.durationInDays} name={'durationInDays'} type={'Number'} inputProps={{ min: '50' }} required />
              <Label>Data:</Label>
              <Input onChange={handleInputChange} value={form.date} name={'date'} type={'date'} inputProps={{ min: today }} required />
              <Label>Descrição:</Label>
              <Input onChange={handleInputChange} value={form.description} name={'description'} type={'text'} inputProps={{ pattern: '[A-Za-zÀ-ú,.?!0-9 ]{30,}', title: 'A descrição deve conter no mínimo 50 letras.' }} required />
              <Button type='submit' variant={'contained'} color={'primary'}>Enviar</Button>
            </FormData>
          </MuiThemeProvider>
        </Form>
      </GridViagens>
    </Container>
  );
}

export default CreateTripPage;