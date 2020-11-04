import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import {withRouter} from 'react-router'



class Projects extends Component {

    nuProject = () =>{
        this.props.history.push('/newproject')
         console.log("to new project page")
     }
    
    render() {

    
    return (
        <div className={projectStyles.container}>
            <h1>All Projects</h1>
            <button onClick={() => this.nuProject()}>New Project</button>
                <h3>Hooper App</h3>
                <h3>Beatbox Bubble App</h3>
                <h3>Portfolio</h3>
        </div>
    )
}
}

export default withRouter(Projects)
