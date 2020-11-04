import React, { Component } from 'react'
import questionStyles from './questionnaire.module.css'

export class Questionnaire extends Component {
    render() {
        return (
            <div className={questionStyles.container}>
                <h1>NEW PROJECT</h1>
                <div className={questionStyles.questions}>
                    <p>What is the name of the project?</p>
                    <input> </input>
                    <p>When will you start working on this project?</p>
                    <p>What is the amount of days you are expecting to execute this project in days?</p>
                    <p>What type of a project is this?</p>


                </div>
                
            </div>
        )
    }
}

export default Questionnaire
