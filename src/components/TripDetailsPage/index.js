import React, { useEffect } from 'react';
import { Container, GridViagens, theme } from '../Style/Style'
import { NavBar, ButtonChangePage } from '../Style/NavBarStyle'
import { Form } from '../Style/FormStyle'
import { useInputValue } from '../Hooks/useInputValue'
import HeaderLogout from '../HeaderLogout'
import { useParams, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core';

function TripDetailsPage() {
  const history = useHistory()
  const pathParams = useParams()
  const [candidates, setCandidates] = useInputValue()
  let mapsim

  useEffect(() => {

    localStorage.getItem('token') === null && history.push('/')

    getCandidates()
  }, [setCandidates, history])

  const getCandidates = () => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/trip/${pathParams.id}`,
      {
        headers: { 'auth': localStorage.getItem('token') }
      })
      .then(res => {
        setCandidates(res.data.trip)
      })
      .catch(err => {
        window.alert('Buscar candidatos falhou.')
      })
  }

  const goToListTrips = () => {
    history.push('/lista-viagens')
  }

  const goToCreateTrip = () => {
    history.push('/criar-viagem')
  }

  const approveCandidate = (id, decide) => {
    const body = { 'approve': decide }

    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/trips/${pathParams.id}/candidates/${id}/decide`,
      body,
      {
        headers: { 'auth': localStorage.getItem('token') }
      })
      .then(res => {
        decide ? window.alert(`Candidato aprovado com sucesso!`) : (window.alert(`Candidato rejeitado.`))

        getCandidates()
      })
      .catch(err => {
        decide ? window.alert(`Aprovar cadidato falhou.`) : (window.alert(`Rejeitar cadidato falhou.`))
      })

  }

  if (candidates) {
    mapsim = candidates.candidates.map((c, i) => {
      return (
        <div key={i}>
          <p><b>Nome:</b> {c.name}</p>
          <p><b>Idade:</b> {c.age}</p>
          <p><b>Profissão:</b> {c.profession}</p>
          <p><b>País:</b> {c.country}</p>
          <p><b>Texto de Aplicação:</b> {c.applicationText}</p>
          <Button variant={'contained'} color={'primary'} onClick={() => approveCandidate(c.id, true)}>Aprovar</Button>
          <label> </label>
          <Button variant={'contained'} color={'secondary'} onClick={() => approveCandidate(c.id, false)}>Rejeitar</Button>
          <hr />
        </div>
      )
    })
  }

  return (
    <Container>
      <HeaderLogout />
      <MuiThemeProvider theme={theme}>
        <NavBar>
          <ButtonChangePage onClick={goToListTrips}>Lista de Viagens</ButtonChangePage>
          <ButtonChangePage onClick={goToCreateTrip}>Criar Viagem</ButtonChangePage>
        </NavBar>
        <GridViagens>
          <Form>
            <h2>{pathParams.viagem}</h2>
            <h2>Candidatos</h2>
            {mapsim}
          </Form>
        </GridViagens>
      </MuiThemeProvider>
    </Container>
  );
}

export default TripDetailsPage;