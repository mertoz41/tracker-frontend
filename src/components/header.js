import React, { Component } from 'react'
import store from '../redux/store'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'








const Header = ({history, currentUser, shownProject}) => {
    const logOut = () =>{
        // to log user out
        store.dispatch({type: "LOG_USER_OUT"})
        localStorage.clear()
        history.push('/welcome')
        alert("logged out")
    }
    const toProjects = () =>{
        // to display all projects
        store.dispatch({type: "CLEAN_PROJECT"})
        history.push('/')
    }

   
  

    
    return (
        <div className='appheader'>
                <div>
                    <div onClick={currentUser ? () => toProjects() : null}>
                        <h1>Project Tracker</h1>

                    </div>
    

                </div>
                <div>
                {shownProject ? 
                    <h2>{shownProject.title}</h2>
                    :
                    null
                }
                </div>
            <div>

            {currentUser ? 
            <div onClick={() => logOut()} className='logoutButton'>
                <h4>log out</h4>
            </div>
            :
            null
        }
            </div>
            
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return{
        shownProject: state.shownProject,
        currentUser: state.currentUser,
        
    }
}

export default connect(mapStateToProps)(withRouter(Header))
