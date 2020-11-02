import React, { Component, Fragment } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './pages/login'
import Homepage from './pages/homepage'
import store from './redux/store'




class App extends Component {
  state ={
    loggedIn: false
  }

  componentDidMount(){
    console.log("what is going on")
     
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
        this.state.loggedIn ?
        <Homepage />
        :
        <Redirect to="/login" />
        }/>

      
        <Route exact path="/login" render={() =>
        this.state.loggedIn ? 
        <Redirect to="/homepage" />
        :
        <Login experiment={this.experiment}/>
        }/>

        <Route exact path="/homepage" render={() =>
        this.state.loggedIn ?
        <Homepage />
        :
        <Redirect to="/login" />
        }/>
        </Switch>
      </BrowserRouter>
    );

  }
}


export default App;
