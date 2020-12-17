import React, { Component } from 'react'
import { connect } from 'react-redux'
import completedStyles from './completed.module.css'
import objectiveStyles from './objectives.module.css'
import {Button} from 'semantic-ui-react'
import store from '../../redux/store'
import DifItem from './difitem'


class Completed extends Component {

    render(){

    
    return (
        <div className={completedStyles.container}>
            <div className={completedStyles.items}>
            {this.props.shownStory ?
            <div>
            
            {this.props.shownStory.objectives.map(obj => { 
                
                return(
                    <div>
                        {obj.completed ? 
                        <DifItem obj={obj} id={obj.id} for={"completed"}/>
                        : 
                        null}
                        </div>
                )
            }
            )
            }
            </div>
            
            :
            null
            }
            </div>
        </div>
    )
}


}
const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory,
        shownProject: state.shownProject
    }
}
export default connect(mapStateToProps)(Completed)