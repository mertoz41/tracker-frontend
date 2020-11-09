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
            story_id: this.props.shownStory.id
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
            // shownStory adjustment
            let shownStory = this.props.shownStory
            shownStory.objectives.push(resp.objective)
             
            store.dispatch({type: "ADD_OBJECTIVE", shownStory: shownStory})

        })
        this.setState({adding: !this.state.adding, description: ''})
    }

    render(){
    return (
        <div className={objectiveStyles.container}>
            <h1>OBJECTIVES</h1>
            {this.props.shownStory ?
            <h5>{this.props.shownStory.description}</h5>
            :
            null 
            }
            <button onClick={() => this.setState({adding: !this.state.adding})}>Add new Objective</button>
            {this.state.adding ?
            <div>
            <textarea placeholder="objective description goes here" onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <button onClick={(e) => this.addObjective(e)}>add</button>
            </div>
            :
            null
            }
            {this.props.shownStory ? 
            <div>
                {this.props.shownStory.objectives.map(obj => {
                    return(
                    <p>{obj.description}</p>
                    )
                })}
            </div>
            :
            <p>No objectives for this story</p>  
            }
        </div>
    )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject,
        userProjects: state.userProjects,
        shownStory: state.shownStory
    }
}
export default connect(mapStateToProps)(Objectives)
