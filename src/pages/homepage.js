import React, { useState } from 'react'
import Header from '../components/header'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import ProjectCard from '../components/projectcard'
import Questionnaire from '../components/questionnaire'

const Homepage = ({currentUser, userProjects}) => {
 
    const [nuProject, setnuProject] = useState(false)

    
        return (
            <div className='container'>
                <Header />
                <div className='mainDeck'>
                    <div className='mainHeader'>
                        <div onClick={() => setnuProject(false)}>
                <h2>Your projects</h2>

                        </div>
                        <div onClick={() => setnuProject(true)}>
                <h2>+ New Project</h2>

                        </div>

                    </div>
                
                    {nuProject ?
                    <Questionnaire />
                    :
                    <div className='projects'>

                        {userProjects.map((project, i) => (
                            <ProjectCard id={project.id} project={project} key={i}/>
                        )
                        
                )}
                </div>
                }
                            

                    
                </div>
                    
            </div>
        )
    
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser,
        userProjects: state.userProjects
    }
}

export default connect(mapStateToProps)(withRouter(Homepage))
