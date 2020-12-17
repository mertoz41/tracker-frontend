import React, { Component } from 'react'
import introStyles from './intro.module.css'
import Register from './register'
import Login from './login'


class Intro extends Component {
    state = {
        picked: false,
        showingLogin: false
    }
    toLogin = () =>{
        // state that displays login or register sections
        this.setState({picked: true, showing: 'login'})
    }

    render(){

    
    return (
        <div className={introStyles.container}>
            <div className={introStyles.choice}>
                <div className={introStyles.side} >
                    <div className={this.state.showingLogin ? introStyles.tab : introStyles.active} onClick={() => this.setState({showingLogin: false})}>
                    <h1>REGISTER</h1>
                    </div>
                    {this.state.showingLogin ? 
                    null
                    :
                    <Register toLogin={this.toLogin}/>
                    }

                </div>

                <div className={introStyles.side} >
                    <div className={this.state.showingLogin? introStyles.active : introStyles.tab} onClick={() => this.setState({showingLogin: true})}>
                    <h1>LOGIN</h1>
                    </div>
                    {this.state.showingLogin ?
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