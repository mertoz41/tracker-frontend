import React, { useState } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'

const Objectives = ({stories, shownStory, setStories, setShownStory}) => {
    const [adding, setAdding] = useState(false)
    const [description, setDescription] = useState('')
    const [editing, setEditing] = useState(false)
    const [selectedObjective, setSelectedObjective] = useState(null)
    // console.log(shownStory)
 

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
            // 
            let foundStory = stories.find(stori => stori.id === shownStory.id)
            let index = stories.indexOf(foundStory)
            let filteredStories = stories.filter(stori => stori.id !== foundStory.id)

            let updatedStory = {...foundStory, objectives: [resp.objective, ...foundStory.objectives]}

            filteredStories.splice(index, 0, updatedStory)
            setStories(filteredStories)
            setShownStory(updatedStory)
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
        // only shown story needs to be updated
        let foundObj = shownStory.objectives.find(obje => obje.id === obj.id)
        let index = shownStory.objectives.indexOf(foundObj)
        let filteredObjectives = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedObjective = {...obj, description: description}
        filteredObjectives.splice(index, 0 ,updatedObjective)
        let updatedShownStory = {...shownStory, objectives: filteredObjectives}
        setShownStory(updatedShownStory)
        // patch request to update objectives description prop. 
        e.preventDefault()
        // obj.description = this.state.textarea
        // let updatedObj = {...obj}
        fetch(`http://localhost:3000/edittododesc/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description: description})
        })
        // .then(resp => resp.json())
        // .then(resp => {
        //     store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
        // })
        // this.setState({editing: false, textarea: ''})

    }

    const progressFunc = (obj) => {
        // only shown story needs to be updated
        let foundObjective = shownStory.objectives.find(obje => obje.id === obj.id)
        let updatedObjective = {...foundObjective, in_progress: true}
        let filteredObjectives = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedObjectives = [updatedObjective, ...filteredObjectives]
        setShownStory({...shownStory, objectives: updatedObjectives})
        // patch request to update objectives progress prop.
        // obj.in_progress = !obj.in_progress
        // let updatedObj = {...obj}
         
        // fetch(`http://localhost:3000/progress/${obj.id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(updatedObj)
        // })
        // .then(resp => resp.json())
        // .then(resp => {
     
        //     store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
        // })
    }
    const deleteObjective = (obj) =>{
        
        // update shown story
        let filteredObjs = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedShownStory = {...shownStory, objectives: filteredObjs}
        setShownStory(updatedShownStory)
        // update stories
        let foundStory = stories.find(stori => stori.id === shownStory.id)
        let index = stories.indexOf(foundStory)
        let filteredStories = stories.filter(stori => stori.id !== foundStory.id)
        filteredStories.splice(index, 0, updatedShownStory)
        setStories(filteredStories)
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "DELETE"
        })
    }

    const selectObjective = obj => {
        if (editing){
            setEditing(!editing)
        } else {
            setSelectedObjective(obj)
            setEditing(!editing)

        }
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
                {shownStory.objectives.map((obj,i) => {
                    return(
                        obj.in_progress?
                        null
                        :
                        <div key={i}>
                            <div className={objectiveStyles.item}>
                                
                                {editing && selectedObjective && selectedObjective.id === obj.id ? 
                                <div className={objectiveStyles.edit}>
                                    <div><textarea placeholder={obj.description}/></div>
                                    <div><Button onClick={(e) => editObjective(e, obj)} circular icon="save outline"/></div>
                                </div>
                                    :
                                    <div className={objectiveStyles.left}>
                                    <h3>{obj.description}</h3>
                                    </div>
                                }
                                <div className={objectiveStyles.right}>
                                    <div onClick={() => progressFunc(obj)}><Button circular icon="hourglass outline"/></div>
                                    {obj.in_progress ?
                                    <div><Button onClick={() => this.checkComplete(obj)} /><h3>{obj.completed ? "close": "In progress"} </h3></div>
                                    : 
                                    <div><Button onClick={() => setEditing(!editing)}circular icon="edit outline"/></div>
                                    }
                                    <div><Button onClick={() => deleteObjective(obj)} circular icon="trash alternate outline"/></div>
                                </div>
                              
                            </div>
                            
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
