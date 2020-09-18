import React from 'react';
import Button from '@material-ui/core/Button'
import { Container, GridViagens, theme } from '../Style/Style'
import { Form, FormData, Label, SelectStyled } from '../Style/FormStyle'
import { useForm } from '../Hooks/useForm'
import { useParams } from 'react-router-dom'
import HeaderLogin from '../HeaderLogin';
import Input from '@material-ui/core/Input'
import { countries } from '../Selects'
import axios from 'axios'
import { MuiThemeProvider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

function AplicationForm() {
  const pathParams = useParams()
  const { form, onChange, resetValues } = useForm({
    name: '',
    age: '',
    applicationText: '',
    profession: '',
    country: ''
  })

  const handleInputChange = e => {
    const { value, name } = e.target;
    onChange(name, value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    onClickSend()
  }

  const onClickSend = () => {

    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/trips/${pathParams.id}/apply`,
      form)
      .then(res => {
        window.alert('Formulário enviado com sucesso!')
        resetValues()
      })
      .catch(err => {
        window.alert('Envio do formulário falhou')
      })
  }

  return (
    <Container>
      <HeaderLogin />
      <GridViagens>
        <Form onSubmit={handleSubmit}>
          <MuiThemeProvider theme={theme}>
            <h2>Formulário de Aplicação</h2>
            <FormData>
              <Label>Nome:</Label>
              <Input onChange={handleInputChange} value={form.name} name={'name'} type={'text'} inputProps={{ pattern: '[A-Za-zÀ-ú ]{3,}', title: "O nome deve conter 3 letras no mínimo." }} required />
              <Label>Idade:</Label>
              <Input onChange={handleInputChange} value={form.age} name={'age'} type={'Number'} inputProps={{ min: '18' }} required />
              <Label>Profissão:</Label>
              <Input onChange={handleInputChange} value={form.profession} name={'profession'} type={'text'} inputProps={{ pattern: '.{10,}', title: "A profissão deve conter no mínimo 10 caracteres." }} required />
              <Label>País:</Label>
              <SelectStyled onChange={handleInputChange} value={form.country} name={'country'} type={'text'} required>
                {
                  countries.map(country => {
                    return <MenuItem key={country.ordem} value={country.nome}>{country.nome}</MenuItem>
                  })
                }
              </SelectStyled>
              <Label>Texto de Aplicação:</Label>
              <Input onChange={handleInputChange} value={form.applicationText} name={'applicationText'} type={'text'} inputProps={{ pattern: '.{30,}', title: "O texto deve conter no mínimo 30 caracteres." }} required />
              <Label>Viagem:</Label>
              <Input value={pathParams.viagem} disabled />
            </FormData>
            <Button type={'submit'} color={'primary'} variant={'contained'}>Enviar</Button>
          </MuiThemeProvider>
        </Form>
      </GridViagens>
    </Container>
  );
}

export default AplicationForm;