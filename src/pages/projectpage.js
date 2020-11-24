import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import pageStyles from './page.module.css'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'
import {connect} from 'react-redux'
import Completed from '../components/projectpage/completed'
import Empty from '../components/projectpage/empty'
import Tabs from '../components/projectpage/tabs'

class Projectpage extends Component {
  

    componentWillUnmount(){
        debugger 
    }
    state = {
        showingComp: true
    } 

    fixState = (sect) =>{
        if (sect == "comp") {
            this.setState({showingComp: true})
        } else {
            this.setState({showingComp: false})
        }
    }
    

    render(){

    
    return (
        <div className={pageStyles.wrapper}>
            <Header />
            <div className={pageStyles.content}>

            
                <div className={pageStyles.left}>
                    <div className={pageStyles.first}>
                        <Stories />
                    </div>
                    {this.props.shownStory ? 
                    <Objectives />
                    :
                    <Empty />
                    }
                   
                </div>
                <div className={pageStyles.right}>
                    {this.props.shownStory ? 
                    <div>
                    <Progress />
                    <Tabs fixState={this.fixState} showingComp={this.state.showingComp}/>
                    {this.state.showingComp ? 
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