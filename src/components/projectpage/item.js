import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'


export class Item extends Component {
    state = {
        editing: false,
        textarea: ''
    }
    checkComplete = (obj) => {
        // patch request to update objective completion prop.
        obj.completed = !obj.completed 
        let updatedObj = {...obj}
        fetch(`http://localhost:3000/objectives/${updatedObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
        })
        .then(resp => resp.json())
        .then(resp => {
     
            store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
             
            // update shownStory.objectives array

        })
        
    }


    editObjective = (e, obj) =>{
        // patch request to update objectives description prop. 
        e.preventDefault()
        obj.description = this.state.textarea
        let updatedObj = {...obj}
        fetch(`http://localhost:3000/edittododesc/${updatedObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
        })
        .then(resp => resp.json())
        .then(resp => {
            store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
        })
        this.setState({editing: false, textarea: ''})

    }

    progressFunc = (obj) => {
        // patch request to update objectives progress prop.
        obj.in_progress = !obj.in_progress
        let updatedObj = {...obj}
         
        fetch(`http://localhost:3000/progress/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
        })
        .then(resp => resp.json())
        .then(resp => {
     
            store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
        })
    }
    deleteObjective = (obj) =>{
        // delete request to delete objective.
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => {
            // update shown story
            let shownStory = this.props.shownStory
            let filteredObjectives = shownStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            shownStory.objectives = filteredObjectives
            let updatedShownStory = {...shownStory}
            // update shown project
            let shownProject = this.props.shownProject
            let foundStory = shownProject.stories.find(story => story.id == shownStory.id)
            let index = shownProject.stories.indexOf(foundStory)
            let filteredStoryObjectives = foundStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            foundStory.objectives = filteredStoryObjectives
            shownProject.stories.splice(index,1, foundStory)
            let updatedShownProject = {...shownProject}
            

            store.dispatch({type: "DELETE_OBJECTIVE", shownStory: updatedShownStory, shownProject: updatedShownProject})
             
        })
        // update userProjects
    }

    render() {
        return (
            <div className={objectiveStyles.item}>
                                
                                {this.state.editing? 
                                <div className={objectiveStyles.edit}>
                                    <div><textarea placeholder={this.props.obj.description} value={this.state.textarea} onChange={(e) => this.setState({textarea: e.target.value})}/></div>
                                    <div><Button onClick={(e) => this.editObjective(e, this.props.obj)} circular icon="save outline"/></div>
                                </div>
                                    :
                                    <div className={objectiveStyles.left}>
                                    <h3>{this.props.obj.description}</h3>
                                    </div>
                                }
                                <div className={objectiveStyles.right}>
                                    <div onClick={() => this.progressFunc(this.props.obj)}><Button circular icon="hourglass outline"/></div>
                                    {this.props.obj.in_progress ?
                                    <div><Button onClick={() => this.checkComplete(this.props.obj)} /><h3>{this.props.obj.completed ? "close": "In progress"} </h3></div>
                                    : 
                                    <div><Button onClick={() => this.setState({editing: !this.state.editing})}circular icon="edit outline"/></div>
                                    }
                                    <div><Button onClick={() => this.deleteObjective(this.props.obj)} circular icon="trash alternate outline"/></div>
                                </div>
                              
                            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory
    }
}

export default connect(mapStateToProps)(Item)
