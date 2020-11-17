import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import store from '../redux/store'

export class Projectcard extends Component {
    state = {
        isHovering: false
    }
    toProject = (project) =>{
        let projects = store.getState().userProjects
        let foundProject = projects.find(proj => proj.title == project)
        store.dispatch({type: "SHOW_PROJECT", shownProject: foundProject})
        this.props.history.push(`/projects/${project}`)
    }
    render() {
        return (
            <div className={projectStyles.card} onClick={() => this.toProject(`${this.props.project.title}`)} onMouseEnter={() => this.setState({isHovering: true})} onMouseLeave={() => this.setState({isHovering: false})}>
                        <h3>{this.props.project.title}</h3>
                        {this.state.isHovering ?
                        <button>erase</button>
                        :
                        null   
                        }
                        <p>{this.props.project.description}</p>
                        <p>overall percentage</p>
            </div>
        )
    }
}

export default Projectcard
