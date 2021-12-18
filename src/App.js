import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './pages/welcome'
import Homepage from './pages/homepage'
import store from './redux/store'
import {connect} from 'react-redux'
import Newprojectpage from './pages/newprojectpage'
import Projectpage from './pages/projectpage'
import { Helmet } from 'react-helmet'




function App({currentUser}){
 
  useEffect(() => {
    checkJwt()
  }, [])


  const checkJwt = () =>{
    // fetch for user information in case there is a token stored in localStorage.
    let token = localStorage.getItem('jwt')
    if(token){
      fetch('http://localhost:3000/check', {
        method: 'GET',
        headers: {
          'Authentication': localStorage.getItem('jwt')
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        // console.log(resp)
        store.dispatch({type: "LOG_USER_IN", currentUser: resp, userProjects: resp.projects})
      })
    }
  }



 
    return (
      <div className='container'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Project Tracker</title>
          <meta name="description" content="Nested component" />
          <link rel='icon' type='image/png' href='favicon.ico' sizes="16x16" />
        </Helmet>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() =>
        currentUser ?
        <Homepage />
        :
        <Redirect to="/welcome" />
        }/>

      
        <Route exact path="/welcome" render={() =>
        currentUser ? 
        <Redirect to="/" />
        :
        <Welcome/>
        }/>
        <Route exact path="/new-project" render={() => <Newprojectpage />}/>

        <Route exact path="/projects/:name" render={() => <Projectpage />}/>

        </Switch>
      </BrowserRouter>
      </div>
    );

  
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.currentUser,
    newProject: state.newProject
  }
}

export default connect(mapStateToProps)(App);
