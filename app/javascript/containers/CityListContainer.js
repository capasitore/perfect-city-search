import React from 'react';
import CityList from '../components/CityList';
import { Route, Link } from 'react-router-dom'
import Aux from '../components/Aux'

const CityListContainer = (props) => 
    <Aux>
        <CityList {...props} />
    </Aux> 


export default CityListContainer;

//{props.currentUser !== null ? < Route exact path="/hearted" render={() => ( <CityList {...props} />)} /> : < Route exact path="/hearted" render={() => <div>Looks like you need to sign in.</div>} />}