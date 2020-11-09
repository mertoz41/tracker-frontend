import React, { Component, Fragment } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './pages/welcome'
import Homepage from './pages/homepage'
import store from './redux/store'
import {connect} from 'react-redux'
import Newprojectpage from './pages/newprojectpage'
import Projectpage from './pages/projectpage'




class App extends Component {
 

  componentDidMount(){
    this.checkJwt()
     
  }

  checkJwt = () =>{
    if(localStorage.getItem('jwt')){
      fetch('http://localhost:3000/check', {
        method: 'GET',
        headers: {
          'Authentication': localStorage.getItem('jwt')
        }
      })
      .then(resp => resp.json())
      .then(resp => {
         
        store.dispatch({type: "LOG_USER_IN", currentUser: resp.user, userProjects: resp.user.projects})
      })
    }
  }



  render(){
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() =>
        this.props.currentUser ?
        <Homepage />
        :
        <Redirect to="/welcome" />
        }/>

      
        <Route exact path="/welcome" render={() =>
        this.props.currentUser ? 
        <Redirect to="/" />
        :
        <Welcome/>
        }/>
        <Route exact path="/new-project" render={() => <Newprojectpage />}/>

        <Route exact path="/projects/:name" render={() => <Projectpage />}/>

        </Switch>
      </BrowserRouter>
    );

  }
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.currentUser,
    newProject: state.newProject
  }
}

export default connect(mapStateToProps)(App);
