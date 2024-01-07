import React, { useContext, useEffect, useState } from 'react';
import './intro.css';
import headShot from '../../img/backgroundImage.png';
import { ThemeContext } from '../../context';

function Intro() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const screenHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const newOpacity = 1 - scrollY / (screenHeight * 0.9);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const theme = useContext(ThemeContext);
    return (
        <div className="i">
            <div className="i-left">
                <div className="i-left-wrapper">
                    <h2 className="i-intro">Hi there! My name is</h2>
                    <h1 className="i-name">Itgel Ganbold</h1>
                    <div className="i-title">
                        <div className="i-title-wrapper">
                            <div className="i-title-item">
                                Software Engineer
                            </div>
                            <div className="i-title-item">Web Developer</div>
                            <div className="i-title-item">UI/UX Designer</div>
                            <div className="i-title-item">Data Scientist</div>
                        </div>
                    </div>
                    <p className="i-desc">
                        I am a recent MSc Computer Science graduate. A
                        passionate programmer specializing in Python,
                        JavaScript, React, Java, and much more! Explore my
                        projects and let's connect!
                    </p>
                </div>
            </div>
            <div className="i-right">
                <div className="i-bg" style={{ opacity: opacity }}></div>
                <img
                    src={headShot}
                    alt=""
                    className="i-img"
                    style={{ opacity: opacity }}
                />
            </div>
        </div>
    );
}

export default Intro;
