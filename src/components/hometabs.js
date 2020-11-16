import React, { Component } from 'react'
import tabStyles from './hometabs.module.css'
class Hometabs extends Component {

    state = {
        newProject: false
    }
    fixState = (e, word) =>{
        if (word == "new"){
            this.setState({newProject: true})
            this.props.pageDisplay(word)
            // function to display questionnaire
        } else {
            this.setState({newProject: false})
            this.props.pageDisplay(word)
            // same function to display all projects
        }
    }
    render() {
        return (
            <div className={tabStyles.container}>
                <div className={tabStyles.tabs}>
                    <div className={this.props.newProject ? tabStyles.tab : tabStyles.active} onClick={() => this.props.pageDisplay("all")}><h1>All Projects</h1></div>
                    <div className={this.props.newProject ? tabStyles.active : tabStyles.tab} onClick={() => this.props.pageDisplay("new")}><h1>New Project</h1></div>
                </div>                
            </div>
        )
    }
}

export default Hometabs