import React, { useContext } from 'react';
import './toggle.css';
import {
    MdDarkMode as Darkmode,
    MdLightMode as Lightmode
} from 'react-icons/md';
import { ThemeContext } from '../../context';

const Toggle = () => {
    const theme = useContext(ThemeContext);
    const handleClick = () => {
        theme.dispatch({ type: 'TOGGLE' });
    };

    return (
        <div className="toggle">
            <Lightmode className="toggle-icon" onClick={handleClick} />
            <Darkmode className="toggle-icon" onClick={handleClick} />
            <div
                className="toggle-button"
                onClick={handleClick}
                style={{ left: theme.state.darkMode ? 0 : 25 }}
            ></div>
        </div>
    );
};

export default Toggle;
