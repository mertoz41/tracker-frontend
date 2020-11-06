import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'

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
            project_id: this.props.shownProject.id
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
            // location to add shownProjectObjectives
            debugger
        })
    }

    render(){
        // let filteredObjectives = this.props.currentUser.objectives.filter(obj => obj.project_id == this.props.shownProject.id)    
    return (
        <div className={objectiveStyles.container}>
            <button onClick={() => this.setState({adding: true})}>Add new Objective</button>
            {this.state.adding ?
            <div>
            <textarea placeholder="objective description goes here" onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <button onClick={(e) => this.addObjective(e)}>add</button>
            </div>
            :
            null
            }
            <div>
                {this.props.shownProject.objectives.map(obj => {
                    return(
                    <p>{obj.description}</p>
                    )
                })}
                
                
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject
    }
}
export default connect(mapStateToProps)(Objectives)
