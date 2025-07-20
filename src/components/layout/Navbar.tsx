import React, { useState, useEffect, useRef } from "react"; // Añadido useRef
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/navbar.css";
import { animate } from "animejs"; // Importar 'animate' de animejs

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navbarBrandRef = useRef(null); // Ref para animar el logo/marca de la navbar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Animación del menú móvil al abrir/cerrar
    if (!isMenuOpen) {
      animate('.navbar-menu', {
        translateX: ['100vw', '0'], // Deslizar desde fuera de la pantalla
        opacity: [0, 1],
        duration: 700, // Aumentar la duración para que sea más visible
        easing: 'easeOutElastic(1, .6)', // Un efecto elástico más pronunciado
      });
    } else {
      animate('.navbar-menu', {
        translateX: ['0', '100vw'], // Deslizar fuera de la pantalla
        opacity: [1, 0],
        duration: 700,
        easing: 'easeInBack(0.8)', // Deslizar hacia atrás antes de salir
      });
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); // Cierra el menú al navegar
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animación del título "BookingStore" al cargar la navbar
  useEffect(() => {
    if (navbarBrandRef.current) {
      animate(navbarBrandRef.current, {
        translateY: [-50, 0],       // Desplazamiento inicial mayor
        scale: [0.5, 1],            // Escalar desde la mitad de su tamaño
        opacity: [0, 1],            // Fundido de entrada
        duration: 1200,             // Mayor duración
        delay: 300,                 // Pequeño retraso al inicio
        easing: 'easeOutBounce()',  // Un efecto de rebote al final
      });
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  // Simulación: Comprobar si el usuario es admin (en una app real, esto vendría del estado de autenticación)
  const isAdmin = true; 

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand" ref={navbarBrandRef}> {/* Añadida la referencia */}
          <button
            onClick={() => handleNavigation("/")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <h2 style={{ color: "var(--white)", margin: 0 }}>BookingStore</h2>
          </button>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavigation("/")}
                style={{ background: "none", border: "none" }}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavigation("/negocio/1")}
                style={{ background: "none", border: "none" }}
              >
                Business #1
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavigation("/negocio/2")}
                style={{ background: "none", border: "none" }}
              >
                Business #2
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
                style={{ background: "none", border: "none" }}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
                style={{ background: "none", border: "none" }}
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="navbar-actions">
            {/* Botón condicional para Admin */}
            {isAdmin && (
              <button
                className="btn-admin" 
                onClick={() => handleNavigation("/admin/users")}
              >
                Panel Admin
              </button>
            )}
            <button
              className="btn-login"
              onClick={() => handleNavigation("/mis-citas")}
            >
              Mis Citas
            </button>
            <button
              className="btn-login"
              onClick={() => handleNavigation("/profile")}
            >
              Mi Perfil
            </button>
            <button
              className="btn-login"
              onClick={() => handleNavigation("/forms/login")}
            >
              Login
            </button>
            <button
              className="btn-signup"
              onClick={() => handleNavigation("/forms/registersusers")}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;