import React, { useContext } from 'react';
import './about.css';
import myPic from '../../img/profile_pic.png';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { ThemeContext } from '../../context';

function About() {
    const theme = useContext(ThemeContext);

    return (
        <div className="a">
            <div className="a-left">
                <div
                    className="a-card bg"
                    style={{
                        backgroundColor: theme.state.darkMode
                            ? '#0e111a'
                            : '#333'
                    }}
                ></div>
                <div className="a-card">
                    <img src={myPic} alt="" className="a-img" />
                </div>
            </div>
            <div className="a-right">
                <h1 className="a-title">About Me</h1>
                <p className="a-sub">
                    MSc Computer Science, BSc Theoretical Physics
                </p>
                <p className="a-desc">
                    I'm a Computer Science enthusiast with a Master's degree and
                    a solid foundation in Theoretical Physics from my
                    Bachelor's. My academic journey has fueled my passion for
                    problem-solving, leading me to explore the realms of
                    technology, coding, and mathematics. My goal is to
                    contribute my skills and knowledge to the industry as a
                    software engineer or data scientist. I'm excited about the
                    dynamic nature of technology and how it continually reshapes
                    our world. Through my projects and academic achievements,
                    I've cultivated a deep appreciation for the intersection of
                    theory and application.
                </p>
                <div className="a-socials">
                    <div className="tooltip-container">
                        <a
                            href="https://github.com/ItgelGanbold98"
                            target="_blank"
                        >
                            <AiFillGithub
                                className="a-socials-icon"
                                style={{
                                    color: theme.state.darkMode
                                        ? 'white'
                                        : 'black'
                                }}
                            />
                        </a>
                        <span className="tooltip-text">Visit my Github</span>
                    </div>
                    <div className="tooltip-container">
                        <a
                            href="https://www.linkedin.com/in/itgel-ganbold"
                            target="_blank"
                        >
                            <AiFillLinkedin
                                className="a-socials-icon"
                                style={{
                                    color: theme.state.darkMode
                                        ? 'white'
                                        : 'black'
                                }}
                            />
                        </a>
                        <span className="tooltip-text">Visit my LinkedIn</span>
                    </div>

                    <a
                        className="a-socials-icon button"
                        href="https://drive.google.com/drive/folders/17Nkl9c1-WWDXvCjEhkckcCCatm2DTHor?usp=sharing"
                        target="_blank"
                    >
                        Resume/CV
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
