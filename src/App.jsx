// import React, { useContext } from 'react';
// import './app.css';
// import Intro from './components/intro/Intro';
// import About from './components/about/About';
// import ProjectList from './components/projectList/ProjectList';
// import Contact from './components/contact/Contact';
// import Toggle from './components/toggle/Toggle';
// import { ThemeContext } from './context';
// import Preloader from './components/preloader/Preloader';

// const App = () => {
//     const theme = useContext(ThemeContext);
//     const darkMode = theme.state.darkMode;

//     return (
//         <>
//             <div
//                 className="webpage-container"
//                 style={{
//                     backgroundColor: darkMode ? '#191f2c' : 'white',
//                     color: darkMode && 'white'
//                 }}
//             >
//                 <Preloader />
//                 <div className="section">
//                     <Toggle />
//                     <Intro id="intro" />
//                 </div>
//                 <div className="section">
//                     <About id="about" />
//                 </div>
//                 <div className="section">
//                     <ProjectList id="projects" />
//                 </div>
//                 <div className="section">
//                     <Contact id="contact" />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default App;

import React, { useContext, useEffect, useState } from 'react';
import './app.css';
import Intro from './components/intro/Intro';
import About from './components/about/About';
import ProjectList from './components/projectList/ProjectList';
import Contact from './components/contact/Contact';
import Toggle from './components/toggle/Toggle';
import { ThemeContext } from './context';
import Preloader from './components/preloader/Preloader';

const App = () => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    }, []);

    useEffect(() => {
        console.log({ isLoading });
    }, [isLoading]);

    return (
        <div
            className="webpage-container"
            style={{
                backgroundColor: darkMode ? '#191f2c' : 'white',
                color: darkMode && 'white'
            }}
        >
            {isLoading && (
                <Preloader className="preloader" isLoading={isLoading} />
            )}
            {!isLoading && (
                <div className="webpage">
                    <div className="section">
                        <Toggle />
                        <Intro id="intro" />
                    </div>
                    <div className="section">
                        <About id="about" />
                    </div>
                    <div className="section">
                        <ProjectList id="projects" />
                    </div>
                    <div className="section">
                        <Contact id="contact" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
