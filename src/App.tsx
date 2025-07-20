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

// Importar Anime.js para animaciones
import { animate, stagger } from "animejs";

// Importar imágenes existentes de tu carpeta assets/images
import ClinicImg from "./assets/images/Clinics.png";
import RestaurantImg from "./assets/images/Restaurant.png";
import HotelImg from "./assets/images/Hotels.png";
import BarbershopImg from "./assets/images/Barbershop.png";
import EmpresaBanner from "./assets/images/empresa.jpg";

// IMPORTAR TUS NUEVAS IMÁGENES PARA EL CARRUSEL AQUÍ (asegúrate de que los nombres y extensiones sean correctos)
import CarouselImg1 from "./assets/images/1.png";
import CarouselImg2 from "./assets/images/2.png";
import CarouselImg3 from "./assets/images/3.png";

// IMÁGENES PARA EL CARRUSEL (ahora usando tus imágenes locales importadas)
const carouselImages = [
  CarouselImg1,
  CarouselImg2,
  CarouselImg3,
];

function HomePage() {
  const navigate = useNavigate();
  // Referencias para los elementos que animaremos
  const categoriaCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const carouselImageRef = useRef<HTMLImageElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Datos de las categorías
  const categorias = [
    { id: 2, imagen: ClinicImg },
    { id: 1, imagen: RestaurantImg },
    { id: 4, imagen: HotelImg },
    { id: 3, imagen: BarbershopImg },
  ];

  const handleNavigateToCategoria = (categoryId: number) => {
    navigate(`/categoria/${categoryId}`);
  };

  // Efecto para animar el banner y las tarjetas de categoría al cargar la página
  useEffect(() => {
    // Animación de entrada del banner
    if (bannerRef.current) {
      animate(bannerRef.current, {
        translateY: [-50, 0], // Deslizar desde arriba
        opacity: [0, 1],      // Fundido de entrada
        duration: 1000,       // Duración de 1 segundo
        easing: 'easeOutQuad',
        delay: 200,           // Retraso inicial
      });
    }

    // Animación escalonada (staggered) de las tarjetas de categoría
    animate(categoriaCardsRef.current, {
      translateY: [50, 0],  // Deslizar desde abajo
      opacity: [0, 1],      // Fundido de entrada
      duration: 800,
      delay: stagger(100, { start: 500 }), // Cada tarjeta aparece con 100ms de retraso, empezando a los 500ms
      easing: 'easeOutBack',
    });
  }, []); // Se ejecuta una vez al montar el componente

  // Efecto para la lógica del carrusel (cambio automático de imágenes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 5000); // Cambia la imagen cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Efecto para animar la imagen del carrusel cada vez que cambia
  useEffect(() => {
    if (carouselImageRef.current) {
      animate(carouselImageRef.current, {
        opacity: [0, 1],      // Fundido de entrada
        scale: [0.95, 1],     // Ligeramente escalado al aparecer
        duration: 800,
        easing: 'easeOutQuad',
      });
    }
  }, [currentImageIndex]); // Se activa cada vez que el índice de la imagen actual cambia

  // Funciones para la navegación manual del carrusel
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % carouselImages.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + carouselImages.length) % carouselImages.length // Asegura que el índice no sea negativo
    );
  };

  return (
    <main className="main-content">
      {/* Carrusel de Imágenes */}
      <div className="carousel-container">
        <img
          ref={carouselImageRef}
          src={carouselImages[currentImageIndex]}
          alt={`Carrusel Imagen ${currentImageIndex + 1}`}
          className="carousel-image"
        />
        <div className="carousel-buttons">
          <button onClick={goToPrevImage} className="carousel-button prev">
            &#10094; {/* Flecha izquierda Unicode */}
          </button>
          <button onClick={goToNextImage} className="carousel-button next">
            &#10095; {/* Flecha derecha Unicode */}
          </button>
        </div>
      </div>

      {/* Sección del Banner de la Empresa */}
      <div className="empresa-banner" ref={bannerRef}>
        <img
          src={EmpresaBanner}
          alt="Descripción empresa"
          className="empresa-imagen"
        />
        <div className="empresa-descripcion">
          <h1>Bienvenido a BookingStore</h1>
          <p>
            Tu plataforma central para reservar servicios y gestionar negocios
            fácilmente. Descubre nuestras categorías principales y encuentra el
            negocio ideal para ti.
          </p>
        </div>
      </div>

      {/* Cuadrícula de Categorías */}
      <div className="categorias-grid">
        {categorias.map((categoria, index) => (
          <div
            key={categoria.id}
            className="categoria-card"
            ref={(el) => {
              // Asignar la referencia al elemento div para animaciones
              if (el) categoriaCardsRef.current[index] = el;
            }}
            onClick={() => handleNavigateToCategoria(categoria.id)}
          >
            <img
              src={categoria.imagen}
              className="categoria-imagen"
              alt=""
            />
            {/* Opcional: Si quieres un título en la tarjeta de categoría */}
            {/* <h4>{categoria.nombre || `Categoría ${categoria.id}`}</h4> */}
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
          <Route
            path="/categoria/:id"
            element={<NegociosEspecificosPorCategoria />}
          />
          <Route
            path="/negocio-especifico/:id"
            element={<NegocioEspecifico />}
          />
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