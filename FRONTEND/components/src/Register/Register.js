import React, { useState } from 'react';
import logo from '../logo.svg'
import { NavLink } from 'react-router-dom';
import Modal from '../genericModal/Modal';
const Register = () => {
    const [formData, setFormData] = useState({
        cod_referido: '',
        email: '',
        password: '',
        num_celular: ''
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const queryString = `cod_referido=${formData.cod_referido}&email=${formData.email}&password=${formData.password}&num_celular=${formData.num_celular}`;

        try {
            const response = await fetch(`http://localhost:3000/clientes/registrar_cliente?${queryString}`);

            if (response.ok) {
                const data = await response.json();
                if (data.errors && data.errors.length > 0) {
                    setErrorMessages(data.errors);
                    setModalIsOpen(true);
                } else {
                    console.log('Cliente registrado correctamente');
                    setErrorMessages([]);
                }
            } else {
                throw new Error('Error al registrar cliente');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud GET:', error);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.logo}>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <h2>Registrarse</h2>
                <div style={styles.formGroup}>
                    <label htmlFor="cod_referido">No. Referido</label>
                    <input type="number" id="cod_referido" name="cod_referido" value={formData.cod_referido} placeholder="Numero de referido" onChange={handleInputChange} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} style={styles.input} onChange={handleInputChange} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="num_celular">Numero de telefono</label>
                    <input type="number" id="num_celular" name="num_celular" placeholder="Numero de Telefono" style={styles.input} value={formData.num_celular} onChange={handleInputChange} required />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Contraseña" style={styles.input} value={formData.password} onChange={handleInputChange} required />
                </div>
                <p>If you have an account, login  <NavLink to="/"><a>here</a></NavLink></p>
                <button type="submit" style={styles.button}>Enviar</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                errors={errorMessages}
            />
        </div>
    );
};

export default Register;

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
    logo: {
        marginBottom: '15px',
    },
};
