import React, { Component } from 'react'
import formStyles from './form.module.css'

export class Register extends Component {
    state ={
        username: "",
        password: "",
        check: ""
    }

    fixState = (e) =>{
        // controlled form
        let name = e.target.name
        let value = e.target.value
        this.setState({[name]: value})
    }

    createUser = (e) => {
        e.preventDefault()
        if (this.state.password == this.state.check){
            fetch('http://localhost:3000/users', {
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
                } else {
                    alert('Success!')
                    this.props.toLogin()
                    // redirect to login
                }
            })
        } else {
            alert("Passwords do not match")
            this.setState({ username: "", password: "", check: ""})
        }

    }



    render() {
        return (
            <div className={formStyles.container}>
                REGISTER EXPERIMENT
                <div className={formStyles.form}>
                    <form onSubmit={e => this.createUser(e)}>
                        <label>Username</label>
                        <input placeholder="here.." name="username" value={this.state.username} onChange={(e) => this.fixState(e)}/>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={(e) => this.fixState(e)} placeholder="password goes here"/>
                        <label>Retype Password</label>
                        <input type="password" name="check" value={this.state.check} onChange={(e) => this.fixState(e)} placeholder="retype password goes here"/>
                        <button type="submit" >submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register
