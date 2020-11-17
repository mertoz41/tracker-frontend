import React, { Component } from 'react'
import projectStyles from './projects.module.css'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import store from '../redux/store'
import ProjectCard from './projectcard'



class Projects extends Component {
   



    
    render() {

    
    return (
        <div className={projectStyles.container}>
            <h1>All Projects</h1>
            {this.props.userProjects.map(project => {
                return (
                    <ProjectCard id={project.id} project={project} />
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
