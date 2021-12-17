import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'
import {connect} from 'react-redux'
import Completed from '../components/projectpage/completed'
import Empty from '../components/projectpage/empty'
import Tabs from '../components/projectpage/tabs'

class Projectpage extends Component {
  


    state = {
        showingCompleted: true
    } 

    fixState = (sect) =>{
        // updating state that displays completed or project info section.
        if (sect == "comp") {
            this.setState({showingCompleted: true})
        } else {
            this.setState({showingCompleted: false})
        }
    }
    

    render(){

    
    return (
        <div >
            <Header />
            <div className='projectSections'>

            
                <div className='left'>
                    <div className='first'>
                    <Stories />
                    </div>
                    {this.props.shownStory ? 
                    <Objectives />
                    :
                    <Empty />
                    }
                   
                </div>
                <div className='right'>
                    {this.props.shownStory ? 
                    <div>
                    <Progress />
                    <Tabs fixState={this.fixState} showingCompleted={this.state.showingCompleted}/>
                    {this.state.showingCompleted ? 
                    <Completed />
                    :
                    <Projectinfo/>
        
                    }
                    </div>
                    :
                    <Empty />
                }
                

            </div>
            </div>
            
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory
    }
}

export default connect(mapStateToProps)(Projectpage)