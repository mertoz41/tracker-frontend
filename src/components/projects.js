import React from 'react'
import projectStyles from './projects.module.css'


export default function Projects() {
    return (
        <div className={projectStyles.container}>
            <h1>All Projects</h1>
            <ul>
                <li>Hooper app</li>
                <li>Beatbox Bubble app</li>
                <li>Porfolio</li>
            </ul>
           

            
        </div>
    )
}
