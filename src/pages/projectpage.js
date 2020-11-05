import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/objectives'
import Progress from '../components/progress'
import Agenda from '../components/agenda'
import pageStyles from './page.module.css'
import Projectinfo from '../components/projectinfo'


class Projectpage extends Component {
    render(){

    
    return (
        <div className={pageStyles.wrapper}>
            <Header />
            <div className={pageStyles.upper}>
                <Progress />
                <Projectinfo />
            </div>
            <div className={pageStyles.lower}>
                <Objectives />
                <Agenda />

            </div>
            
        </div>
    )
    }
}

export default Projectpage