import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import '../../../styles/AdminUserManagement.css';

// Datos de ejemplo de usuarios
const allUsers = [
  { id: 1, name: 'Alexandra Rodriguez', email: 'alexandra.r@ejemplo.com', role: 'Usuario', status: 'Activo', joined: '2024-01-15' },
  { id: 2, name: 'Juan Pérez', email: 'juan.perez@ejemplo.com', role: 'Usuario', status: 'Activo', joined: '2024-02-20' },
  { id: 3, name: 'María García', email: 'maria.g@ejemplo.com', role: 'Administrador', status: 'Activo', joined: '2023-11-10' },
  { id: 4, name: 'Carlos Sánchez', email: 'carlos.s@ejemplo.com', role: 'Usuario', status: 'Suspendido', joined: '2024-03-05' },
  { id: 5, name: 'Laura Martínez', email: 'laura.m@ejemplo.com', role: 'Usuario', status: 'Activo', joined: '2024-05-21' },
];

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra los usuarios según el término de búsqueda (nombre o email)
  const filteredUsers = useMemo(() =>
    allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );
  
  const handleSuspendUser = (userName: string) => {
      Swal.fire({
          title: `¿Suspender a ${userName}?`,
          text: "El usuario no podrá acceder a su cuenta.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, suspender',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              // Lógica para suspender al usuario en el backend
              Swal.fire('¡Suspendido!', `${userName} ha sido suspendido.`, 'success');
          }
      })
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-header">
        <h1>Gestión de Usuarios</h1>
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Fecha de Ingreso</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.joined}</td>
                  <td>
                    <span className={`status-badge status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn btn-view">Ver Perfil</button>
                    <button onClick={() => handleSuspendUser(user.name)} className="action-btn btn-suspend">Suspender</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-results">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;