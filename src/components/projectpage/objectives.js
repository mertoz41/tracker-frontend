import React, { useState } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'

const Objectives = ({objectives, shownStory}) => {
    const [adding, setAdding] = useState(false)
    const [description, setDescription] = useState('')
    const [editing, setEditing] = useState(false)

 

    const addObjective = (e) =>{
        // post request with new objective information. 
        e.preventDefault()
        let obj = {
            description: description,
            story_id: shownStory.id
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
            let updatedObjectives = [...objectives, resp.objective]

            store.dispatch({type: "UPDATE_OBJECTIVES", objectives: updatedObjectives})
            setAdding(false)
            setDescription('')
        })
    }

  
    const checkComplete = (obj) => {
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


    const editObjective = (e, obj) =>{
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

    const progressFunc = (obj) => {
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
    const deleteObjective = (obj) =>{
        // delete request to delete objective.
        
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => {
            // update shown story
            // let shownStory = this.props.shownStory
            // let filteredObjectives = shownStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            // shownStory.objectives = filteredObjectives
            // let updatedShownStory = {...shownStory}
            // // update shown project
            // let shownProject = this.props.shownProject
            // let foundStory = shownProject.stories.find(story => story.id == shownStory.id)
            // let index = shownProject.stories.indexOf(foundStory)
            // let filteredStoryObjectives = foundStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            // foundStory.objectives = filteredStoryObjectives
            // shownProject.stories.splice(index,1, foundStory)
            // let updatedShownProject = {...shownProject}
            

            // store.dispatch({type: "DELETE_OBJECTIVE", shownStory: updatedShownStory, shownProject: updatedShownProject})
             
        })
        // update userProjects
    }

    

    return (
        <div className={objectiveStyles.container}>
            <div className={objectiveStyles.header}>
                
            <div className={objectiveStyles.toadd}><h1 onClick={() => setAdding(!adding)}>{adding ? "Adding":"Add"}</h1></div>
           
                <div><h1> TO DOs</h1></div>
                
                <Button className={objectiveStyles.clear} onClick={() => store.dispatch({type: "CLEAR_STORY"})} circular icon="window close outline"/>
            </div>
            

          
            <div>
            {adding ?
            <div className={objectiveStyles.new}>
            <textarea placeholder="To-do goes here.." onChange={(e) => setDescription(e.target.value)} value={description} />
            <Button onClick={(e) => addObjective(e)} circular icon="plus"/>
            </div>
            :
            null
            }
            </div>
            

<div className={objectiveStyles.objectives}>
            <div>
                {shownStory.objectives.map(obj => {
                    return(
                        <div>
                            {obj.in_progress?
                            null
                            :
                            <div className={objectiveStyles.item}>
                                
                                {editing? 
                                <div className={objectiveStyles.edit}>
                                    <div><textarea placeholder={obj.description}/></div>
                                    <div><Button onClick={(e) => this.editObjective(e, obj)} circular icon="save outline"/></div>
                                </div>
                                    :
                                    <div className={objectiveStyles.left}>
                                    <h3>{obj.description}</h3>
                                    </div>
                                }
                                <div className={objectiveStyles.right}>
                                    <div onClick={() => this.progressFunc(obj)}><Button circular icon="hourglass outline"/></div>
                                    {obj.in_progress ?
                                    <div><Button onClick={() => this.checkComplete(obj)} /><h3>{obj.completed ? "close": "In progress"} </h3></div>
                                    : 
                                    <div><Button onClick={() => this.setState({editing: !editing})}circular icon="edit outline"/></div>
                                    }
                                    <div><Button onClick={() => deleteObjective(obj)} circular icon="trash alternate outline"/></div>
                                </div>
                              
                            </div>
                            }
                            
                        </div>
                    )
                })}
            </div>
            
            </div>
        </div>
    )
    
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects,
        // shownStory: state.shownStory,
        objectives: state.objectives
    }
}
export default connect(mapStateToProps)(Objectives)
