import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import store from '../redux/store'
import {withRouter} from 'react-router'


export class Projectcard extends Component {
    state = {
        isHovering: false
    }
    toProject = (project) =>{
        
        // eliminate spaces
        let name = project.title.split('').filter(letter => letter !== " ").join('')
        // "ProjectTracker"
        let projects = store.getState().userProjects
        let foundProject = projects.find(proj => proj.title == project.title)
        store.dispatch({type: "SHOW_PROJECT", shownProject: foundProject})
        this.props.history.push(`/projects/${name}`)
    }

    deleteProject = (project) => {
        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => {
            let userProjects = store.getState().userProjects
            let filtered = userProjects.filter(proj => proj.id !== resp.deleted_project.id)
            let updatedProjects = [...filtered]
            store.dispatch({type: "UPDATE_ALL_PROJECTS", userProjects: updatedProjects})
            // only userProjects handled, not projects in currentuser 
        })

    }

    getPercentage = (project) =>{
        if (project.stories.length > 0){
            let completedBacklogs = project.stories.filter(stori => stori.completed)
            return Math.trunc(completedBacklogs.length / project.stories.length * 100) + "%"
        } else {
            return "0%"
        }
        
    }
    render() {
        return (
            <div className={projectStyles.card}  onMouseEnter={() => this.setState({isHovering: true})} onMouseLeave={() => this.setState({isHovering: false})}>
                        <h3 onClick={() => this.toProject(this.props.project)}>{this.props.project.title} </h3>
                        <p>overall percentage</p>
                        <p>{this.getPercentage(this.props.project)}</p>
                        {this.state.isHovering ?
                        <button onClick={() => this.deleteProject(this.props.project)}>erase</button>
                        :
                        null   
                        }
            </div>
        )
    }
}

export default withRouter(Projectcard)
