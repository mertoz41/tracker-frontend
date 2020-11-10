import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'

class Objectives extends Component {
    
    state = {
        description: '',
        adding: false
    }
    fixDesc = (e) => {
        this.setState({description: e.target.value})
    }

    addObjective = (e) =>{
        e.preventDefault()
        let obj = {
            description: this.state.description,
            story_id: this.props.shownStory.id
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
            // shownStory adjustment
            let shownStory = this.props.shownStory
            shownStory.objectives.push(resp.objective)
            let updatedShownStory = {...shownStory}
             
            store.dispatch({type: "ADD_OBJECTIVE", shownStory: updatedShownStory})

        })
        this.setState({adding: !this.state.adding, description: ''})
    }

    deleteObjective = (obj) =>{
        // delete fetch
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(resp => {
            // update shown story
            let shownStory = this.props.shownStory
            let filteredObjectives = shownStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            shownStory.objectives = filteredObjectives
            let updatedShownStory = {...shownStory}
            // update shown project
            let shownProject = this.props.shownProject
            let foundStory = shownProject.stories.find(story => story.id == shownStory.id)
            let index = shownProject.stories.indexOf(foundStory)
            let filteredStoryObjectives = foundStory.objectives.filter(obj => obj.description !== resp.deleted_objective.description)
            foundStory.objectives = filteredStoryObjectives
            shownProject.stories.splice(index,1, foundStory)
            let updatedShownProject = {...shownProject}
            

            store.dispatch({type: "DELETE_OBJECTIVE", shownStory: updatedShownStory, shownProject: updatedShownProject})
             
        })
        // update userProjects
    }

    render(){
    return (
        <div className={objectiveStyles.container}>
            <div className={objectiveStyles.header}>

            
            <h1>OBJECTIVES</h1>
            {this.props.shownStory ?
            <h5>{this.props.shownStory.description}</h5>
            :
            null 
            }

            {this.props.shownStory ?
            

            <div>
            {this.state.adding ?
            <div>
            <textarea placeholder="objective description goes here" onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <button onClick={(e) => this.addObjective(e)}>add</button>
            </div>
            :
            <button onClick={() => this.setState({adding: !this.state.adding})}>Add</button>
            }
            </div>
            :
            null
            }   


            </div>
            {this.props.shownStory ? 
            <div className={objectiveStyles.objectives}>
                {this.props.shownStory.objectives.map(obj => {
                    return(
                        <div className={objectiveStyles.objective}>
                            <p>{obj.description}</p>
                            <button onClick={() => this.deleteObjective(obj)}>erase</button>
                        </div>
                    )
                })}
            </div>
            :
            <p>No objectives for this story</p>  
            }
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
export default connect(mapStateToProps)(Objectives)
