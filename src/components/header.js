import React, { Component } from 'react'
import headerStyles from './header.module.css'
import store from '../redux/store'
import {withRouter} from 'react-router'






export class Header extends Component {
    logOut = () =>{
        store.dispatch({type: "LOG_USER_OUT"})
        localStorage.clear()
        this.props.history.push('/welcome')
        alert("logged out")
    }
    toProjects = () =>{
        store.dispatch({type: "CLEAN_PROJECT"})
        this.props.history.push('/')
    }

   
    render(){

    
    return (
        <div className={headerStyles.header}>
                <h2>project tracker</h2>
                {store.getState().shownProject ?
                <div>
                    <button onClick={() => this.toProjects()}>Projects</button>
                </div>
                :
                null 
                }
            <div className={headerStyles.location}>
                {store.getState().shownProject ?
                <h1>{store.getState().shownProject.title}</h1>
                :
                <h1>HOMME</h1>
                }

            </div>
            <div className={headerStyles.buttons}>
                <h4>Hi, {store.getState().currentUser.username}!</h4>
                <button onClick={() => this.logOut()}>logout</button>
            </div>
            
        </div>
    )
    }
}

export default withRouter(Header)
