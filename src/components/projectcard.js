import React, { Component } from 'react'
import store from '../redux/store'
import {withRouter} from 'react-router'
import {Button} from 'semantic-ui-react'



export class Projectcard extends Component {
    state = {
        isHovering: false
    }
    toProject = (project) =>{
        // redirected to selected projects page.
        
        let name = project.title.split('').filter(letter => letter !== " ").join('')
        let projects = store.getState().userProjects
        let foundProject = projects.find(proj => proj.title == project.title)
        store.dispatch({type: "SHOW_PROJECT", shownProject: foundProject})
        this.props.history.push(`/projects/${name}`)
    }

    deleteProject = (project) => {
        // deletes the project.

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
        // project completion percentage calculation. 

        if (project.stories.length > 0){
            let completedBacklogs = project.stories.filter(stori => stori.completed)
            return Math.trunc(completedBacklogs.length / project.stories.length * 100) + "%"
        } else {
            return "0%"
        }
        
    }
    render() {
        return (
            <div className='card'  onMouseEnter={() => this.setState({isHovering: true})} onMouseLeave={() => this.setState({isHovering: false})}>
                        <h2 onClick={() => this.toProject(this.props.project)}>{this.props.project.title} </h2>
                        <h3>{this.getPercentage(this.props.project)}</h3>
                        <div>
                        {this.state.isHovering ?
                        <Button onClick={() => this.deleteProject(this.props.project)} circular icon="trash alternate outline" />
                        :
                        null   
                        }

                        </div>
            </div>
        )
    }
}

export default withRouter(Projectcard)
