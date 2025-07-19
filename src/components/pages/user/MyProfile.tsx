import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // 1. Importar SweetAlert2
import '../../../styles/MyProfile.css';

const MyProfile = () => {
  // Estado para la información actual del formulario
  const [userInfo, setUserInfo] = useState({
    name: 'Alexandra Rodriguez',
    email: 'alexandra.r@ejemplo.com',
    phone: '+506 8888-8888',
    address: 'San José, Costa Rica',
    bio: 'Apasionada por el desarrollo de software y el diseño de experiencias de usuario intuitivas y atractivas.'
  });

  // Estado para guardar una copia de la información original antes de editar
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({ ...prevState, [name]: value }));
  };

  // Activa el modo de edición y guarda el estado actual
  const handleEdit = () => {
    setOriginalUserInfo(userInfo); // Guarda una copia del estado actual
    setIsEditing(true);
  };

  // Muestra una alerta de confirmación antes de cancelar
  const handleCancel = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Los cambios no guardados se perderán.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, descartar cambios',
      cancelButtonText: 'Seguir editando'
    }).then((result) => {
      if (result.isConfirmed) {
        setUserInfo(originalUserInfo); // Restaura la información original
        setIsEditing(false);
      }
    });
  };

  // Guarda los cambios y muestra una notificación de éxito
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Información guardada:', userInfo);

    Swal.fire({
      title: '¡Guardado!',
      text: 'Tu perfil ha sido actualizado con éxito.',
      icon: 'success',
      timer: 2000, // La alerta se cierra después de 2 segundos
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  return (
    <div className="profile-background">
      <div className="profile-card">
        <header className="profile-header">
            {/* ... el código de la cabecera no cambia ... */}
            <div className="profile-header-background"></div>
            <div className="profile-avatar-container">
                <img src="https://i.pravatar.cc/150?img=26" alt="Avatar de Usuario" className="profile-avatar" />
            </div>
            <div className="profile-user-info">
                <h2>{userInfo.name}</h2>
                <p className="user-email">{userInfo.email}</p>
            </div>
            {!isEditing && (
                <button onClick={handleEdit} className="btn btn-edit">
                <i className="fas fa-pencil-alt"></i> Editar Perfil
                </button>
            )}
        </header>

        {/* ... el código de las estadísticas no cambia ... */}
        <section className="profile-stats">
            <div className="stat-item"><span className="stat-value">12</span><span className="stat-label">Reservas</span></div>
            <div className="stat-item"><span className="stat-value">5</span><span className="stat-label">Comercios Favoritos</span></div>
            <div className="stat-item"><span className="stat-value">8</span><span className="stat-label">Reseñas</span></div>
        </section>

        <main className="profile-body">
          <form onSubmit={handleSave}>
            {/* ... el código del formulario no cambia ... */}
            <div className="form-row">
              <div className="form-group"><label htmlFor="name"><i className="fas fa-user"></i> Nombre Completo</label><input type="text" id="name" name="name" value={userInfo.name} onChange={handleInputChange} disabled={!isEditing} /></div>
              <div className="form-group"><label htmlFor="email"><i className="fas fa-envelope"></i> Correo Electrónico</label><input type="email" id="email" name="email" value={userInfo.email} onChange={handleInputChange} disabled={!isEditing} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="phone"><i className="fas fa-phone"></i> Teléfono</label><input type="tel" id="phone" name="phone" value={userInfo.phone} onChange={handleInputChange} disabled={!isEditing} /></div>
              <div className="form-group"><label htmlFor="address"><i className="fas fa-map-marker-alt"></i> Dirección</label><input type="text" id="address" name="address" value={userInfo.address} onChange={handleInputChange} disabled={!isEditing} /></div>
            </div>
            <div className="form-group"><label htmlFor="bio"><i className="fas fa-book-open"></i> Biografía</label><textarea id="bio" name="bio" rows={4} value={userInfo.bio} onChange={handleInputChange} disabled={!isEditing}></textarea></div>
            
            {isEditing && (
              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn btn-cancel">Cancelar</button>
                <button type="submit" className="btn btn-save">Guardar Cambios</button>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;