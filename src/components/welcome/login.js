import React, { Component } from 'react'
import formStyles from './form.module.css'
import store from '../../redux/store'

export class Login extends Component {
    state ={
        username: "",
        password: ""
    }

    fixState = (e) =>{
        // controlled form
        let name = e.target.name
        let value = e.target.value
        this.setState({[name]: value})
    }

    fetchUser = (e) =>{
        // fetch user

        e.preventDefault()

        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.message){
                alert(resp.message)
                this.setState({
                    username: "",
                    password: ""
                })
            } else {
                debugger
                localStorage.setItem('jwt', resp.token)
                store.dispatch({ type: "LOG_USER_IN", currentUser: resp.user, userProjects: resp.user_projects })
            } 

        })
    }


    render() {
        return (
            <div className={formStyles.container}>
                LOGIN EXPERIMENT
                <div className={formStyles.form}>
                    <form onSubmit={e => this.fetchUser(e)}>
                        <label>Username</label>
                        <input placeholder="here.." name="username" value={this.state.username} onChange={(e) => this.fixState(e)}/>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={(e) => this.fixState(e)} placeholder="password goes here"/>
                        <button type="submit" >submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
