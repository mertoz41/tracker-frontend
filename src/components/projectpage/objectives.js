import React, { useState } from 'react'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'

const Objectives = ({stories, shownStory, setStories, setShownStory, deleteObjective, progressFunc}) => {
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



    const selectObjective = obj => {
        if (editing){
            setEditing(!editing)
        } else {
            setSelectedObjective(obj)
            setEditing(!editing)

        }
    }

    

    return (
        <div className='storiesContainer'>
            <div className="storiesHeader">
                
            <div><h1 onClick={() => setAdding(!adding)}>{adding ? "Adding":"Add"}</h1></div>
           
                <div><h1> TO DOs</h1></div>
                
                <div><Button onClick={() => setShownStory(null)} circular icon="window close outline"/></div>
            </div>
            

          
            <div>
            {adding ?
            <div>
            <textarea placeholder="To-do goes here.." onChange={(e) => setDescription(e.target.value)} value={description} />
            <Button onClick={(e) => addObjective(e)} circular icon="plus"/>
            </div>
            :
            null
            }
            </div>
            

<div>
            <div>
                {shownStory.objectives.map((obj,i) => {
                    return(
                        obj.in_progress || obj.completed?
                        null
                        :
                        <div key={i}>
                            <div className='item'>
                                
                                {editing && selectedObjective && selectedObjective.id === obj.id ? 
                                <div>
                                    <div><textarea placeholder={obj.description}/></div>
                                    <div><h3>edit</h3></div>
                                </div>
                                    :
                                    <div>
                                    <h3>{obj.description}</h3>
                                    </div>
                                }
                                <div>
                                    <div onClick={() => progressFunc(obj)}>
                                        <h3>add to progress</h3>
                                        </div>
                                    
                                    <div onClick={() => setEditing(!editing)}><h3>edit</h3></div>

                                    
                                    <div onClick={() => deleteObjective(obj)}><h3>delete</h3></div>

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
