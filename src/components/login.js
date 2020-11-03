import React, { Component } from 'react'
import loginStyles from './login.module.css'

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
            debugger 

        })
    }


    render() {
        return (
            <div className={loginStyles.container}>
                LOGIN EXPERIMENT
                <div className={loginStyles.form}>
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
