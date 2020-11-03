import React, { Component, Fragment } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './pages/welcome'
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
        <Redirect to="/welcome" />
        }/>

      
        <Route exact path="/welcome" render={() =>
        this.state.loggedIn ? 
        <Redirect to="/homepage" />
        :
        <Welcome experiment={this.experiment}/>
        }/>

        <Route exact path="/homepage" render={() =>
        this.state.loggedIn ?
        <Homepage />
        :
        <Redirect to="/welcome" />
        }/>
        </Switch>
      </BrowserRouter>
    );

  }
}


export default App;
