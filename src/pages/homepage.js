import React, { Component } from 'react'
import Header from '../components/header'
import Projects from '../components/projects'
import pageStyles from './page.module.css'
import AddProject from '../components/addproject'



export class Homepage extends Component {
    render() {
        return (
            <div className={pageStyles.wrapper}>
                <Header />
                <div className={pageStyles.homepage}>
                    <AddProject />
                    <Projects />
                </div>
            </div>
        )
    }
}

export default Homepage
