import React, { Component } from 'react'
import progressStyles from './progress.module.css'
import {connect} from 'react-redux'
import objectiveStyles from './objectives.module.css'
import {Button} from 'semantic-ui-react'
import store from '../../redux/store'
import Item from './item'
import DifItem from './difitem'

class Progress extends Component {
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
    checkComplete = (obj) => {
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
    addToProgress = (obj) => {
        obj.in_progress = !obj.in_progress
        let updatedObj = {...obj}
         
        fetch(`http://localhost:3000/progress/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
        })
        .then(resp => resp.json())
        .then(resp => {
          
            store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
        })
    }
    render() {

    
    return (
        <div className={progressStyles.container}>
            <div className={progressStyles.header}>

            <h1>IN PROGRESS</h1>
            </div>
            <div className={progressStyles.items}>
            {this.props.shownStory ? 
            <div >
            {this.props.shownStory.objectives.map(obj => { 
                
                return(
                    <div>
                        {obj.in_progress && obj.completed == false ? 
                        <DifItem obj={obj} id={obj.id}/>
                        : 
                        null}
                        </div>
                )
            }
            )
            }
            
            </div>
            :
            null
            }
            </div>
            
        </div>
    )
}

}
const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory,
        shownProject: state.shownProject
    }
}

export default connect(mapStateToProps)(Progress)