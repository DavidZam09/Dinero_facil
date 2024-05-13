import React from 'react';
import logo from '../logo.svg'
import { NavLink } from 'react-router-dom';
const Login = () => {
    return (
        <div style={styles.container}>
            <form style={styles.form}>
                <div style={styles.logo}>
                <img src={logo} className="App-logo" alt="logo" />
                </div>
                <h2>Login</h2>
                <div style={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" style={styles.input} required />
                </div>
                <p>If you do not have an account, register  <NavLink to="/register"><a>here</a></NavLink></p>
                <NavLink to="/home">
                    <button type="submit" style={styles.button}>Ingresar</button>
                </NavLink>
            </form>
        </div>
    );
};

export default Login;

// Estilos en línea
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        width: '400px',
        maxWidth: '90%',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
    button: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    logo:{
        marginBottom: '15px',
    },
};
