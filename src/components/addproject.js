import React, { Component } from 'react'
import addProjectStyles from './addproject.module.css'
import Questionnaire from '../components/newproject/questionnaire'

class AddProject extends Component {
    state={
        showingQuestions: false
    }

    



    render(){
    return (
        <div className={addProjectStyles.container}>
            {this.state.showingQuestions ?
            <Questionnaire />
            :
            <div className={addProjectStyles.plus} onClick={() => this.setState({showingQuestions: !this.state.showingQuestions})}>
                <h1 className={addProjectStyles.add}>+</h1>
            </div>
            }   
            <div className={addProjectStyles.words}>
                <h1 className={addProjectStyles.word}>NEW PROJECT</h1>

            </div>
            
        </div>
    )
    }
}


export default AddProject