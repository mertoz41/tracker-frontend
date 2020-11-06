import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/projectpage/objectives'
import Progress from '../components/projectpage/progress'
import Agenda from '../components/projectpage/agenda'
import pageStyles from './page.module.css'
import Projectinfo from '../components/projectpage/projectinfo'


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