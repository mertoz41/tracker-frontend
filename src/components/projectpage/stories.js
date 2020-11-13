import React, { Component } from 'react'
import storyStyles from './stories.module.css'
import store from '../../redux/store'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import Story from './story'

export class Stories extends Component {
    state = {
        description: "",
        newStory: false
    }

    createStory = (e) => {
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
                    <h1>STORIES</h1>
                    <h1 className={this.state.newStory ? storyStyles.adding : storyStyles.add}onClick={() => this.setState({newStory: true})}>Add</h1>
                </div>
                    {this.state.newStory ?
                        <div className={storyStyles.new}>
                            <textarea onChange={(e) => this.setState({description: e.target.value})} value={this.state.description} placeholder="new story goes here..."/>
                            <button onClick={(e) => this.createStory(e)}>Create</button>
                        </div>
                    :
                    null
                    }
                
                <div className={storyStyles.stories}>
                    {this.props.shownProject.stories ? 
                    
                        this.props.shownProject.stories.map(story => {
                            return(
                                <Story id={story.id} story={story}/>
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
