import React, { Component } from 'react'
import progressStyles from './progress.module.css'
import {connect} from 'react-redux'

class Progress extends Component {
    render() {

    
    return (
        <div className={progressStyles.container}>

            <h1>progress section</h1>
            {this.props.shownStory ? 
            <div>
            {this.props.shownStory.objectives.map(obj => { 
                
                return(
                    <div>
                        {obj.in_progress? obj.description : null}
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
    )
}

}
const mapStateToProps = (state) => {
    return{
        shownStory: state.shownStory
    }
}

export default connect(mapStateToProps)(Progress)