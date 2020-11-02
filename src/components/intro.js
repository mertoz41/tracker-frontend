import React, { Component } from 'react'
import introStyles from './intro.module.css'
import Register from './register'
import Login from './login'


class Intro extends Component {
    // class component because we will have state.
    state = {
        picked: false,
        showing: 'null'
    }

    register = () =>{
        console.log("attempt to register")
        this.setState({
            picked: true,
            showing: 'registration'
        })
    }
    login = () => {
        console.log("attempt to login")
        this.setState({
            picked: true,
            showing: 'login'
        })
    }
    render(){

    
    return (
        <div className={introStyles.container}>
            {this.state.picked ? 
            <div>experiment</div>
            :
            <div className={introStyles.choice}>
                <div className={introStyles.side} onClick={() => this.register()}>
                    <h1>REGISTER</h1>

                </div>

                <div className={introStyles.side} onClick={() => this.login()}>
                    <h1>LOGIN</h1>
                            
                </div>

                    
            </div>
            }
            {this.state.showing == "registration" ?
            <Register />
            : 
            null
            }
            {this.state.showing == "login" ?
            <Login />
            :
            null
            }

        </div>
    )
}
}

export default Intro