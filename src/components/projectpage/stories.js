import React, { Component } from 'react'
import storyStyles from './stories.module.css'
import store from '../../redux/store'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

export class Stories extends Component {
    state = {
        description: "",
        newStory: false
    }

    createStory = (e) => {
        // post request for creating a new story for a project.
        e.preventDefault()
        let projectID = this.props.shownProject.id
        fetch('http://localhost:3000/stories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({description: this.state.description, project_id: projectID})
        })
        .then(resp => resp.json())
        .then(resp => {
            let shownProject = this.props.shownProject
            let stories = shownProject.stories
            stories.push(resp.new_story)
            shownProject.stories = stories

            let updatedShownProject = {...shownProject}

            store.dispatch({type: "ADD_STORY", shownProject: updatedShownProject})
        })
        this.setState({description: "", newStory: false})
    }
    displayStory = (story) =>{
        // dispatch action to display selected story.
        // sort objectives, inprogress and completed here
        let objectives = story.objectives.filter(obj => !obj.completed && !obj.in_progress)
        let progress = story.objectives.filter(obj => obj.in_progress)
        let completed = story.objectives.filter(obj => obj.completed)
        store.dispatch({type: "SHOW_STORY", shownStory: story, objectives: objectives, progressObjects: progress, completedObjects: completed}) 
    }
    getPercentage = (story) => {
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
    editStory = (e, story) =>{
        // patch request with updated story description.
        e.preventDefault()
        story.description = this.state.textarea
        let updatedStory = {...story}
        fetch(`http://localhost:3000/stories/${updatedStory.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStory)
        })
        .then(resp => resp.json())
        .then(resp =>{
            let shownProject = this.props.shownProject
            let index = shownProject.stories.indexOf(shownProject.stories.find(story => story.id == resp.updated_story.id))
            shownProject.stories.splice(index, 1, resp.updated_story)
            let updatedShownProject = {...shownProject}
            store.dispatch({type: "UPDATE_STORY", shownProject: updatedShownProject})


            // update shownProject
            // update shownStory if its on display


        })
        this.setState({editing: false, textarea: ''})
    }
    deleteStory = (story) => {
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

 

    render() {
        return (
            <div className={storyStyles.container}>
                <div className={storyStyles.header}>

                    <div className={storyStyles.toadd}><h1 onClick={() => this.setState({newStory: !this.state.newStory})}>{this.state.newStory ? "Adding":"Add"}</h1></div>
                    
                    
                    <div><h1>BACKLOGS</h1></div>
                </div>
                    {this.state.newStory ?
                        <div className={storyStyles.new}>
                            <textarea onChange={(e) => this.setState({description: e.target.value})} value={this.state.description} placeholder="new backlog goes here..."/>
                            <Button onClick={(e) => this.createStory(e)} circular icon="plus"/>
                        </div>
                    :
                    null
                    }
                
                <div className={storyStyles.stories}>
                    {this.props.shownProject.stories ? 
                    
                        this.props.shownProject.stories.map((story, i) => {
                            return(
                                <div id={i}>
                <div className={this.props.shownStory && this.props.shownStory.id == story.id ? storyStyles.active : storyStyles.story} id={story.id}>
                                    <div className={storyStyles.words}>
                                    {this.state.editing && this.props.shownStory.id == story.id?
                                    <div className={storyStyles.edit}>
                                        <textarea placeholder={story.description} value={this.state.textarea} onChange={(e) => this.setState({textarea: e.target.value})}/>
                                        <Button onClick={(e) => this.editStory(e, story)} circular icon="save outline"/>
                                    </div>
                                    :
                                    <h3 onClick={() => this.displayStory(story)}>{story.description}  </h3>
                                    }
                                    
                                    </div>
                                    <div className={storyStyles.bottom}>

                                    
                                    <div className={storyStyles.left}>
                                    <div><h4>{story.objectives.length} items</h4></div>
                                    <div><h4>{this.getPercentage(story)} complete</h4></div>
                                    </div>
                                    <div className={storyStyles.right}>

                                    
                                    {this.props.shownStory && this.props.shownStory.id == story.id  ? 
                                    <div className={storyStyles.buttons}>
                                        <div><Button onClick={() => this.setState({editing: !this.state.editing})}circular icon="edit outline"/></div>
                                        <div><Button onClick={() => this.deleteStory(story)} className={storyStyles.button} circular icon="trash alternate outline" /></div>
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
}
const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects,
        shownStory: state.shownStory
    }
}

export default connect(mapStateToProps)(Stories)
