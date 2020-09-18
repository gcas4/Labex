import React, { useState, useEffect } from 'react';
import HeaderLogin from '../HeaderLogin'
import { Form, SelectStyled } from '../Style/FormStyle'
import { useHistory } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Container, GridViagens, SideBar, Conteudo, theme } from '../Style/Style'
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core';

function HomePage() {
  const history = useHistory()
  const [trip, setTrip] = useState([])
  const [tripSelected, setTripSelected] = useState('')

  useEffect(() => {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labeX/gessica-costa-julian/trips')
      .then(res => {
        setTrip(res.data.trips)
      })
      .catch(err => {
        window.alert('Listar viagens falhou')
      })
  }, [setTrip])

  const goToForm = () => {
    tripWanted.length &&
      history.push(`/formulario/${tripWanted[0].name}/${tripWanted[0].id}`)
  }

  const onChangeTrip = (e) => {
    setTripSelected(e.target.value)
  }

  const trips = trip.map((trip, i) => {
    return <MenuItem key={i} value={trip.name}>{trip.name} - {trip.planet}</MenuItem>
  })

  const tripWanted = trip.filter((trip) => {
    if (trip.name === tripSelected) {
      return trip
    }
  })

  return (
    <Container>
      <HeaderLogin />
      <Conteudo>
        <SideBar></SideBar>
        <GridViagens>
          <Form>
            <MuiThemeProvider theme={theme}>
              <FormControl variant="filled">
                <InputLabel id={'select-label'} color={'primary'}>Viagem</InputLabel>
                <SelectStyled labelId={'select-label'} onChange={onChangeTrip} value={tripSelected}>
                  {trips}
                </SelectStyled>
              </FormControl>
              {
                trip.filter((trip) => {
                  if (trip.name === tripSelected) {
                    return trip
                  }
                }).map((trip, i) => {
                  return (
                    <div key={i}>
                      <h2>{trip.name}</h2>
                      <p><b>Planeta:</b> {trip.planet}</p>
                      <p><b>Data:</b> {trip.date}</p>
                      <p><b>Duração em dias:</b> {trip.durationInDays}</p>
                      <p><b>Descrição:</b> {trip.description}</p>
                    </div>
                  )
                })
              }
              <Button variant={'contained'} color="primary" onClick={goToForm}>Aplicar para Viagem</Button>
            </MuiThemeProvider>
          </Form>
        </GridViagens>
      </Conteudo>
    </Container>
  );
}

export default HomePage;