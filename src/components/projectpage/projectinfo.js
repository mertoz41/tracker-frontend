import React, { Component } from 'react'
import infoStyles from './projectinfo.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'

class Projectinfo extends Component {
    state ={
        description: "",
        edit: false,
        editing: this.props.shownProject.description
    }

    fixDescription = (e) =>{
        this.setState({description: e.target.value})
    }

    edit = (e, desc) =>{
        e.preventDefault()
        let obj ={
            description: desc
        }

        fetch(`http://localhost:3000/projects/${this.props.shownProject.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(resp => {
            //   update list: project description inside userProjects, shownProject 
            let userProjects = this.props.userProjects
            let updatedUserProjects = userProjects.filter(proj => proj.title !== resp.project.title)
            updatedUserProjects.push(resp.project)
            store.dispatch({type: "UPDATED_PROJECT_DESCRIPTION", shownProject: resp.project, userProjects: updatedUserProjects})
        })
        if (this.state.edit){
            this.setState({edit: false})
        }

    }

    fixEdit = (e) =>{
        this.setState({editing: e.target.value})
    }

   

    render() {
        return (
            <div className={infoStyles.container}>
                <h1>project info experiment</h1>
                {this.props.shownProject.description ?
                <div>
                    <p>{this.props.shownProject.description}</p>
                    {this.state.edit ?
                    <div>
                    <textarea onChange={(e) => this.fixEdit(e)} value={this.state.editing} placeholder={this.props.shownProject.description}/>
                    <button onClick={(e) => this.edit(e, this.state.editing)}>Submit</button>
                    </div>
                    :
                    <button onClick={() => this.setState({edit: true})}>Edit</button>
                    }

                </div>
            :
            <div>

            <p>Add a description for this project.</p>
            <textarea onChange={(e) => this.fixDescription(e)} value={this.state.description} placeholder="project description" rows="5" cols="30"/>
            <button onClick={(e) => this.edit(e, this.state.description)}>Add</button>
            </div>
            }

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects
    }
}
export default connect(mapStateToProps)(Projectinfo)