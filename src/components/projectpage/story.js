import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../../redux/store'
import storyStyles from './stories.module.css'
import {Button} from 'semantic-ui-react'


export class Story extends Component {
    displayStory = (story) =>{
        store.dispatch({type: "SHOW_STORY", shownStory: story}) 
    }
    getPercentage = (story) => {
        if (story.objectives.length > 0){
            let completedObjs = story.objectives.filter(obj => obj.completed)
            return Math.trunc(completedObjs.length / story.objectives.length * 100 ) + "%"
        } else {
            return "0%"
        }
         
    }
    render() {
        return (
            <div>
                <div className={this.props.shownStory == this.props.story ? storyStyles.active : storyStyles.story} id={this.props.story.id}>
                                    <h4 onClick={() => this.displayStory(this.props.story)}>{this.props.story.description} ({this.props.story.objectives.length}) ({this.getPercentage(this.props.story)})</h4>
                                    {this.props.shownStory == this.props.story ? 
                                    <Button onClick={() => this.deleteStory(this.props.story)} className={storyStyles.button} circular icon="trash" />
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
        shownStory: state.shownStory
    }

}
export default connect(mapStateToProps)(Story)
