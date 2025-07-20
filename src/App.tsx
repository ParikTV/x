import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NegociosEspecificosPorCategoria from "./components/pages/company/Negocios_Especificos_por_categoria";
import NegocioEspecifico from "./components/pages/company/Negocio_Especifico";
import Login from "./components/pages/forms/login/Login";
import Register from "./components/pages/forms/registers/registerenterprise";
import MyProfile from "./components/pages/user/MyProfile";
import MyAppointments from "./components/pages/user/MyAppointments";
import AdminUserManagement from "./components/pages/admin/AdminUserManagement";
import RegisterUser from "./components/pages/forms/registers/registeruser";

// Importar funciones específicas de Anime.js
import { animate, stagger } from "animejs";

// Importar imágenes
import ClinicImg from "./assets/images/Clinics.png";
import RestaurantImg from "./assets/images/Restaurant.png";
import HotelImg from "./assets/images/Hotels.png";
import BarbershopImg from "./assets/images/Barbershop.png";
import EmpresaBanner from "./assets/images/empresa.jpg";
import CarouselImg1 from "./assets/images/1.png";
import CarouselImg2 from "./assets/images/2.png";
import CarouselImg3 from "./assets/images/3.png";

const carouselImages = [CarouselImg1, CarouselImg2, CarouselImg3];

function HomePage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Referencias para animaciones
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriaCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const carouselImageRef = useRef<HTMLImageElement>(null);

  // Datos de las categorías con nombres
  const categorias = [
    { id: 1, nombre: "Restaurantes", imagen: RestaurantImg },
    { id: 2, nombre: "Clínicas", imagen: ClinicImg },
    { id: 3, nombre: "Barberías", imagen: BarbershopImg },
    { id: 4, nombre: "Hoteles", imagen: HotelImg },
  ];

  const handleNavigateToCategoria = (categoryId: number) => {
    navigate(`/categoria/${categoryId}`);
  };

  // Animaciones al cargar
  useEffect(() => {
    if (titleRef.current) {
      // ✅ CORREGIDO: El objetivo va primero, luego las propiedades
      animate(titleRef.current, {
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
      });
    }

    if (bannerRef.current) {
        // ✅ CORREGIDO
        animate(bannerRef.current, {
          translateY: [-50, 0],
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeOutQuad',
          delay: 200,
        });
      }

    if (categoriaCardsRef.current) {
        // ✅ CORREGIDO
        animate(categoriaCardsRef.current, {
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: stagger(100, { start: 500 }),
            easing: 'easeOutBack',
          });
    }
  }, []);

  // Lógica del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animación del carrusel al cambiar de imagen
  useEffect(() => {
    if (carouselImageRef.current) {
      // ✅ CORREGIDO
      animate(carouselImageRef.current, {
        opacity: [0, 1],
        scale: [1.05, 1],
        duration: 1200,
        easing: 'easeInOutQuad',
      });
    }
  }, [currentImageIndex]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <main className="main-content">
      <div className="hero-section">
        <h1 ref={titleRef}>Encuentra y Reserva Servicios Fácilmente</h1>
        <p>Explora una amplia gama de negocios locales y agenda tu próxima cita con solo unos clics.</p>
      </div>

      <div className="carousel-container">
        <img
          ref={carouselImageRef}
          src={carouselImages[currentImageIndex]}
          alt={`Carrusel ${currentImageIndex + 1}`}
          className="carousel-image"
        />
        <div className="carousel-buttons">
          <button onClick={goToPrevImage} className="carousel-button prev">&#10094;</button>
          <button onClick={goToNextImage} className="carousel-button next">&#10095;</button>
        </div>
      </div>

      <div className="empresa-banner" ref={bannerRef}>
        <img src={EmpresaBanner} alt="Banner de la empresa" className="empresa-imagen" />
        <div className="empresa-descripcion">
          <h2>Únete a BookingStore</h2>
          <p>Potencia tu negocio, gestiona tus citas y conecta con más clientes.</p>
          <button className="cta-button" onClick={() => navigate('/forms/registers')}>Regístrate Ahora</button>
        </div>
      </div>

      <div className="categorias-grid">
        {categorias.map((categoria, index) => (
          <div
            key={categoria.id}
            className="categoria-card"
            ref={(el) => { categoriaCardsRef.current[index] = el; }}
            onClick={() => handleNavigateToCategoria(categoria.id)}
          >
            <img src={categoria.imagen} className="categoria-imagen" alt={`Categoría ${categoria.nombre}`} />
            <div className="categoria-titulo">{categoria.nombre}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoria/:id" element={<NegociosEspecificosPorCategoria />} />
          <Route path="/negocio-especifico/:id" element={<NegocioEspecifico />} />
          <Route path="/forms/login" element={<Login />} />
          <Route path="/forms/registers" element={<Register />} />
          <Route path="/forms/registersusers" element={<RegisterUser />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/mis-citas" element={<MyAppointments />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;