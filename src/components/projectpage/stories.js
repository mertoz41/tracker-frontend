import React, { useState } from 'react'
import storyStyles from './stories.module.css'
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
            // updateStories
            // let shownProject = this.props.shownProject
            // let stories = shownProject.stories
            // stories.push(resp.new_story)
            // shownProject.stories = stories

            // let updatedShownProject = {...shownProject}

            // store.dispatch({type: "ADD_STORY", shownProject: updatedShownProject})
        })
        // this.setState({description: "", newStory: false})
    }
    const displayStory = (story) =>{
        setShownStory(story)
        // dispatch action to display selected story.
        // sort objectives, inprogress and completed here
        // let objectives = story.objectives.filter(obj => !obj.completed && !obj.in_progress)
        // let progress = story.objectives.filter(obj => obj.in_progress)
        // let completed = story.objectives.filter(obj => obj.completed)
        // store.dispatch({type: "SHOW_STORY", shownStory: story, objectives: objectives, progressObjects: progress, completedObjects: completed}) 
    }
    const getPercentage = (story) => {
        // story completion percentage calculation.
        if (story.objectives.length > 0){
            let completedObjs = story.objectives.filter(obj => obj.completed)
            if (completedObjs.length == story.objectives.length){
                // call this function in two cases: 1) when all todos are completed to patch story completed, 2) when theres an incomplete todo and story is completed
            }
            
            

            return Math.trunc(completedObjs.length / story.objectives.length * 100 ) + "%"
        } else {
            return "0%"
        }
         
    }
    const editStory = (story, desc) =>{
        let foundStori = stories.find(stori => stori.id === story.id)
        let index = stories.indexOf(foundStori)
        let filteredStories = stories.filter(stori => stori.id !== story.id)
        let updatedStori = {...foundStori, description: desc}
        filteredStories.splice(index, 0, updatedStori)
        setStories(filteredStories)
        setEditing(!editing)
        setStoriEdit('')
        // update stories
        // patch request with updated story description.
        // // e.preventDefault()
        // story.description = this.state.textarea
        // let updatedStory = {...story}
        fetch(`http://localhost:3000/stories/${story.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description: desc})
        })
        // .then(resp => resp.json())
        // .then(resp =>{
        //     // let shownProject = this.props.shownProject
        //     // let index = shownProject.stories.indexOf(shownProject.stories.find(story => story.id == resp.updated_story.id))
        //     // shownProject.stories.splice(index, 1, resp.updated_story)
        //     // let updatedShownProject = {...shownProject}
        //     // store.dispatch({type: "UPDATE_STORY", shownProject: updatedShownProject})


        //     // update shownProject
        //     // update shownStory if its on display


        // })
        // this.setState({editing: false, textarea: ''})
    }
    const deleteStory = (story) => {
        // fetch to erase story
        // if shownStory is the deleted one, clear objectives section 
        
        if (story.id == this.props.shownStory.id) {
            store.dispatch({type: "CLEAR_STORY"})
        }

        fetch(`http://localhost:3000/stories/${story.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => {
            // update shown project
            let shownProject = this.props.shownProject
            let filteredStories = shownProject.stories.filter(story => story.id !== resp.deleted_story.id)
            shownProject.stories = filteredStories
            let updatedProject = {...shownProject}

            // update userProjects
            let userProjects = this.props.userProjects
            let found = userProjects.find(project => project.title == shownProject.title)
            let index = userProjects.indexOf(found)
            found.stories = filteredStories
            userProjects.splice(index, 1, found)

            let updatedUserProjects = [...userProjects]

        
            store.dispatch({type: "DELETE_STORY", shownProject: updatedProject, userProjects: updatedUserProjects})
        })
    }

   const selectStory = stori => {
        setEditing(!editing)
        setSelectedStory(stori)
    }

 

        return (
            <div className='storiesContainer'>
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
                                <div className={shownStory && shownStory.id == story.id ? "selectedStory" : "story"} id={i}>
                <div  id={story.id}>
                                    <div>
                                    {editing && selectedStory && selectedStory.id == story.id?
                                    <div >
                                        <textarea placeholder={story.description} value={storiEdit} onChange={(e) => setStoriEdit(e.target.value)}/>
                                        <div onClick={() => editStory(story, storiEdit)}><h3>save</h3></div>
                                        {/* <Button circular icon="save outline"/> */}
                                        </div>
                                        :
                                        <h3 onClick={() => displayStory(story)}>{story.description}  </h3>
                                }
                                    
                                    </div>
                                    <div>

                                    
                                    <div>
                                    <div><h4>{story.objectives.length} items</h4></div>
                                    {/* <div><h4>{this.getPercentage(story)} complete</h4></div> */}
                                    </div>
                                    <div >

                                    
                                    {shownStory && shownStory.id == story.id  ? 
                                    <div>
                                        <div onClick={() => selectStory(story)}><h3>{editing ? 'editing' : 'edit'}</h3></div>

                                        <div><h3>delete</h3></div>
                                    </div>

                                    :
                                    null
                                    }
                                    </div>
                                    </div>
                                  
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
