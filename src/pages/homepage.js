import React, { Component } from 'react'
import Header from '../components/header'
import Projects from '../components/projects'
import pageStyles from './page.module.css'
import Dailyhome from '../components/dailyhome'



export class Homepage extends Component {
    render() {
        return (
            <div className={pageStyles.wrapper}>
                <Header />
                <div className={pageStyles.content}>
                    <Projects />
                    <Dailyhome />
                </div>
            </div>
        )
    }
}

export default Homepage
