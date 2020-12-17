import React, { Component } from 'react'
import pageStyles from './page.module.css'
import Intro from '../components/welcome/intro'
import Header from '../components/header'

export class Welcome extends Component {
    
    render() {
        return (
            <div className={pageStyles.wrapper}>
                <Header />
                <Intro/>
                
                
            </div>
        )
    }
}

export default Welcome
