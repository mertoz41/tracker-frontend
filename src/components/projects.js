import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import {withRouter} from 'react-router'



class Projects extends Component {

    nuProject = () =>{
        this.props.history.push('/newproject')
         console.log("to new project page")
     }

    toProject = (project) =>{
        this.props.history.push(`/projects/${project}`)
    }
    
    render() {

    
    return (
        <div className={projectStyles.container}>
            <h1>All Projects</h1>
            <button onClick={() => this.nuProject()}>New Project</button>
                <h3 onClick={() => this.toProject('hooper-app')}>Hooper App</h3>
                <h3 onClick={() => this.toProject('beatbox-bubble-app')}>Beatbox Bubble App</h3>
                <h3 onClick={() => this.toProject('portfolio')}>Portfolio</h3>
        </div>
    )
}
}

export default withRouter(Projects)
