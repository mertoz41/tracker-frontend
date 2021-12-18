import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'
import {connect} from 'react-redux'
import Completed from '../components/projectpage/completed'
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
                    <Objectives shownStory={shownStory} stories={stories} setStories={setStories} setShownStory={setShownStory}/>
                    :
                    <Empty />
                    }
                   
                </div>
                <div className='right'>
                    {shownStory ? 
                    <div>
                    <Progress shownStory={shownStory}/>
                    
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