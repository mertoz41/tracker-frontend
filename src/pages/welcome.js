import React, { Component } from 'react'
import pageStyles from './page.module.css'
import Intro from '../components/intro'

export class Welcome extends Component {
    componentDidMount(){
        console.log("why isnt this being mounted")
    }
    
    render() {
        return (
            <div className={pageStyles.wrapper}>
                
                <Intro/>
                
                
            </div>
        )
    }
}

export default Welcome
