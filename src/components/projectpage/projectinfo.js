import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'


class Projectinfo extends Component {
    state ={
        description: "",
        edit: false,
        editing: this.props.shownProject.description
    }

    fixDescription = (e) =>{
        // controlled form to add a description to a project.
        this.setState({description: e.target.value})
    }

    edit = (e, desc) =>{
        // patch request to edit project description.
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
            let shownProject = this.props.shownProject
            shownProject.description = resp.project.description
            let updatedUserProjects = userProjects.filter(proj => proj.title !== resp.project.title)
            updatedUserProjects.push(resp.project)
            store.dispatch({type: "UPDATED_PROJECT_DESCRIPTION", shownProject: shownProject, userProjects: updatedUserProjects})
        })
        if (this.state.edit){
            this.setState({edit: false})
        }

    }

    fixEdit = (e) =>{
        // state that updates existing project description.
        this.setState({editing: e.target.value})
    }

   

    render() {
        return (
            <div>
             
                <div>
                <div><Button onClick={() => this.setState({edit: !this.state.edit})}circular icon="edit outline"/></div>


                
                {this.props.shownProject.description ?
                <div>
                    
                    {this.state.edit ?
                    <div>
                    <textarea onChange={(e) => this.fixEdit(e)} value={this.state.editing} placeholder={this.props.shownProject.description}/>
                    <Button onClick={(e) => this.edit(e, this.state.editing)} circular icon="save outline"/>
                    </div>
                    :
                    <div>
                    
                        <p>{this.props.shownProject.description}</p>
                    </div>
                    
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