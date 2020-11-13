import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'


class Objectives extends Component {
    
    state = {
        description: '',
        adding: false
    }
    fixDesc = (e) => {
        this.setState({description: e.target.value})
    }

    addObjective = (e) =>{
        e.preventDefault()
        let obj = {
            description: this.state.description,
            story_id: this.props.shownStory.id
        }
        fetch('http://localhost:3000/objectives', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(resp => {
            // shownStory adjustment
            let shownStory = this.props.shownStory
            shownStory.objectives.push(resp.objective)
            let updatedShownStory = {...shownStory}
             
            store.dispatch({type: "ADD_OBJECTIVE", shownStory: updatedShownStory})

        })
        this.setState({adding: !this.state.adding, description: ''})
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
            // completed is being changed
            let shownStory = this.props.shownStory
            let objIndex = shownStory.objectives.indexOf(shownStory.objectives.find(obj => obj.id == resp.updated_objective.id))
            shownStory.objectives.splice(objIndex, 1, resp.updated_objective)
            let updatedShownStory = {...shownStory}
            store.dispatch({type: "UPDATE_OBJ_COMPLETED", shownStory: updatedShownStory})
             
            // update shownStory.objectives array

        })
        
    }

    addToProgress = (obj) => {
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
            let shownStory = this.props.shownStory
            let objIndex = shownStory.objectives.indexOf(shownStory.objectives.find(obj => obj.id == resp.updated_objective.id))
            shownStory.objectives.splice(objIndex, 1, resp.updated_objective)
            let updatedShownStory = {...shownStory}
            store.dispatch({type: "UPDATE_OBJ_PROGRESS", shownStory: updatedShownStory})
        })
    }

    render(){
         
    return (
        <div className={objectiveStyles.container}>
            <div className={objectiveStyles.header}>
                <h1>OBJECTIVES</h1>
                <h2>{this.props.shownStory ? this.props.shownStory.description : "PICK A STORY"}</h2>
                <h1 className={this.state.adding ? objectiveStyles.adding : objectiveStyles.add } onClick={() => this.setState({adding: !this.state.adding})}>Add</h1>
            </div>
            

            {this.props.shownStory ?
            

            <div>
            {this.state.adding ?
            <div>
            <textarea placeholder="objective description goes here" onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <button onClick={(e) => this.addObjective(e)}>add</button>
            </div>
            :
            null
            }
            </div>
            :
            null
            }   


            
            {this.props.shownStory ? 
            <div className={objectiveStyles.objectives}>
                {this.props.shownStory.objectives.map(obj => {
                    return(
                        <div>
                            {obj.in_progress?
                            null
                            :
                            <div className={objectiveStyles.objective}>
                                <p>{obj.description}</p>
                                <p onClick={() => this.addToProgress(obj)}>{obj.in_progress ? "in progress" : "not in progress"}</p>
                                <div onClick={() => this.checkComplete(obj)} className={ obj.completed ? objectiveStyles.status : objectiveStyles.notcomp}/>
                                <Button onClick={() => this.deleteObjective(obj)} circular icon="trash"/>
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
            :
            <p>No objectives for this story</p>  
            }
        </div>
    )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects,
        shownStory: state.shownStory
    }
}
export default connect(mapStateToProps)(Objectives)
