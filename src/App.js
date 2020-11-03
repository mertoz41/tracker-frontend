import React, { Component, Fragment } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './pages/welcome'
import Homepage from './pages/homepage'
import store from './redux/store'
import {connect} from 'react-redux'




class App extends Component {
  state ={
    loggedIn: false
  }

  componentDidMount(){
    console.log("what is going on")
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
        store.dispatch({type: "LOG_USER_IN", currentUser: resp.user})
      })
    }
  }

  experiment = () =>{
    this.setState({
      loggedIn: !this.state.loggedIn
    })
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
        <Welcome experiment={this.experiment}/>
        }/>

        </Switch>
      </BrowserRouter>
    );

  }
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App);
