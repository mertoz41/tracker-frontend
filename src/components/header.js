import React, { Component } from 'react'
import headerStyles from './header.module.css'
import store from '../redux/store'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import tabStyles from './hometabs.module.css'
import {Button} from 'semantic-ui-react'








export class Header extends Component {
    
    logOut = () =>{
        // to log user out
        store.dispatch({type: "LOG_USER_OUT"})
        localStorage.clear()
        this.props.history.push('/welcome')
        alert("logged out")
    }
    toProjects = () =>{
        // to display all projects
        store.dispatch({type: "CLEAN_PROJECT"})
        this.props.history.push('/')
    }

   
    render(){

    
    return (
        <div className={headerStyles.container}>
                <div className={headerStyles.header}>
                    <h1>Project Tracker</h1>
                    {this.props.currentUser ? 
                    <div>
                    
                    {this.props.shownProject ? 
                 
                    <div className={tabStyles.container}>
                        <div className={tabStyles.tabs}>
                            <div className={tabStyles.active}><h2>{this.props.shownProject.title}</h2></div>
                            <div className={tabStyles.project} onClick={() => this.toProjects()}><h2>All Projects</h2></div>
                        </div>
                    </div>
                    :
                    <div className={tabStyles.container}>
                        <div className={tabStyles.tabs}>
                            <div className={this.props.newProject ? tabStyles.tab : tabStyles.active} onClick={() => this.props.pageDisplay("all")}><h2>All Projects</h2></div>
                            <div className={this.props.newProject ? tabStyles.active : tabStyles.tab} onClick={() => this.props.pageDisplay("new")}><h2>New Project</h2></div>
                        </div>
                    </div>
                    }
                    </div>
                    :
                    null
                }
                    

                </div>
         
            {this.props.currentUser ? 
            <div className={headerStyles.buttons}>
                <h4>Hi, {this.props.currentUser.username}!</h4>
                <Button onClick={() => this.logOut()} circular icon="logout"/>
            </div>
            :
            null
            }
            
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return{
        shownProject: state.shownProject,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(withRouter(Header))
