import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'
import store from '../../redux/store'
import Item from './item'
import {Button} from 'semantic-ui-react'

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
                {this.props.shownStory ? 
            <div className={objectiveStyles.toadd}><h1 onClick={() => this.setState({adding: !this.state.adding})}>{this.state.adding ? "Adding":"Add"}</h1></div>
            :
            null
            }
                <div><h1> TO DOs</h1></div>
                {this.props.shownStory && this.props.shownStory.objectives.length > 0 ?
                <Button className={objectiveStyles.clear} onClick={() => store.dispatch({type: "CLEAR_STORY"})} circular icon="paperclip"/>
                :
                null
                }
            </div>
            

            {this.props.shownStory ?
            

            <div>
            {this.state.adding ?
            <div className={objectiveStyles.new}>
            <textarea placeholder="To-do goes here.." onChange={(e) => this.fixDesc(e)} value={this.state.description} />
            <Button onClick={(e) => this.addObjective(e)} circular icon="plus"/>
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
            null 
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
