import React, { Component } from 'react'
import storyStyles from './stories.module.css'
import store from '../../redux/store'
import {connect} from 'react-redux'

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
            let updatedShownProject = this.props.shownProject
            updatedShownProject.stories.push(resp.new_story)


            // let updatedUserProjects = this.props.userProjects
            // let updatingProject = updatedUserProjects.find(project => project.id == resp.new_story.project_id)
            // updatingProject.stories.push(resp.new_story)
            store.dispatch({type: "ADD_STORY", shownProject: updatedShownProject})
        })
        this.setState({description: "", newStory: false})
    }

    render() {
        return (
            <div className={storyStyles.container}>
                <h1>STORIES</h1>
                {this.state.newStory ?
                    <div>
                        <textarea onChange={(e) => this.setState({description: e.target.value})} value={this.state.description} placeholder="new story goes here..."/>
                        <button onClick={(e) => this.createStory(e)}>Create</button>
                    </div>
                :
                <button onClick={() => this.setState({newStory: true})}>Add a new story</button>
                }
                <div>
                    {this.props.shownProject.stories.map(story => {
                        return(
                            <p>{story.description}</p>
                            )
                        })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects
    }
}

export default connect(mapStateToProps)(Stories)
