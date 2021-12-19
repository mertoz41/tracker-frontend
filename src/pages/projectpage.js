import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'
import {connect} from 'react-redux'
import Empty from '../components/projectpage/empty'

const Projectpage = ({shownProject}) => {
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState(null)
    const [shownStory, setShownStory] = useState(null)

    useEffect(() => {
        getStories(shownProject.id)
    }, [])

    const getStories = id => {
        fetch(`http://localhost:3000/projects/${id}`)
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp)
            setStories(resp)
        })
    }

    const deleteObjective = (obj) =>{
        
        // update shown story
        let filteredObjs = shownStory.objectives.filter(obje => obje.id !== obj.id)
        let updatedShownStory = {...shownStory, objectives: filteredObjs}
        setShownStory(updatedShownStory)
        // update stories
        let foundStory = stories.find(stori => stori.id === shownStory.id)
        let index = stories.indexOf(foundStory)
        let filteredStories = stories.filter(stori => stori.id !== foundStory.id)
        filteredStories.splice(index, 0, updatedShownStory)
        setStories(filteredStories)
        fetch(`http://localhost:3000/objectives/${obj.id}`, {
            method: "DELETE"
        })
    }
    const progressFunc = (obj) => {
        // only shown story needs to be updated
        let foundObjective = shownStory.objectives.find(obje => obje.id === obj.id)
        let updatedObjective = {...foundObjective, in_progress: !foundObjective.in_progress}
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
    // update stories when an objective is added


    return (
        <div >
            <Header />
            <div className='projectSections'>

            
                <div className='left'>
                    <div className='first'>
                    <Stories setShownStory={setShownStory} shownStory={shownStory} stories={stories} setStories={setStories}/>
                    </div>
                    {shownStory ? 
                    <Objectives progressFunc={progressFunc} deleteObjective={deleteObjective} shownStory={shownStory} stories={stories} setStories={setStories} setShownStory={setShownStory}/>
                    :
                    <Empty />
                    }
                   
                </div>
                <div className='right'>
                    {shownStory ? 
                    <div>
                    <Progress progressFunc={progressFunc} deleteObjective={deleteObjective} shownStory={shownStory} setShownStory={setShownStory}/>
                    
                    </div>
                    :
                    <Empty />
                }
                

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

export default connect(mapStateToProps)(Projectpage)