import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import pageStyles from './page.module.css'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'
import {connect} from 'react-redux'
import Completed from '../components/projectpage/completed'


class Projectpage extends Component {
    

    render(){

    
    return (
        <div className={pageStyles.wrapper}>
            <Header />
            <div className={pageStyles.content}>

            
            <div className={pageStyles.left}>
                <div className={pageStyles.first}>
                    <Stories />
                    <Projectinfo />
                </div>
                <Objectives />
            </div>
            <div className={pageStyles.right}>

                <Progress />
                <Completed />
                

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