import React, { Component } from 'react'
import headerStyles from './header.module.css'
import store from '../redux/store'






export class Header extends Component {
    logOut = () =>{
        store.dispatch({type: "LOG_USER_OUT"})
        localStorage.clear()
        alert("logged out")
    }

   
    render(){

    
    return (
        <div className={headerStyles.header}>
                <h1>project tracker</h1>
            <div className={headerStyles.buttons}>
                <h4>Hi, {store.getState().currentUser.username}!</h4>
                <button onClick={() => this.logOut()}>logout</button>
            </div>
            
        </div>
    )
    }
}

export default Header
