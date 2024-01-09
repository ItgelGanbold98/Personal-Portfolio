import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FaArrowCircleUp } from 'react-icons/fa';
import axios from 'axios';
import { ThemeContext } from '../../context';
import { IoMdChatbubbles } from 'react-icons/io';

const Chat = () => {
    const theme = useContext(ThemeContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const [isChatOpen, setIsChatOpen] = useState(true);

    const personalInfo = `I am a virtual assistant knowledgeable about Itgel Ganbold and I live 
    in his portfolio website, which contains his CV. My purpose is to provide information
    about him to potential employers, so he can get hired.
    He is a skilled software developer and tech enthusiast. Itgel holds a Master's in 
    Computer Science and a Bachelor's in Physics from University College Dublin. 
    Experienced in Python, Java, React JS, Docker, Kubernetes, Ruby other technologies, Itgel has worked 
    on projects such as a smart parking web application and an app for 
    city bike users. Passionate about technology, science, and video games, Itgel 
    enjoys exploring new advancements and engaging in creative problem-solving. 
    Feel free to ask me about Itgel's skills, experiences, or projects. I will keep my answers short. If 
    asked about something that isn't in this text, I will tell them to check Itgel's CV.`;

    useEffect(() => {
        if (isChatOpen) {
            setMessages([
                {
                    role: 'bot',
                    content:
                        "Hello 👋 I'm Itgel's assistant! Happy to answer questions about him. Ask me anything about his skills, experience, or projects. I'm powered by OpenAI GPT technology. 🌟"
                }
            ]);
        }
    }, []);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    useEffect(() => {
        console.log('Theme ', theme);
    }, [theme]);

    const sendMessageToServer = async (userInput) => {
        try {
            console.log('User message: ', userInput);
            const response = await axios.post(
                'https://f9812b964b4e5d803572b989ba342593.serveo.net/chat',
                {
                    message: userInput,
                    context: personalInfo
                }
            );
            console.log('Reply: ', response.data.message.content);
            return response.data.message.content;
        } catch (error) {
            console.error('Error sending message to server:', error);
            return 'Oops! Looks like my assistant is asleep 😴 Try again later!';
        }
    };

    const MAX_MESSAGES_PER_SESSION = 5;

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        // Check if the message limit has been reached
        if (messages.length >= MAX_MESSAGES_PER_SESSION * 2) {
            alert(
                `Sorry, only ${MAX_MESSAGES_PER_SESSION} messages allowed per session! 👮`
            );
            return;
        }

        // Add user message to chat
        const newUserMessage = { role: 'user', content: input };
        setMessages([...messages, newUserMessage]);

        // Send message to server and get response
        const botResponse = await sendMessageToServer(input);

        // Add bot response to chat
        const newBotMessage = { role: 'bot', content: botResponse };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);

        setInput('');
        inputRef.current.focus();
    };

    //For auto scrolling to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const inputRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isChatOpen && !event.target.closest('#chatContainerId')) {
                setIsChatOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () =>
            document.removeEventListener('mousedown', handleOutsideClick);
    }, [isChatOpen]);

    return (
        <>
            <ChatbotIcon
                onClick={toggleChat}
                isOpen={isChatOpen}
                style={{
                    backgroundColor: theme.state.darkMode
                        ? '#2b303d'
                        : 'aliceblue'
                }}
            >
                <IoMdChatbubbles
                    style={{
                        width: '50px',
                        height: '50px'
                    }}
                />
            </ChatbotIcon>
            <Container
                id="chatContainerId"
                isOpen={isChatOpen}
                style={{
                    backgroundColor: theme.state.darkMode ? '#2b303d' : 'white',
                    borderRadius: '10px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '300px',
                        overflow: 'auto',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: theme.state.darkMode && '#2b303d',
                        borderRadius: '10px'
                    }}
                >
                    {messages.map((message, index) =>
                        message.role === 'user' ? (
                            <UserMessageContainer key={index}>
                                <UserMessage>{message.content}</UserMessage>
                            </UserMessageContainer>
                        ) : (
                            <BotMessageContainer key={index}>
                                <BotMessage>{message.content}</BotMessage>
                            </BotMessageContainer>
                        )
                    )}
                    <div ref={messagesEndRef} />{' '}
                </div>
                <Form
                    onSubmit={sendMessage}
                    style={{
                        backgroundColor: theme.state.darkMode && '#282f40'
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about me!"
                        style={{
                            marginRight: '10px',
                            padding: '10px',
                            width: '200px',
                            height: '30px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            backgroundColor: theme.state.darkMode && '#242a3a',
                            color: theme.state.darkMode ? 'white' : 'black'
                        }}
                    />
                    <Button type="submit">
                        <FaArrowCircleUp
                            style={{
                                height: '50px',
                                width: '45px',
                                color: theme.state.darkMode ? 'black' : 'navy'
                            }}
                        />
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Chat;

const ChatbotIcon = styled.div`
    display: ${(props) => (props.isOpen ? 'none' : 'flex')};
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1001;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    z-index: 1000;
    width: 330px;
    color: black;
    padding: 0px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    border-radius: 10px;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    padding: 0;
    background-color: white;
`;

const UserMessageContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: auto;
    margin-bottom: 5px;
`;

const UserMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-wrap: break-word;
    word-break: break-word; /* This ensures words break to prevent overflow */
    background-color: aliceblue;
    width: 150px;
    height: auto;
    padding: 5px; /* Add some padding for better readability */
    border-radius: 10px; /* Optional: for rounded corners */
    font-size: small;
`;

const BotMessageContainer = styled.div`
    display: flex;
    justify-content: flex-start; // Align bot messages to the left
    width: 100%;
    margin-bottom: 5px;
    font-size: small;
`;

const BotMessage = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff0ff; // Different background for bot messages
    width: 150px;
    padding: 5px;
    border-radius: 10px;
`;
