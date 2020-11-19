import React, { Component } from 'react'
import { connect } from 'react-redux'
import completedStyles from './completed.module.css'
import objectiveStyles from './objectives.module.css'
import {Button} from 'semantic-ui-react'
import store from '../../redux/store'
import DifItem from './difitem'


class Completed extends Component {
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
            // completed is being changed
            // let shownStory = this.props.shownStory
            // let objIndex = shownStory.objectives.indexOf(shownStory.objectives.find(obj => obj.id == resp.updated_objective.id))
            // shownStory.objectives.splice(objIndex, 1, resp.updated_objective)
            // let updatedShownStory = {...shownStory}
            store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
             
            // update shownStory.objectives array

        })
        
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
        <div className={completedStyles.container}>
            <div className={completedStyles.header}>
            <h1>DONE</h1>
            </div>
            <div className={completedStyles.items}>
            {this.props.shownStory ?
            <div>
            
            {this.props.shownStory.objectives.map(obj => { 
                
                return(
                    <div>
                        {obj.completed ? 
                        <DifItem obj={obj} id={obj.id} />
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
export default connect(mapStateToProps)(Completed)