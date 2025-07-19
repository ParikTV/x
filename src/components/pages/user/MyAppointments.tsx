import React from 'react';
import Swal from 'sweetalert2';
import '../../../styles/MyAppointments.css';

// Datos de ejemplo con diferentes estados
const allAppointments = [
  { id: 1, shopName: 'Barbería Don Juan', service: 'Corte de Cabello', date: '25 de Julio, 2025', time: '10:00 AM', status: 'Confirmada' },
  { id: 2, shopName: 'Clínica Dental Sonrisa Feliz', service: 'Limpieza Dental', date: '28 de Julio, 2025', time: '2:30 PM', status: 'Confirmada' },
  { id: 3, shopName: 'Hotel Montaña Azul', service: 'Reserva de Habitación Doble', date: '15 de Junio, 2025', time: 'N/A', status: 'Completada' },
  { id: 4, shopName: 'Restaurante El Buen Sabor', service: 'Reserva para Cena', date: '10 de Mayo, 2025', time: '8:00 PM', status: 'Completada' },
  { id: 5, shopName: 'Gimnasio FuerteFit', service: 'Clase de Yoga', date: '20 de Julio, 2025', time: '6:00 PM', status: 'Cancelada' },
  { id: 6, shopName: 'Spa Relajación Total', service: 'Masaje Relajante', date: '01 de Agosto, 2025', time: '4:00 PM', status: 'Confirmada' },
];

// Tarjeta individual para cada cita
const AppointmentCard = ({ appointment }: { appointment: typeof allAppointments[0] }) => {
    
    const handleCancel = () => {
        Swal.fire({
            title: '¿Cancelar Cita?',
            text: `¿Estás seguro de que quieres cancelar tu cita en ${appointment.shopName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f5365c', // Rojo consistente
            cancelButtonColor: '#6c757d', // Gris neutral
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí iría la lógica para actualizar el estado de la cita en el backend
                Swal.fire('¡Cancelada!', 'Tu cita ha sido cancelada.', 'success');
            }
        });
    };
    
    return (
        <div className="appointment-card">
            <div className="card-content">
                <h5 className="card-shop-name">{appointment.shopName}</h5>
                <p className="card-service"><i className="fas fa-bookmark"></i> {appointment.service}</p>
                <p className="card-date"><i className="fas fa-calendar-alt"></i> {appointment.date} - {appointment.time}</p>
            </div>
            <div className="card-actions">
                <button className="btn-details">Detalles</button>
                {appointment.status === 'Confirmada' && (
                    <button onClick={handleCancel} className="btn-cancel-action">Cancelar</button>
                )}
            </div>
        </div>
    );
};

// Componente principal que organiza las columnas
const MyAppointments = () => {
  const confirmed = allAppointments.filter(a => a.status === 'Confirmada');
  const completed = allAppointments.filter(a => a.status === 'Completada');
  const cancelled = allAppointments.filter(a => a.status === 'Cancelada');

  return (
    <div className="appointments-page">
      <h1 className="page-title">Panel de Citas</h1>
      <div className="appointments-dashboard">
        {/* Columna de Citas Confirmadas */}
        <div className="status-column">
          <header className="column-header confirmed">
            <i className="fas fa-check-circle"></i>
            <h2>Confirmadas ({confirmed.length})</h2>
          </header>
          <div className="column-body">
            {confirmed.length > 0 ? confirmed.map(app => <AppointmentCard key={app.id} appointment={app} />) : <p className="no-appointments">No tienes citas confirmadas.</p>}
          </div>
        </div>

        {/* Columna de Citas Completadas */}
        <div className="status-column">
          <header className="column-header completed">
            <i className="fas fa-history"></i>
            <h2>Completadas ({completed.length})</h2>
          </header>
          <div className="column-body">
            {completed.length > 0 ? completed.map(app => <AppointmentCard key={app.id} appointment={app} />) : <p className="no-appointments">No tienes citas completadas.</p>}
          </div>
        </div>

        {/* Columna de Citas Canceladas */}
        <div className="status-column">
          <header className="column-header cancelled">
            <i className="fas fa-times-circle"></i>
            <h2>Canceladas ({cancelled.length})</h2>
          </header>
          <div className="column-body">
            {cancelled.length > 0 ? cancelled.map(app => <AppointmentCard key={app.id} appointment={app} />) : <p className="no-appointments">No tienes citas canceladas.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;