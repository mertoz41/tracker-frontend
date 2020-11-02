import React, { Component } from 'react'

export class Login extends Component {
    componentDidMount(){
        console.log("why isnt this being mounted")
    }
    render() {
        return (
            <div>
                LOGIN PAGE EXPERIMENTING ONLY
                <button onClick={this.props.experiment}>
                    click here 
                </button>
            </div>
        )
    }
}

export default Login
