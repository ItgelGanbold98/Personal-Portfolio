import React from 'react';
import './projectList.css';
import Project from '../projects/Project';

function ProjectList() {
    const projects = [
        {
            title: 'AutoMate',
            photo: 'automate',
            description:
                'A route and parking planner application for everyone! Leveraging historical data and Machine Learning model to predict busyness in given area.',
            techStack: [
                'React',
                'NodeJS',
                'Python',
                'PostgreSQL',
                'ThreeJS',
                'Java'
            ],
            webUrl: 'http://137.43.49.42/',
            githubUrl: 'https://github.com/ItgelGanbold98/AutoMate-NYC'
        },
        {
            title: 'Dublin Bikes App',
            photo: 'dublinbikes',
            description:
                'Web app predicting Dublin Bikes station availability using Machine-Learning models based on weather data and historical trends. Website not currently hosted.',
            techStack: ['Python', 'HTML5', 'Javascript', 'CSS', 'SQL'],
            webUrl: '',
            githubUrl: 'https://github.com/ItgelGanbold98/Dublin-Bikes-Website'
        },
        {
            title: 'Asteroids Game',
            photo: 'asteroids',
            description:
                '1979 Atari game Asteroids recreated in Java using JavaFX library. Game built from scratch, featuring modified levels for creative adaptation.',
            techStack: ['Java', 'Github'],
            webUrl: '',
            githubUrl:
                'https://github.com/ItgelGanbold98/Atari-Asteroids-Java-Game'
        },
        {
            title: 'Visualizing Physics',
            photo: 'visualizephysics',
            description:
                'This site introduces the fundamentals of Manim Python Library, a potent tool for visualizing mathematical and physics concepts. Website not currently hosted.',
            techStack: ['HTML5', 'Javascript', 'CSS', 'Python'],
            webUrl: '',
            githubUrl:
                'https://github.com/ItgelGanbold98/Visualizing-Physics-with-Python-Website/tree/main'
        }
    ];

    return (
        <div className="project-list-container">
            <h1 className="project-list-title">Projects</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <Project key={index} {...project} />
                ))}
            </div>
        </div>
    );
}

export default ProjectList;
