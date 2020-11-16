import React, { Component } from 'react'
import Header from '../components/header'
import Projects from '../components/projects'
import pageStyles from './page.module.css'
import Hometabs from '../components/hometabs'
import Questionnaire from '../components/newproject/questionnaire'


export class Homepage extends Component {
    state ={
        newProject: false
    }
    pageDisplay = (word) => {

        if(word == "new") {
            this.setState({newProject: true})
        } else {
            this.setState({newProject: false})
        }

    }
    render() {
        return (
            <div className={pageStyles.wrapper}>
                <Header />
                <div className={pageStyles.homepage}>
                    <Hometabs newProject={this.state.newProject} pageDisplay={this.pageDisplay}/>
                    {this.state.newProject ?
                        <Questionnaire />
                    :
                        <Projects />

                    }
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
