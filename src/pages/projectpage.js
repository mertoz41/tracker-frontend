import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import pageStyles from './page.module.css'
import Projectinfo from '../components/projectpage/projectinfo'
import Stories from '../components/projectpage/stories'


class Projectpage extends Component {
    

    render(){

    
    return (
        <div className={pageStyles.wrapper}>
            <Header />
            <div className={pageStyles.content}>

            
            <div className={pageStyles.left}>
                <Stories />
                <Objectives />
            </div>
            <div className={pageStyles.right}>

                <Progress />
                <Projectinfo />

            </div>
            </div>
            
        </div>
    )
    }
}

export default Projectpage