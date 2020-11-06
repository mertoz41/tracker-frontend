import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'

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
            let updatedShownProject = this.props.shownProject
            let objectives = updatedShownProject.objectives
            objectives.push(resp.objective)
         
            updatedShownProject.objectives = objectives 
            store.dispatch({type: "ADD_OBJECTIVE", shownProject: updatedShownProject})

        })
        this.setState({adding: !this.state.adding, description: ''})
    }

    render(){
    return (
        <div className={objectiveStyles.container}>
            <button onClick={() => this.setState({adding: !this.state.adding})}>Add new Objective</button>
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
