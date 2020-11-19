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
        // className={this.state.newStory ? storyStyles.adding : storyStyles.add}
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
