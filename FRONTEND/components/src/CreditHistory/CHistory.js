import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CHistory.css';
import AlertMsg from '../Alert/Alert';
import useApiRequest from '../Request/Request';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';

const UPDATE_ALLOWED_STATE_ID = 2;

const CreditHistory = ({ onClose }) => {
    const [id, setId] = useState('');
    const [showAlert2, setShowAlert2] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [selectedCredit, setSelectedCredit] = useState(null);
    const [cuotasPago, setCuotasPago] = useState([]);
    const [soportePago, setSoportePago] = useState('');
    const [selectedCuotaId, setSelectedCuotaId] = useState(null);
    const [nextPaymentDate, setNextPaymentDate] = useState(null);

    const { apiRequest, useFetchData, isLoading } = useApiRequest();

    useEffect(() => {
        const clientId = localStorage.getItem('id');
        if (clientId) setId(clientId);
    }, []);

    const { data: creditos, loading: creditosLoading, error: creditosError } = useFetchData(
        id ? `http://localhost:3000/creditos/historial_creditos?id=${id}` : null
    );

    const { data: estadosPago } = useFetchData('http://localhost:3000/creditos/lista_credito_estados');

    useEffect(() => {
        if (creditos && creditos.length > 0) {
            const firstCredit = creditos[0];
            axios.get(`http://localhost:3000/creditos/lista_credito_pago?id=${firstCredit.id}`)
                .then(response => {
                    if (response.data && response.data.successful) {
                        const cuotas = response.data.data;
                        setCuotasPago(cuotas);
                        const nextPayment = cuotas.find(cuota => cuota.id_credito_pago_estado === 1);
                        if (nextPayment) setNextPaymentDate(nextPayment.fecha_estimada_pago);
                    } else {
                        toast.error("Hubo un problema al obtener los datos del crédito.");
                    }
                })
                .catch(() => toast.error("Hubo un problema al obtener los datos del crédito."));
        }
    }, [creditos]);

    const openModal = (credito) => {
        setSelectedCredit(credito);
        setIsOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSoportePago(file);
        if (file) {
            toast.success('Archivo subido exitosamente');
        }
    };

    const openModalUpdate = async (credito) => {
        setSelectedCredit(credito);
        setIsOpen(false);
        if (credito.id_credito_estado === UPDATE_ALLOWED_STATE_ID) {
            setModalUpdateIsOpen(true);
            await fetchCuotaId(credito.id);
        } else {
            setShowAlert2(true);
        }
    };

    const fetchCuotaId = async (creditoId) => {
        try {
            const response = await axios.get(`http://localhost:3000/creditos/lista_credito_pago?id=${creditoId}`);
            if (response.data && response.data.successful) {
                const cuota = response.data.data.find(cuota => cuota.id_credito_pago_estado === 1);
                setSelectedCuotaId(cuota ? cuota.id : null);
            } else {
                toast.error("Hubo un problema al obtener los datos del crédito.");
            }
        } catch {
            toast.error("Hubo un problema al obtener los datos del crédito.");
        }
    };

    const closeModal = () => setIsOpen(false);
    const closeModalUpdate = () => {
        setModalUpdateIsOpen(false);
        setSelectedCredit(null);
        setSoportePago('');
        setSelectedCuotaId(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', selectedCuotaId);
        formData.append('soporte_pago', soportePago);

        try {
            const response = await axios.post('http://localhost:3000/creditos/update_credito_pagoxcliente', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data && response.data.successful) {
                toast.success('Pago actualizado exitosamente');
                closeModalUpdate();
            } else {
                toast.error('Hubo un problema al actualizar el pago');
            }
        } catch {
            toast.error('Hubo un problema al actualizar el pago');
        }
    };

    const formatCurrency = (value) => {
        if (value === undefined || value === null) return "$0";
        return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const obtenerNombreEstadoPagoPorId = (id) => {
        const estado = estadosPago?.find(estado => estado.id === id);
        return estado ? estado.nombre_credito_tipo : null;
    };

    const obtenerColorEstado = (id) => {
        switch (id) {
            case 1: return 'gray';
            case 2: return 'blue';
            case 3: return 'red';
            case 4: return 'green';
            default: return 'blue';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div>
            <div className='client-form-container'>
                {creditosLoading ? (
                    <p>Cargando datos...</p>
                ) : creditosError ? (
                    <AlertMsg message="Hubo un problema al obtener los datos del crédito." />
                ) : (
                    creditos && (
                        <div>
                            <h2>Historial de Crédito</h2>
                            <table className='credit-table'>
                                <thead>
                                    <tr>
                                        <th>Valor Crédito</th>
                                        <th>Estado</th>
                                        <th>Próximo pago</th>
                                    </tr>
                                </thead>
                                <tbody data-tooltip-id="tooltip" data-tooltip-content="Haz click en cualquiera de los elementos de la tabla para ver los detalles">
                                    {creditos.map((credito, index) => (
                                        <tr key={index} onClick={() => openModal(credito)} data-tip="Haz clic para ver los detalles del crédito">
                                            <td>{formatCurrency(credito.valor_credito)}</td>
                                            <td>
                                                <span className='estado-color' style={{ backgroundColor: obtenerColorEstado(credito.id_credito_estado) }}></span>
                                                {obtenerNombreEstadoPagoPorId(credito.id_credito_estado)}
                                            </td>
                                            <td>{nextPaymentDate ? formatDate(nextPaymentDate) : 'No disponible'}</td>
                                            <Tooltip id="tooltip" />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='button-container'>
                                <button type="button" onClick={onClose}>Cerrar</button>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="client-detail-container"
                overlayClassName="modal-overlay"
                contentLabel="Credit Details Modal"
            >
                {selectedCredit && (
                    <div>
                        <h2>Detalles del Crédito</h2>
                        {Object.entries({
                            "Nombres": selectedCredit.nombres_cliente,
                            "Apellidos": selectedCredit.apellidos_cliente,
                            "Email": selectedCredit.email,
                            "Num Celular": selectedCredit.num_celular,
                            "Valor Crédito": formatCurrency(selectedCredit.valor_credito),
                            "Tipo Cobro": selectedCredit.tipo_cobro,
                            "Num Cuenta": selectedCredit.num_cuenta,
                            "Tipo Cuenta": selectedCredit.tipo_cuenta,
                            "Num Cuotas": selectedCredit.num_cuotas,
                            "Valor Interés": formatCurrency(selectedCredit.valor_interes),
                            "Valor Interés Mora": formatCurrency(selectedCredit.valor_interes_mora),
                            "Val Descu Ref": formatCurrency(selectedCredit.val_descu_ref),
                            "Frecuencia Cobro": selectedCredit.frecuencia_cobro,
                            "Banco": selectedCredit.nombre_credito_bancos,
                            "Fec Desembolso": selectedCredit.fec_desembolso,
                            "Fec Paz y Salvo": selectedCredit.fec_pazysalvo,
                            "Nota Admin": selectedCredit.nota_admin,
                            "Nota Cliente": selectedCredit.nota_cliente,
                            "Estado": selectedCredit.nombre_credito_tipo
                        }).map(([label, value]) => (
                            <div className="detail-container" key={label}>
                                <p><strong>{label}:</strong> {value}</p>
                            </div>
                        ))}
                        <div>
                            <h3>Cuotas de Pago</h3>
                            <table className='payment-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Estado</th>
                                        <th>Fecha Estimada</th>
                                        <th>Fecha Pago</th>
                                        <th>Soporte Pago</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cuotasPago.map((cuota) => (
                                        <tr key={cuota.id}>
                                            <td>{cuota.num_pago}</td>
                                            <td>{cuota.nombre_estado_pago}</td>
                                            <td>{formatDate(cuota.fecha_estimada_pago)}</td>
                                            <td>{cuota.fecha_pago ? formatDate(cuota.fecha_pago) : 'No Pagado'}</td>
                                            <td>{cuota.soporte_pago ? <a href={cuota.soporte_pago} target="_blank" rel="noopener noreferrer">Ver Soporte</a> : 'No Disponible'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='button-container'>
                            <button type="button" onClick={closeModal}>Cerrar</button>
                            <button
                                onClick={() => openModalUpdate(selectedCredit)}
                                disabled={selectedCredit.id_credito_estado !== UPDATE_ALLOWED_STATE_ID}
                            >
                                Actualizar Pago
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
            {showAlert2 && <AlertMsg message={'Actualización de pago no permitida para el estado actual del crédito.'}></AlertMsg>}
            <Modal
                isOpen={modalUpdateIsOpen}
                onRequestClose={closeModalUpdate}
                className="client-modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Credit Update Modal"
            >
                {selectedCredit && (
                    <div>
                        <h2>Actualizar Pago del Crédito</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input type="hidden" name="id" value={selectedCuotaId || ''} />
                            <div className="file-input">
                                <input
                                    className=''
                                    type="file"
                                    id="soporte_pago"
                                    name="soporte_pago"
                                    onChange={handleFileChange}
                                    required
                                />
                                <label htmlFor="soporte_pago" className="upload-icon">
                                    <i className="fas fa-cloud-upload-alt"></i> Subir archivo
                                </label>
                            </div>
                            {soportePago && <p>Ya tienes un archivo subido pero puedes subir otro si no estás seguro</p>}
                            <div className='button-container'>
                                <button type="submit">Enviar</button>
                                <button type="button" onClick={closeModalUpdate}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CreditHistory;
