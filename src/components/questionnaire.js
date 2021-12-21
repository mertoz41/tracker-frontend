import React, { useState } from 'react'
import store from '../redux/store'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'




const Questionnaire = ({currentUser, userProjects, history}) => {
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount ] = useState(140)
    const [one, setOne] = useState('')
    const [two, setTwo] = useState('')
    const [three, setThree] = useState('')
    const [four, setFour] = useState('')
    const [firstPage, setFirstPage] = useState(true)

    const createProject = () =>{

        let obj = {projectName: projectName, description: description, user_id: currentUser.id, stories: [one, two, three, four]}
        
        
        fetch('http://localhost:3000/projects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.message){
                alert(resp.message)
                setFirstPage(true)
            } else {
                let name = resp.title.split('').filter(letter => letter !== " ").join('')
                store.dispatch({type: "SHOW_PROJECT", shownProject: resp})
                history.push(`/projects/${name}`)
            }
        })
    }




        return (
            <div className='projects'>
                
                    {firstPage ? 
                    <div className='middleContent'>

                        <p>What is the name of the project?</p>
                        <input name="projectName"  value={projectName} onChange={(e) => setProjectName(e.target.value) }/>

                        <p>Describe this project in {count - description.length} characters.</p>
                        <p></p>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                      
                        <div>
                        <button onClick={() => setFirstPage(false)}>Next</button>
                            </div>
                    </div>
                    :
                    <div className='middleContent'>
            

                            <p>Create backlogs of user stories for this project.</p>
                            <p>Remember to prioritize your backlogs based on the value it brings!</p>
                            <p>You will always be able to edit, delete, and add new backlogs!</p>
                            <div>
                                <textarea onChange={(e) => setOne( e.target.value)} placeholder="backlog #1 goes here" value={one}/>
                            </div>
                            <div>
                                <textarea onChange={(e) => setTwo(e.target.value)} placeholder="backlog #2 goes here" value={two}/>
                                </div>
                                <div>
                                <textarea onChange={(e) => setThree(e.target.value)} placeholder="backlog #3 goes here" value={three}/>
                                </div>
                                <div>
                                <textarea onChange={(e) => setFour(e.target.value)} placeholder="backlog #4 goes here" value={four}/>
                                </div>
                            <button onClick={() => createProject()} type="submit">{one || two || three || four ? 'create' : 'skip'}</button>
                            :
                        
                    </div>
                    }
            </div>
        )
    }

const mapStateToProps = state => ({currentUser: state.currentUser, userProjects: state.userProjects})
export default connect(mapStateToProps) (withRouter(Questionnaire))
