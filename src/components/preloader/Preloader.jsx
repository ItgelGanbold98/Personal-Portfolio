// import React, { useEffect, useState } from 'react';
// import './Preloader.css';

// const Preloader = ({ isLoading }) => {
//     useEffect(() => {
//         console.log(isLoading, ' from preloader component');
//     }, [isLoading]);

//     const [toDismount, setToDismount] = useState(false);

//     useEffect(() => {
//         if (isLoading === false) {
//             setTimeout(() => {
//                 setToDismount(true);
//             }, 1500);
//         }
//     }, [isLoading]);

//     return (
//         <div
//             className={`${
//                 isLoading ? 'preloader-fade-in' : 'preloader-fade-out'
//             }`}
//         >
//             <div className="wrapper">
//                 <div className="typing-text-Hi fade-in-delayed">Hi, </div>
//                 <div className="typing-text-welcome fade-in-delayed">
//                     welcome to my portfolio
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Preloader;

import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ isLoading }) => {
    const [toDismount, setToDismount] = useState(false);

    useEffect(() => {
        if (isLoading === false) {
            setTimeout(() => {
                setToDismount(true);
            }, 1500);
        }
    }, [isLoading]);

    return (
        <div
            className={`preloader-container ${
                toDismount ? 'fade-out-delayed' : ''
            }`}
        >
            <div className="wrapper">
                <div
                    className={`typing-text-Hi ${
                        toDismount ? 'fade-out-delayed' : ''
                    }`}
                >
                    Hi,{' '}
                </div>
                <div
                    className={`typing-text-welcome ${
                        toDismount ? 'fade-out-delayed' : ''
                    }`}
                >
                    welcome to my portfolio
                </div>
            </div>
        </div>
    );
};

export default Preloader;
