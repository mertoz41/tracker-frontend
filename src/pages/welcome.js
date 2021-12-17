import React, {useState} from 'react'
import Header from '../components/header'
import {withRouter} from 'react-router'

import store from '../redux/store'
const Welcome = ({history}) => {
// export class Welcome extends Component {
    const [showLogin, setShowLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    

    const submitForm = () => {
        if (showLogin){
            // check if good
            if (username.length > 3 && password.length > 4){
            fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.message){
                alert(resp.message)
            
            } else {
                
                localStorage.setItem('jwt', resp.token)
                store.dispatch({ type: "LOG_USER_IN", currentUser: resp.user, userProjects: resp.user.projects })
                history.push('/')
            } 

        })
        } else {
            alert('credentials invalid')
        }
        } else {
            // register
            if (username.length > 3 && password.length > 4 && password == passwordConfirm){
            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, password: password})
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.message){
                    alert(resp.message)
                } else {
                    alert('Success!')
                    setPassword('')
                    setPasswordConfirm('')
                    setShowLogin(true)
                }
            })
            } else {
                alert('credentials invalid')
            }
        }
    }
        return (
            <div>
                <Header />
                {/* <Intro/> */}
                <div className='inputSect'>
                    <div className='inputHeader'>
                        <div className={showLogin ? 'selectedheaderButton' : 'headerButton'} onClick={() => setShowLogin(true)}>
                            <h2>Login</h2>
                        </div>
                        <div className={!showLogin ? 'selectedheaderButton' : 'headerButton'} onClick={() => setShowLogin(false)}>
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                {showLogin ?
                <div className='form'>
                        <h4>Username</h4>
                        <input placeholder="username here.." name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <h4>Password</h4>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password here..."/>
                </div>
                :

                <div className='form'>
                        <h4>Username</h4>
                        <input placeholder="username here" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <h4>Password</h4>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password here"/>
                        <h4>Confirm Password</h4>
                        <input type="password" name="check" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="confirm password here"/>
                    
                </div>
                }
                <div className='submitbutton' onClick={() => submitForm()}>
                            <h2>{showLogin ? 'login' : 'sign up'}</h2>
                    </div>
                </div>
                
            </div>
        )
    
}

export default withRouter(Welcome)
