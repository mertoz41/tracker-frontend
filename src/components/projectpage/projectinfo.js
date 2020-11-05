import React, { Component } from 'react'
import infoStyles from './projectinfo.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'

class Projectinfo extends Component {
    state ={
        description: ""
    }

    fixState = (e) =>{
        this.setState({description: e.target.value})
    }

    addDesc = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3000/projects/${this.props.shownProject.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(resp => {
            let updatedProject = resp.project
            let userProjects = store.getState().currentUser.projects
            let updatedUser = store.getState().currentUser
            let filtered = userProjects.filter(project => project.id !== resp.project.id)
            filtered.push(updatedProject)
            updatedUser.projects = filtered 
            store.dispatch({type: "ADD_DESCRIPTION", shownProject: updatedProject})
            store.dispatch({type: "UPDATE_ALL_PROJECTS", currentUser: updatedUser})
        })
        

    }

    render() {
        return (
            <div className={infoStyles.container}>
                <h1>project info experiment</h1>
                {this.props.shownProject.description ?
            <p>{this.props.shownProject.description}</p>
            :
            <div>

            <p>Add a description for this project.</p>
            <textarea onChange={(e) => this.fixState(e)} value={this.state.description} placeholder="project description" rows="5" cols="30"/>
            <button onClick={(e) => this.addDesc(e)}>Add</button>
            </div>
            }

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject
    }
}
export default connect(mapStateToProps)(Projectinfo)