import React, { Component } from 'react'
import questionStyles from './questionnaire.module.css'
import store from '../redux/store'

export class Questionnaire extends Component {
    state = {
        projectName: '',
        duration: 0
    }

    fixState = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]:value
        })
    }

    createProject = (e) =>{
        e.preventDefault()
        let obj = this.state
        obj.duration = parseInt(this.state.duration)
        obj["user_id"] = store.getState().currentUser.id

        fetch('http://localhost:3000/projects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(resp => {
            let updatedProjects = store.getState().projects
            updatedProjects.push(resp.project)
            store.dispatch({type: "ADD_NEW_PROJECT", projects: updatedProjects})
        })
    }


    render() {
        return (
            <div className={questionStyles.container}>
                <h1>NEW PROJECT</h1>
                <div className={questionStyles.questions}>
                    <form onSubmit={(e) => this.createProject(e)}>

                    
                    <p>What is the name of the project?</p>
                    <input name="projectName"  value={this.state.projectName} placeholder="type here" onChange={(e) => this.fixState(e) }/>
                    <p>What is the amount of days you are expecting to execute this project in days?</p>
                    <input name="duration" type="number" value={this.state.duration} placeholder="type here" onChange={(e) => this.fixState(e) }/>
                    <br/>
                    <br/>

                    <button type="submit">Create</button>
                    </form>



                </div>
                
            </div>
        )
    }
}

export default Questionnaire
