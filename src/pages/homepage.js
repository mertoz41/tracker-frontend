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
                    {/* <div className={pageStyles.colors}>
                        <div className={pageStyles.colorone}/>
                        <div className={pageStyles.colortwo}/>
                        <div className={pageStyles.colorthree}/>
                        {/* <div className={pageStyles.colorfour}/> */}
                        {/* <div className={pageStyles.colorfive}/> */}
                    {/* </div>  */}
                </div>
            </div>
        )
    }
}

export default Homepage
