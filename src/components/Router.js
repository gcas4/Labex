import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

//importando as páginas
import HomePage from './HomePage'
import AplicationForm from './AplicationForm'
import Login from './Login'
import CreateTripPage from './CreateTripPage'
import TripDetailsPage from './TripDetailsPage'
import ListTripsPage from './ListTripsPage';

function Router() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/detalhes-viagem/:viagem/:id'>
                <TripDetailsPage />
            </Route>
            <Route exact path='/criar-viagem'>
                <CreateTripPage />
            </Route>
            <Route exact path='/lista-viagens'>
                <ListTripsPage />
            </Route>
            <Route exact path='/login'>
                <Login />
            </Route>
            <Route exact path='/formulario/:viagem/:id'>
                <AplicationForm />
            </Route>
            <Route exact path='/'>
                <HomePage />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Router;