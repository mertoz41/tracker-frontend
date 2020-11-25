import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'


export class DifItem extends Component {
    state = {
        editing: false,
        textarea: ''
    }
    checkComplete = (obj) => {
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
            this.checkStory()
            // update shownStory.objectives array

        })
        
    }

    checkStory = () =>{
        let shownStory = this.props.shownStory
        let userProjects = this.props.userProjects
        let completedTodos = shownStory.objectives.filter(obj => obj.completed)
        if (completedTodos.length == shownStory.objectives.length && shownStory.completed == false){
            shownStory.completed = true
            let updatedStory = {...shownStory}
            this.fetchStory(updatedStory)


    //         // fetch to mark story complete

           
        } else if (completedTodos.length !== shownStory.objectives.length && shownStory.completed == true){
            shownStory.completed = false
            let updatedStory = {...shownStory}
            this.fetchStory(updatedStory)

    //         // fetch to mark story incomplete 
        }
        
    }

    fetchStory = (story) =>{
        fetch(`http://localhost:3000/compstory/${story.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(story)
            })
            .then(resp => resp.json())
            .then(resp => {
                let shownProject = this.props.shownProject
                let index = shownProject.stories.indexOf(shownProject.stories.find(stori => stori.id == resp.updated_story.id))
                shownProject.stories.splice(index, 1, resp.updated_story)
                let updatedProject = {...shownProject}
            store.dispatch({type: "UPDATE_STORY", shownStory: resp.updated_story})
            store.dispatch({type: "UPDATE_PROJECT", shownProject: updatedProject})
                

        })
    }




    editObjective = (e, obj) =>{
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
        // delete fetch
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
            <div className={this.props.obj.completed ? objectiveStyles.complete : objectiveStyles.working}>
                                
                                {this.state.editing? 
                                <div>
                                    <textarea placeholder={this.props.obj.description} value={this.state.textarea} onChange={(e) => this.setState({textarea: e.target.value})}/>
                                    <button onClick={(e) => this.editObjective(e, this.props.obj)}>edit</button>
                                </div>
                                    :
                                    <div className={objectiveStyles.left}>
                                    <h3>{this.props.obj.description}</h3>
                                    </div>
                                }
                                <div className={objectiveStyles.right}>
                                    {this.props.for == "completed" ?
                                    null
                                    :
                                    <div onClick={() => this.progressFunc(this.props.obj)}><Button circular icon="hourglass end"/></div>
                                    }
                                    {this.props.obj.in_progress ?
                                    <div><Button onClick={() => this.checkComplete(this.props.obj)} circular icon={this.props.obj.completed ? "close": "checkmark"} /></div>
                                    : 
                                    <div><Button onClick={() => this.setState({editing: !this.state.editing})}circular icon="edit outline"/></div>
                                    }
                                    <div><Button onClick={() => this.deleteObjective(this.props.obj)} circular icon="trash alternate outline"/></div>
                                </div>
                              
                            </div>
        )
    }
} 

const mapStateToProps = (state) =>{
    return{
        shownStory: state.shownStory,
        userProjects: state.userProjects,
        shownProject: state.shownProject
    }
}

export default connect(mapStateToProps)(DifItem)
