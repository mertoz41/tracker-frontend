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
        this.setState({
            picked: true,
            showing: 'registration'
        })
    }
    login = () => {
        this.setState({
            picked: true,
            showing: 'login'
        })
    }
    toLogin = () =>{
        this.setState({picked: true, showing: 'login'})
    }

    render(){

    
    return (
        <div className={introStyles.container}>
            <div className={introStyles.choice}>
                <div className={introStyles.side} >
                    <div className={this.state.showing == "registration" ? introStyles.active : introStyles.tab} onClick={() => this.register()}>
                    <h1>REGISTER</h1>
                    </div>
                    {this.state.showing == "registration" ? 
                    <Register toLogin={this.toLogin}/>
                    :
                    null
                    }

                </div>

                <div className={introStyles.side} >
                    <div className={this.state.showing == "login" ? introStyles.active : introStyles.tab} onClick={() => this.login()}>
                    <h1>LOGIN</h1>
                    </div>
                    {this.state.showing == "login" ?
                    <Login />
                    :
                    null
                    }
                            
                </div>

                    
            </div>
            
            {/* {this.state.showing == "registration" ?
            <Register toLogin={this.toLogin}/>
            : 
            null
            } */}
            

        </div>
    )
}
}

export default Intro