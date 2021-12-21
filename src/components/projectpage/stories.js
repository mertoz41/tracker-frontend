import React, { useState } from 'react'
import store from '../../redux/store'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

const Stories = ({stories, shownProject, setStories, setShownStory, shownStory}) => {
    const [newStory, setNewStory] = useState(false)
    const [description, setDescription] = useState('')
    const [storiEdit, setStoriEdit] = useState('')
    const [editing, setEditing] = useState('')
    const [selectedStory, setSelectedStory] = useState(null)

    const createStory = (e) => {
        // post request for creating a new story for a project.
        e.preventDefault()
        fetch('http://localhost:3000/stories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description: description, project_id: shownProject.id})
        })
        .then(resp => resp.json())
        .then(resp => {
            let updatedStories = [resp.new_story, ...stories]
            setStories(updatedStories)
            setNewStory(false)
            setDescription('')
    
        })
    }
    const displayStory = (story) =>{
        setShownStory(story)
    
    }
    // const getPercentage = (story) => {
    //     // story completion percentage calculation.
    //     if (story.objectives.length > 0){
    //         let completedObjs = story.objectives.filter(obj => obj.completed)
    //         if (completedObjs.length == story.objectives.length){
    //             // call this function in two cases: 1) when all todos are completed to patch story completed, 2) when theres an incomplete todo and story is completed
    //         }
            
            

    //         return Math.trunc(completedObjs.length / story.objectives.length * 100 ) + "%"
    //     } else {
    //         return "0%"
    //     }
         
    // }
    const editStory = (story, desc) =>{
        let foundStori = stories.find(stori => stori.id === story.id)
        let index = stories.indexOf(foundStori)
        let filteredStories = stories.filter(stori => stori.id !== story.id)
        let updatedStori = {...foundStori, description: desc}
        filteredStories.splice(index, 0, updatedStori)
        setStories(filteredStories)
        setEditing(!editing)
        setStoriEdit('')
        
        fetch(`http://localhost:3000/stories/${story.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description: desc})
        })

    }
    const deleteStory = (story) => {

        let updatedStories = stories.filter(stori => stori.id !== story.id)
        setStories(updatedStories)
        if (shownStory.id == story.id){
            setShownStory(null)
        }


        fetch(`http://localhost:3000/stories/${story.id}`,{
            method: "DELETE"
        })

    }

   const selectStory = stori => {
        setEditing(!editing)
        setSelectedStory(stori)
    }

 

        return (
            <div className='sectionContainer'>
                <div className='storiesHeader'>
                    <div><h1 onClick={() => setNewStory(!newStory)}>{newStory ? "Adding":"New"}</h1></div>
                    <div><h1>BACKLOGS</h1></div>
                    <div></div>
                </div>

                {newStory ?
                    <div>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="new backlog goes here..."/>
                        <Button onClick={(e) => createStory(e)} circular icon="plus"/>
                    </div>
                :
                null
                }
                <div>
                    {stories.length ? 
                
                        stories.map((story, i) => {
                            return(
                                <div className={shownStory && shownStory.id == story.id ? "selectedStory" : "story"} key={i} id={story.id}>
                                    <div className='descriptionSide'>
                                        {editing && selectedStory && selectedStory.id == story.id?
                                        <div >
                                            <textarea className='storiEdit' placeholder={story.description} value={storiEdit} onChange={(e) => setStoriEdit(e.target.value)}/>
                                            <div onClick={() => editStory(story, storiEdit)}><h3>save</h3></div>
                                            </div>
                                            :
                                            <p onClick={() => displayStory(story)}>{story.description}  </p>
                                    }
                                    </div>
                                    

                                    
                                    <div>
                                    <div><h4>{story.objectives.length} items</h4></div>
                                    {shownStory && shownStory.id == story.id  ? 
                                    <div>
                                        <div onClick={() => selectStory(story)}><h3>{editing ? 'editing' : 'edit'}</h3></div>

                                        <div onClick={() => deleteStory(story)}><h3>delete</h3></div>
                                    </div>

                                    :
                                    null
                                    }
                                    {/* <div><h4>{this.getPercentage(story)} complete</h4></div> */}

                                    </div>
            
                                  
                                
            </div>
                                )
                                })
                        :
                        null
                    }
                </div>
            </div>
        )
    
}
const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects,
    }
}

export default connect(mapStateToProps)(Stories)
