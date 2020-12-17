import React, { Component } from 'react'
import Header from '../components/header'
import Projects from '../components/projects'
import pageStyles from './page.module.css'
import Questionnaire from '../components/newproject/questionnaire'


export class Homepage extends Component {
 
    state ={
        newProject: false
    }
    pageDisplay = (word) => {
        // state that displays a questionnaire when user attempts to create a new project.

        if(word == "new") {
            this.setState({newProject: true})
        } else {
            this.setState({newProject: false})
        }

    }
    render() {
        return (
            <div className={pageStyles.wrapper}>
                <Header newProject={this.state.newProject} pageDisplay={this.pageDisplay} />
                <div className={pageStyles.homepage}>
                    {this.state.newProject ?
                        <Questionnaire />
                    :
                        <Projects />

                    }
                </div>
            </div>
        )
    }
}

export default Homepage
