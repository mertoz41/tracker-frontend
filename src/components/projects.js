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
            <ul>
                <li>Hooper app</li>
                <li>Beatbox Bubble app</li>
                <li>Porfolio</li>
            </ul>
           

            
        </div>
    )
}
}

export default withRouter(Projects)
