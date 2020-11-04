import React from 'react'
import headerStyles from './header.module.css'
import store from '../redux/store'

export default function Header() {
    const logOut = () =>{
        store.dispatch({type: "LOG_USER_OUT"})
        localStorage.clear()
        alert("logged out")
    }
    return (
        <div className={headerStyles.header}>
                <h1>project tracker</h1>
            <div className={headerStyles.buttons}>
                <h4>Hi, {store.getState().currentUser.username}!</h4>
                <button onClick={() => logOut()}>logout</button>
            </div>
            
        </div>
    )
}
