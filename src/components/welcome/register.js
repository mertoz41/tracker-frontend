import React, { Component } from 'react'
import formStyles from './form.module.css'
import {Button} from 'semantic-ui-react'

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
        // post request with user account
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
                <div className={formStyles.form}>
                        <h4>Username</h4>
                        <input placeholder="username here" name="username" value={this.state.username} onChange={(e) => this.fixState(e)}/>
                        <h4>Password</h4>
                        <input type="password" name="password" value={this.state.password} onChange={(e) => this.fixState(e)} placeholder="password here"/>
                        <h4>Confirm Password</h4>
                        <input type="password" name="check" value={this.state.check} onChange={(e) => this.fixState(e)} placeholder="confirm password here"/>
                        {/* <button type="submit" >submit</button> */}
                        
                    {/* <div className={formStyles.buttons}>  */}
                    {/* </div> */}
                </div>
                   <Button onClick={(e) => this.createUser(e)} circular icon="save outline" />
            </div>
        )
    }
}

export default Register
