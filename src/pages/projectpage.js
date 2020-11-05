import React, { Component } from 'react'
import Header from '../components/header'
import Objectives from '../components/objectives'
import Progress from '../components/progress'
import Dailyproject from '../components/dailyproject'

class Projectpage extends Component {
    render(){

    
    return (
        <div>
            <Header />
            <Objectives />
            <Progress />
            <Dailyproject />
            
        </div>
    )
    }
}

export default Projectpage