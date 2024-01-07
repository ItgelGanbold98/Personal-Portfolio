import React, { useContext } from 'react';
import './project.css';
import {
    AiFillGithub as GithubIcon,
    AiOutlineLink as WeblinkIcon,
    AiFillHtml5 as HTML5Icon
} from 'react-icons/ai';
import {
    FaReact as ReactIcon,
    FaNode as NodejsIcon,
    FaPython as PythonIcon
} from 'react-icons/fa';
import {
    BiLogoPostgresql as PostgresqlIcon,
    BiLogoJava as JavaIcon,
    BiLogoJavascript as JavascriptIcon,
    BiLogoCss3 as CssIcon
} from 'react-icons/bi';
import { TbBrandThreejs as ThreejsIcon } from 'react-icons/tb';
import { GrMysql as SqlIcon } from 'react-icons/gr';

// TODO: Update Asteroids Project to Foodies
import { SiKubernetes, SiMongodb } from 'react-icons/si';
import automate from '../../img/automate.png';
import asteroids from '../../img/asteroids.png';
import dublinbikes from '../../img/dublinbikes.png';
import visualizephysics from '../../img/visualizephysics.png';
import { ThemeContext } from '../../context';

function Project(props) {
    const theme = useContext(ThemeContext);
    const { title, photo, description, techStack, webUrl, githubUrl } = props;
    const techStackIcons = {
        Java: JavaIcon,
        HTML5: HTML5Icon,
        React: ReactIcon,
        NodeJS: NodejsIcon,
        Python: PythonIcon,
        PostgreSQL: PostgresqlIcon,
        Javascript: JavascriptIcon,
        CSS: CssIcon,
        ThreeJS: ThreejsIcon,
        SQL: SqlIcon,
        Github: GithubIcon
    };

    const projectImages = {
        asteroids: asteroids,
        automate: automate,
        dublinbikes: dublinbikes,
        visualizephysics: visualizephysics
    };

    return (
        <div
            className="project-card"
            style={{
                backgroundColor: theme.state.darkMode ? '#2b303d' : 'white'
            }}
        >
            <a href={webUrl || githubUrl} target="_blank">
                <div className="project-card-img-container">
                    <img
                        src={projectImages[photo]}
                        alt={`${title} Project`}
                        className="project-image"
                    />
                </div>
            </a>

            <h2>{title}</h2>
            <p>{description}</p>
            <ul className="project-tech-list">
                {techStack.map((tech, index) => {
                    const TechIcon = techStackIcons[tech];
                    return (
                        <li key={index} className="project-tech">
                            <div className="tooltip-container">
                                {TechIcon && (
                                    <TechIcon className="tech-icons" />
                                )}
                                <span className="tooltip-text">{tech}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="project-links-container">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <div className="tooltip-container">
                        <GithubIcon className="project-links" />
                        <span className="tooltip-text">
                            Link to Project Github
                        </span>
                    </div>
                </a>
                {webUrl && (
                    <a href={webUrl} target="_blank" rel="noopener noreferrer">
                        <div className="tooltip-container">
                            <WeblinkIcon className="project-links" />
                            <span className="tooltip-text">
                                Link to Project Website
                            </span>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}

export default Project;
