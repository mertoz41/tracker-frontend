import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'
import {Button} from 'semantic-ui-react'
import Item from './item'

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
            let updatedShownStory = {...shownStory}
             
            store.dispatch({type: "ADD_OBJECTIVE", shownStory: updatedShownStory})

        })
        this.setState({adding: !this.state.adding, description: ''})
    }

  


    

    render(){
         
    return (
        <div className={objectiveStyles.container}>
            <div className={objectiveStyles.header}>
                <div><h1>TO DOs</h1></div>
                {/* <h2>{this.props.shownStory ? this.props.shownStory.description : "PICK A STORY"}</h2> */}
                <div className={objectiveStyles.toadd}><h1 onClick={() => this.setState({adding: !this.state.adding})}>Add</h1></div>
            </div>
            

            {this.props.shownStory ?
            

            <div>
            {this.state.adding ?
            <div>
            <textarea placeholder="objective description goes here" onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <button onClick={(e) => this.addObjective(e)}>add</button>
            </div>
            :
            null
            }
            </div>
            :
            null
            }   


<div className={objectiveStyles.objectives}>
            {this.props.shownStory && this.props.shownStory.objectives.length > 0 ? 
            <div>
                {this.props.shownStory.objectives.map(obj => {
                    return(
                        <div>
                            {obj.in_progress?
                            null
                            :
                            <Item obj={obj} id={obj.id} />
                            }
                            
                        </div>
                    )
                })}
            </div>
            :
            <p>No objectives for this story</p>  
            }
            </div>
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
