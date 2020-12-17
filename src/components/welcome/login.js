import React, { Component } from 'react'
import formStyles from './form.module.css'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'


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
        // post request with user information to log in and get a token

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
                
                localStorage.setItem('jwt', resp.token)
                store.dispatch({ type: "LOG_USER_IN", currentUser: resp.user, userProjects: resp.user.projects })
            } 

        })
    }


    render() {
        return (
            <div className={formStyles.container}>
                <div className={formStyles.form}>
                        <h4>Username</h4>
                        <input placeholder="username here.." name="username" value={this.state.username} onChange={(e) => this.fixState(e)}/>
                        <h4>Password</h4>
                        <input type="password" name="password" value={this.state.password} onChange={(e) => this.fixState(e)} placeholder="password here..."/>
                        {/* <button type="submit" >submit</button> */}
                </div>
                        <Button onClick={(e) => this.fetchUser(e)} circular icon="sign-in" />
            </div>
        )
    }
}

export default Login
