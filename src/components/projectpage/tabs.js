import React, { Component } from 'react'
import Completed from './completed'
import ProjectInfo from './projectinfo'
import tabStyles from './tabs.module.css'

export class Tabs extends Component {
  
    render() {
        return (
            <div className={tabStyles.container}>
                <div className={tabStyles.header}>
                    <div className={this.props.showingComp ? tabStyles.active : tabStyles.head} onClick={() => this.props.fixState("comp")}><h1>COMPLETED</h1></div>
                    <div className={this.props.showingComp ? tabStyles.head : tabStyles.active} onClick={() => this.props.fixState("info")}><h1>INFO</h1></div>
    
                </div>
            </div>
        )
    }
}

export default Tabs
