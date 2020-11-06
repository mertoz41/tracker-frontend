import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import store from '../redux/store'



class Projects extends Component {

    nuProject = () =>{
        this.props.history.push('/new-project')

     }

    toProject = (project) =>{
        let projects = store.getState().userProjects
        let foundProject = projects.find(proj => proj.title == project)
        store.dispatch({type: "SHOW_PROJECT", shownProject: foundProject})
        this.props.history.push(`/projects/${project}`)
    }
    
    render() {

    
    return (
        <div className={projectStyles.container}>
            <h1>All Projects</h1>
            <button onClick={() => this.nuProject()}>New Project</button>
            {this.props.userProjects.map(project => {
                return (
                <h3 onClick={() => this.toProject(`${project.title}`)}>{project.title}</h3>
                )
            })}
               
                
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser,
        userProjects: state.userProjects
    }
}

export default connect(mapStateToProps)(withRouter(Projects))
