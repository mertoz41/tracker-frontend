import React, { useState, useEffect } from 'react'
import progressStyles from './progress.module.css'
import {connect} from 'react-redux'
import objectiveStyles from './objectives.module.css'
import {Button} from 'semantic-ui-react'
import store from '../../redux/store'

const Progress = ({shownStory, setShownStory}) => {
    const [editing, setEditing] = useState(false)
    const [selectedSect, setSelectedSect] = useState('inProgress')
    const [objectives, setObjectives] = useState([])
    // console.log(shownStory)
    useEffect(() => {
        // let filtered = shownStory.objectives.filter(obj => obj.in_progress)
        // setObjectives(filtered)
    }, [])
    const deleteObjective = (obj) =>{
        // delete request to delete an objective.
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
    const checkComplete = (obj) => {
        // patch request to update objective completion prop.
        // obj.completed = !obj.completed 
        // let updatedObj = {...obj}
        let foundObjective = shownStory.objectives.find(obje => obje.id === obj.id)
        let updatedObjective = {...foundObjective, complete: true, in_progress: false}
        let filteredObjectives = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedObjectives = [updatedObjective, ...filteredObjectives]
        setShownStory({...shownStory, objectives: updatedObjectives})
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        // .then(resp => resp.json())
        // .then(resp => {
      
        //     store.dispatch({type: "UPDATE_OBJ", shownStory: resp.updated_objective})
             
        //     // update shownStory.objectives array

        // })
        
    }
   
    const progressFunc = (obj) => {

        let foundObjective = shownStory.objectives.find(obje => obje.id === obj.id)
        let updatedObjective = {...foundObjective, in_progress: false}
        let filteredObjectives = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedObjectives = [updatedObjective, ...filteredObjectives]
        setShownStory({...shownStory, objectives: updatedObjectives})
        fetch(`http://localhost:3000/progress/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })

    }
    const filterObjectives = type => {
        setSelectedSect(type)
        if (type == 'inProgress'){
            let filteredList = shownStory.objectives.filter(obj => obj.in_progress)
            setObjectives(filteredList)
        } else if (type == 'completed'){
            let filteredList = shownStory.objectives.filter(obj => obj.completed)
            setObjectives(filteredList)

        } else {

        }
    }

    
    return (
        <div className={progressStyles.container}>
            <div className='progressHeader'>
                <div className={selectedSect == 'inProgress' ? 'selectedProgSect' :'progSect'} onClick={() => filterObjectives('inProgress')}><h2>in progress</h2></div>
                <div className={selectedSect == 'completed' ? 'selectedProgSect' :'progSect'} onClick={() => filterObjectives('completed')}><h2>completed</h2></div>
                <div className={selectedSect == 'settings' ? 'selectedProgSect' :'progSect'} onClick={() => filterObjectives('settings')}><h2>settings</h2></div>
            </div>
            <div className={progressStyles.items}>
            
            <div>
            {shownStory.objectives.map((obj,i) => (
                selectedSect == 'inProgress' && obj.in_progress ?
                    <div key={i}>
                        <div className={objectiveStyles.working}>
                            <div className={objectiveStyles.left}>
                                <h3>{obj.description}</h3>
                            </div>
                            <div className={objectiveStyles.right}>
                                <div onClick={() => progressFunc(obj)}><h3>undo progress</h3></div>
                                <div onClick={() => checkComplete(obj)}><h3>complete</h3></div>
                            <div><Button onClick={() => deleteObjective(obj)} circular icon="trash alternate outline"/></div>
                        </div>
                      
                    </div>
                        
                        </div>
                        :
                        selectedSect == 'completed' && obj.completed ?
                        <div key={i}>
                        <div className={objectiveStyles.working}>
                            <div className={objectiveStyles.left}>
                                <h3>{obj.description}</h3>
                            </div>
                            <div className={objectiveStyles.right}>
                                <div onClick={() => progressFunc(obj)}><h3>undo complete</h3></div>
                                {/* <div onClick={() => checkComplete(obj)}><h3>complete</h3></div> */}
                            <div><Button onClick={() => deleteObjective(obj)} circular icon="trash alternate outline"/></div>
                        </div>
                      
                    </div>
                        
                        </div>
                        :
                        null
                        )
                        
                        )
                    }
                    {/* <div ><Button circular icon="hourglass end"/></div> */}
                {/* {obj.in_progress ?
                <div><Button  circular icon={obj.completed ? "close": "checkmark"} /></div>
                : 
                <div><Button onClick={() => setEditing(!editing)}circular icon="edit outline"/></div>
                } */}
            
            </div>
            
            </div>
            
        </div>
    )


}
const mapStateToProps = (state) => {
    return{
        shownProject: state.shownProject
    }
}

export default connect(mapStateToProps)(Progress)