import React, { Component } from 'react'
import storyStyles from './stories.module.css'

export class Stories extends Component {
    render() {
        return (
            <div className={storyStyles.container}>
                <h1>STORIES</h1>
            </div>
        )
    }
}

export default Stories
