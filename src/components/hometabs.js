import React, { Component } from 'react'
import tabStyles from './hometabs.module.css'
class Hometabs extends Component {

    state = {
        newProject: false
    }
    fixState = (e, word) =>{
        if (word == "new"){
            this.setState({newProject: true})
            // function to display questionnaire
        } else {
            this.setState({newProject: false})
            // same function to display all projects
        }
    }
    render() {
        return (
            <div className={tabStyles.container}>
                <div className={tabStyles.tabs}>
                    <div className={this.state.newProject ? tabStyles.tab : tabStyles.active} onClick={(e) => this.fixState(e, "all")}><h1>All Projects</h1></div>
                    <div className={this.state.newProject ? tabStyles.active : tabStyles.tab} onClick={(e) => this.fixState(e, "new")}><h1>New Project</h1></div>
                </div>                
            </div>
        )
    }
}

export default Hometabs