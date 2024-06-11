import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';
import { useNavigate } from 'react-router-dom';
import AlertMsg from '../Alert/Alert';
import { FaMoneyCheckDollar } from "react-icons/fa6";
import './SideBar.css';
import { FaBars, FaHome, FaUser, FaHistory } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import ClientForm from '../DataFormClient/ClientForm';
import logo from '../logo.svg';
import axios from 'axios';
import CreditQuote from '../CreditQuote/CreditQuote';
import SolicitedCredit from '../CreditSolicitation/Credit';
import { MdRequestQuote } from "react-icons/md";
import CreditHistory from '../CreditHistory/CHistory';

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState(false);
    const [formCredit, setFormCredit] = useState(false);
    const [solicitedCredit, setSolicitedCredit] = useState(false);
    const [clientExists, setClientExists] = useState(false);
    const navigate = useNavigate(); // Usar useNavigate en lugar de history

    const isUserAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };
    const handleRedirect = () => {
        localStorage.clear();
        navigate('/login');
    };
    const goToHome = () => {
        navigate('/');
    };
    const closeFormClient = () => {
        setHistory(false)
    };

    const closeSolicitedCredit = () => {
        setSolicitedCredit(false)
    };

    const closeFormCredit = () => {
        setFormCredit(false)
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
    };

    const handleLogout = () => {
        logoutUser();
        handleRedirect(); // Usar navigate para redirigir a la página de inicio de sesión
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (label) => {
        switch (label) {
            case 'Inicio':
                goToHome()
                setHistory(false)
                setFormCredit(false)
                setIsOpen(false)
                setSolicitedCredit(false);
                break;
            case 'Datos Para credito':
                setHistory(true)
                setIsOpen(false)
                setFormCredit(false)
                setSolicitedCredit(false);
                break;
            case 'Solicitation':
                setSolicitedCredit(true);
                setFormCredit(false)
                setHistory(false)
                setIsOpen(false)
                break;
            case 'Credit':
                setSolicitedCredit(false);
                setFormCredit(true);
                setHistory(false)
                setIsOpen(false)
                break;
            case 'Cerrar sesión':
                handleLogout();
                break;
            default:
                console.log(`Botón "${label}" clickeado`);
                break;
        }
    };

    useEffect(() => {
        const checkClientExists = async () => {
            try {
                const clientId = localStorage.getItem('id');
                if (clientId) {
                    const response = await axios.get(`http://localhost:3000/cliente_info/lista_cliente_infoxcliente?id=${clientId}`);
                    if (response.data.successful) {
                        setClientExists(true);
                    } else {
                        setClientExists(false);
                    }
                }
            } catch (error) {
                console.error('Error al verificar la existencia del cliente:', error);
                alert('Error al verificar la existencia del cliente');
            }
        };

        checkClientExists();
    }, []);
    if (clientExists) {
        return <div className='app-container'>
            <header className='App-header'>
                {isUserAuthenticated() ? (
                    <Sidebar
                        sidebar={
                            <div className="sidebar-content">
                                <div className='logoContainer'>
                                    <img src={logo} className="logo" alt="logo" />
                                </div>
                                <div className="menu">
                                    <SidebarButton icon={<FaHome color="#03bb2b" />} label="Inicio" onClick={() => handleButtonClick('Inicio')} />

                                    <SidebarButton icon={<FaMoneyCheckDollar color="#03bb2b" />} label="Solicitar credito" onClick={() => handleButtonClick('Solicitation')} />

                                    <SidebarButton icon={<MdRequestQuote color="#03bb2b" />} label="Cotizar credito" onClick={() => handleButtonClick('Credit')} />

                                    <SidebarButton icon={<FaHistory color="#03bb2b" />} label="Historial de Creditos" onClick={() => handleButtonClick('Datos Para credito')} />

                                    <SidebarButton icon={<IoIosLogOut color="#03bb2b" />} label="Cerrar sesión" onClick={handleLogout} />
                                </div>
                            </div>
                        }
                        open={isOpen}
                        onSetOpen={toggleSidebar}
                        styles={{ sidebar: { background: '#FFFFFF', width: '250px' } }}
                    >
                        <div className="menu-toggle" onClick={toggleSidebar}>
                            <FaBars size={30} color="#FFFFFF" />
                        </div>
                    </Sidebar>
                ) : (
                    <AlertMsg
                        message="Hola! No tienes una sesion activa. Serás redirigido a la página de inicio de sesion en unos segundos."
                        redirectUrl="/login"
                        delay={5000}
                    />
                )}
            </header>
            <main className='main'>
                {solicitedCredit && <SolicitedCredit />}
                {formCredit && <CreditQuote onClose={closeFormCredit} />}
                {history && <CreditHistory onClose={closeFormClient} />}
            </main>
        </div>;
    }
    return (
        <div>
            <div className='content'>
                {isUserAuthenticated() ? (
                    <ClientForm />
                ) : (
                    <AlertMsg
                        message="Hola! No tienes una sesion activa. Serás redirigido a la página de inicio de sesion en unos segundos."
                        redirectUrl="/login"
                        delay={5000}
                    />
                )}
            </div>
        </div>
    );
};

const SidebarButton = ({ icon, label, onClick }) => {
    return (
        <div className="sidebar-button" onClick={onClick}>
            <div className="button-icon">{icon}</div>
            <div className="button-label">{label}</div>
        </div>
    );
};

export default SidebarMenu;
