import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../../redux/store'
import storyStyles from './stories.module.css'
import {Button} from 'semantic-ui-react'


export class Story extends Component {
    state = {
        editing: false,
        textarea: ''
    }

    displayStory = (story) =>{
        // dispatch action to display selected story.
        store.dispatch({type: "SHOW_STORY", shownStory: story}) 
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
            <div>
                <div className={this.props.shownStory && this.props.shownStory.id == this.props.story.id ? storyStyles.active : storyStyles.story} id={this.props.story.id}>
                                    <div className={storyStyles.words}>
                                    {this.state.editing ?
                                    <div className={storyStyles.edit}>
                                        <textarea placeholder={this.props.story.description} value={this.state.textarea} onChange={(e) => this.setState({textarea: e.target.value})}/>
                                        <Button onClick={(e) => this.editStory(e, this.props.story)} circular icon="save outline"/>
                                    </div>
                                    :
                                    <h3 onClick={() => this.displayStory(this.props.story)}>{this.props.story.description}  </h3>
                                    }
                                    
                                    </div>
                                    <div className={storyStyles.bottom}>

                                    
                                    <div className={storyStyles.left}>
                                    <div><h4>{this.props.story.objectives.length} items</h4></div>
                                    <div><h4>{this.getPercentage(this.props.story)} complete</h4></div>
                                    </div>
                                    <div className={storyStyles.right}>

                                    
                                    {this.props.shownStory && this.props.shownStory.id == this.props.story.id  ? 
                                    <div className={storyStyles.buttons}>
                                        <div><Button onClick={() => this.setState({editing: !this.state.editing})}circular icon="edit outline"/></div>
                                        <div><Button onClick={() => this.deleteStory(this.props.story)} className={storyStyles.button} circular icon="trash alternate outline" /></div>
                                    </div>

                                    :
                                    null
                                    }
                                    </div>
                                    </div>
                                  
                                </div>
                                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory,
        shownProject: state.shownProject,
        userProjects: state.userProjects
    }

}
export default connect(mapStateToProps)(Story)
