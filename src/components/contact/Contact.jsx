import React, { useEffect, useRef, useState, useContext } from 'react';
import './contact.css';
import { BsFillTelephoneFill as PhoneIcon } from 'react-icons/bs';
import { AiTwotoneMail as EmailIcon } from 'react-icons/ai';
import { FaMapMarked as LocationIcon } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { ThemeContext } from '../../context';

function Contact() {
    const theme = useContext(ThemeContext);
    const formRef = useRef();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_subject: '',
        user_message: ''
    });
    const [done, setDone] = useState(false);

    const handleInputChange = (e) => {
        setDone(false);
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        console.log({ done }), console.log({ formData });
    }, [done, formData]);

    const handleSubmit = (e) => {
        e.preventDefault(); //to stop page refress on submit
        console.log(formData.user_email);
        if (
            formData.user_email &&
            formData.user_subject &&
            formData.user_name &&
            formData.user_message
        ) {
            emailjs
                .sendForm(
                    'service_5mi5qe9',
                    'template_811ptzb',
                    formRef.current,
                    'gyAfJXngzlCh6UfL-'
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setDone(true);
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        } else {
            window.alert('Please make sure you have filled in each field!');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-bg">
                <div className="contact-wrapper">
                    <div className="contact-left">
                        <h1 className="contact-title">Get in touch!</h1>

                        <div className="contact-info">
                            <div className="contact-info-item">
                                <a
                                    className="contact-info-link"
                                    href="tel:+353838605626"
                                    target="_blank"
                                    style={{
                                        color: theme.state.darkMode
                                            ? 'white'
                                            : 'black'
                                    }}
                                >
                                    <PhoneIcon className="icon" />
                                    (+353) 0838605626
                                </a>
                            </div>
                            <div className="contact-info-item">
                                <a
                                    className="contact-info-link"
                                    href="mailto:itgel.ganbold@ucdconnect.ie"
                                    target="_blank"
                                    style={{
                                        color: theme.state.darkMode
                                            ? 'white'
                                            : 'black'
                                    }}
                                >
                                    <EmailIcon className="icon" />
                                    itgel.ganbold@ucdconnect.ie
                                </a>
                            </div>
                            <div className="contact-info-item">
                                <a
                                    className="contact-info-link"
                                    href="https://goo.gl/maps/vcNP6vByr6H1GXTX6"
                                    target="_blank"
                                    style={{
                                        color: theme.state.darkMode
                                            ? 'white'
                                            : 'black'
                                    }}
                                >
                                    <LocationIcon className="icon" />
                                    Dublin, Ireland
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="contact-right">
                        <p className="contact-description">
                            <b>Thank you for visiting my portfolio!</b> I'm
                            actively seeking programming opportunities in the
                            industry. If you're looking for a dedicated team
                            member who can contribute fresh perspectives and
                            coding skills, let's connect!
                        </p>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                name="user_name"
                                onChange={handleInputChange}
                                style={{
                                    color: theme.state.darkMode && 'white',
                                    border: theme.state.darkMode && 'none',
                                    backgroundColor:
                                        theme.state.darkMode && '#2b303d'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                name="user_subject"
                                onChange={handleInputChange}
                                style={{
                                    color: theme.state.darkMode && 'white',
                                    border: theme.state.darkMode && 'none',
                                    backgroundColor:
                                        theme.state.darkMode && '#2b303d'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                name="user_email"
                                onChange={handleInputChange}
                                style={{
                                    color: theme.state.darkMode && 'white',
                                    border: theme.state.darkMode && 'none',
                                    backgroundColor:
                                        theme.state.darkMode && '#2b303d'
                                }}
                            />
                            <textarea
                                rows="5"
                                placeholder="Message"
                                name="user_message"
                                onChange={handleInputChange}
                                style={{
                                    border: theme.state.darkMode && 'none',
                                    color: theme.state.darkMode && 'white',
                                    backgroundColor:
                                        theme.state.darkMode && '#2b303d'
                                }}
                            />
                            <button>Submit</button>
                            {done && 'Email sent successfully!'}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
