import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectCreditValue from '../SelectValueCredit/ValueCredit';
import './CreditQuote.css';
import AlertMsg from '../Alert/Alert';

const CreditQuote = ({ onClose }) => {
    const [numCuotas, setNumCuotas] = useState('');
    const [fecDesembolso, setFecDesembolso] = useState('');
    const [id, setId] = useState('');
    const [creditData, setCreditData] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [viewQuote, setviewQuote] = useState(true);
    const handleSelectedChange = (value) => {
        setId(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const queryString = `id=${id}&num_cuotas=${numCuotas}&fec_desembolso=${fecDesembolso}`;

        try {
            const response = await axios.get(`http://localhost:3000/creditos/cotizacion_credito?${queryString}`);
            if (response.data && response.data.successful) {
                setCreditData(response.data.data);
                setShowAlert(false);
                setviewQuote(false);
            } else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error fetching credit data:', error);
            setShowAlert(true);
        }
    };
    const handleopenview = () => {
        setviewQuote(true);
    }
    function formatCurrency(value) {
        // Formatea el valor con el signo de pesos y separadores de miles
        return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    if (viewQuote) {
        return (
            <div className='client-form-overlay'>
                <div className='client-form-container'>

                    <h2>Client Form</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="numCuotas" className="input-label">Número de Cuotas:
                                <input
                                    type="number"
                                    id="numCuotas"
                                    value={numCuotas}
                                    onChange={(e) => setNumCuotas(e.target.value)}
                                /></label>

                        </div>
                        <div>
                            <label htmlFor="fecDesembolso" className="input-label">Fecha de Desembolso:
                                <input
                                    type="date"
                                    id="fecDesembolso"
                                    value={fecDesembolso}
                                    onChange={(e) => setFecDesembolso(e.target.value)}
                                /></label>

                        </div>
                        <div>
                            <SelectCreditValue onValueChange={handleSelectedChange} />
                        </div>
                        <div className='button-container'>
                            <button type="submit">Enviar</button>
                            <button type="button" onClick={onClose}>Cerrar</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
    return (<div className='data-window'>
        {showAlert && <AlertMsg message="Hubo un problema al obtener los datos del crédito." />}
        {creditData && (
            <div >
                <h2>Cotizacion de Crédito</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Valor del Préstamo</th>
                            <td>{formatCurrency(creditData.valor_prestamo)}</td>
                        </tr>
                        <tr>
                            <th>Interés</th>
                            <td>{formatCurrency(creditData.interes)}</td>
                        </tr>
                        <tr>
                            <th>Interés por Mora</th>
                            <td>{formatCurrency(creditData.interes_mora)}</td>
                        </tr>
                        <tr>
                            <th>Total Pagado</th>
                            <td>{formatCurrency(creditData.total_pagado)}</td>
                        </tr>
                        <tr>
                            <th>Número de Cuotas</th>
                            <td>{creditData.num_cuotas}</td>
                        </tr>
                        <tr>
                            <th>Fecha de Desembolso</th>
                            <td>{new Date(creditData.fecha_desembolso).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <th>Frecuencia de Cobro</th>
                            <td>{creditData.frecuencia_cobro}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Cuotas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Monto</th>
                            <th>Interés</th>
                            <th>Subtotal</th>
                            <th>Fecha de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creditData.cuotas.map((cuota, index) => (
                            <tr key={index}>
                                <td>{cuota.n_cuota}</td>
                                <td>{formatCurrency(cuota.cuota)}</td>
                                <td>{formatCurrency(cuota.interes)}</td>
                                <td>{formatCurrency(cuota.subtotal)}</td>
                                <td>{new Date(cuota.fecha_pago_cuota).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='button-container'>
                    <button type="button" onClick={handleopenview}>Close Form</button>
                </div>
            </div>

        )}
    </div>);

};

export default CreditQuote;
