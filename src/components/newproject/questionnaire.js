import React, { Component } from 'react'
import questionStyles from './questionnaire.module.css'
import store from '../../redux/store'
import {withRouter} from 'react-router'



export class Questionnaire extends Component {
    state = {
        projectName: '',
        duration: 0,
        description: '',
        count: 140,
        firstPage: true,
        one: "",
        two: "",
        three: "",
        four: "",
        createdProject: {}
    }

    fixState = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]:value
        })
       
    }

    descState = (e) => {
        let newCount = this.state.count - e.target.textLength
        // if(e.target.textLength > 0){
        //     newCount = this.state.count - 1
        // } else {
        //     newCount = this.state.count +1
        // }
        this.setState({
            // count: newCount,
            description: e.target.value
        })
    
    }

   

    createProject = (e) =>{
        e.preventDefault()
        let obj = {projectName: this.state.projectName, description: this.state.description, user_id: store.getState().currentUser.id }
         
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
                this.setState({projectName: '', description: ''})
            } else {
            
            let userProjects = store.getState().userProjects
            userProjects.push(resp.project)
            store.dispatch({type: "ADD_NEW_PROJECT", userProjects: userProjects})
            this.setState({firstPage: false, createdProject: resp.project})
            // this.props.history.push(`/projects/${obj.projectName}`)
            }
        })
    }

    addTodos = (e) =>{
        e.preventDefault()
        
      
        let obj = {stories: [this.state.one, this.state.two, this.state.three, this.state.four]}
        fetch(`http://localhost:3000/addstories/${this.state.createdProject.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(resp => {
            debugger 
            store.dispatch({type: "SHOW_PROJECT", shownProject: resp.project})
            this.props.history.push(`/projects/${resp.project.title}`)

        })

    }


    render() {
        return (
            <div className={questionStyles.container}>
                <div className={questionStyles.questions}>
                    {this.state.firstPage ? 
                    <div>
                        <form onSubmit={(e) => this.createProject(e)}>

                        
                        <p>What is the name of the project?</p>
                        <input name="projectName"  value={this.state.projectName} placeholder="type here" onChange={(e) => this.fixState(e) }/>
                        <p>In 140 characters, describe this project</p>
                        <textarea placeholder="project description goes here" name="description" value={this.state.description} onChange={(e) => this.descState(e)}/>
                        <p>{this.state.count}</p>
                        <br/>
                        <br/>

                        <button type="submit">Next</button>
                        </form>
                    </div>
                    :
                    <div>
                        <form onSubmit={(e) => this.addTodos(e)}>
                            <p>Create backlogs of user stories for this project. Remember to prioritize your backlogs based on the value it brings! You will always be able to edit, delete, and add new backlogs!</p>
                            <textarea onChange={(e) => this.setState({one: e.target.value})} placeholder="backlog #1 goes here" value={this.state.one}/>
                            <textarea onChange={(e) => this.setState({two: e.target.value})} placeholder="backlog #2 goes here" value={this.state.two}/>
                            <textarea onChange={(e) => this.setState({three: e.target.value})} placeholder="backlog #3 goes here" value={this.state.three}/>
                            <textarea onChange={(e) => this.setState({four: e.target.value})} placeholder="backlog #4 goes here" value={this.state.four}/>
                            {this.state.one || this.state.two || this.state.three || this.state.four ? 
                            <button type="submit">Create</button>
                            :
                            null
                            }
                            <button onClick={() => this.props.history.push(`/projects/${store.getState().shownProject.title}`)}>Skip</button>
                            
                        </form>
                    </div>
                    }



                </div>
                
            </div>
        )
    }
}

export default withRouter(Questionnaire)
