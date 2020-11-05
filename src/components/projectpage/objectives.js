import React, { Component } from 'react'
import objectiveStyles from './objectives.module.css'
import {connect} from 'react-redux'

class Objectives extends Component {

    render(){    
    return (
        <div className={objectiveStyles.container}>
            All objectives section with a dropdown?
        </div>
    )
    }
}

const mapStateToProps = (state) =>{
    return{
        shownProject: state.shownProject
    }
}
export default connect(mapStateToProps)(Objectives)
