import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404</h1>
            <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
            <button onClick={goToHome} style={styles.button}>Go to Home</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    title: {
        fontSize: '6rem',
        color: '#FF6B6B',
        margin: 0,
    },
    message: {
        fontSize: '1.5rem',
        color: '#333',
        margin: '20px 0',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#FFF',
        backgroundColor: '#FF6B6B',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default NotFoundPage;
