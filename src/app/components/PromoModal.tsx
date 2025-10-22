// src/components/PromoModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Correct hook for the path

// Array con las rutas de las imágenes del slider
const slideImages = ['/slide_1.jpg', '/slide_2.jpg', '/slide_3.jpg'];

// Variantes de animación para el fondo y el contenedor del modal
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 15, stiffness: 120 },
  },
  exit: { scale: 0.9, opacity: 0 },
};

export const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname(); // Get the current path, e.g., "/" or "/agenda"

  // Efecto para mostrar el modal después de 5 segundos, solo en la página de inicio.
  useEffect(() => {
    // Only set the timer if the current path is the homepage
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5 segundos de espera

      return () => clearTimeout(timer); // Limpieza del temporizador
    }
  }, [pathname]); // Rerun the effect if the path changes

  // Efecto para controlar el carrusel de imágenes
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
      }, 4000); // Cambia de imagen cada 4 segundos

      return () => clearInterval(interval); // Limpieza del intervalo
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {/* Only render the modal if it's open (which can only happen on the homepage) */}
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 w-full h-full z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
          "
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose} // Cierra el modal al hacer clic en el fondo
        >
          {/* Contenedor principal del modal */}
          <motion.div
            className="
              relative w-11/12 max-w-lg p-5
            "
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
          >
            {/* Contenedor de la imagen y el contenido superpuesto */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-black/50">
              {/* Cinta de promoción */}
              <h2
                className="
                  absolute top-8 z-50 -left-12 transform -rotate-45 
                  w-48 py-2 text-center font-bold text-white text-4xl
                  bg-[url('/madera.jpeg')] bg-cover
                  shadow-md
                "
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                ¡Aprovecha!
              </h2>

              <h2
                className="z-50 absolute top-24 left-10 text-xl line-through transform -rotate-45"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                > 10% OFF
                </h2>
              <h1
                className="z-50 absolute top-28 left-16 text-red-500 text-2xl font-semibold  transform -rotate-45"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                > 20% OFF
                </h1>

              {/* Carrusel de Imágenes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-[60vh] md:h-[70vh]"
                >
                  <Image
                    src={slideImages[currentIndex]}
                    alt={`Promoción ${currentIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Capa semitransparente sobre la imagen */}
              <div className="absolute inset-0 bg-gray-800/20"></div>

              {/* Contenido superpuesto (Botón de cerrar y de agendar) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {/* Botón de cerrar (X) en la esquina superior derecha */}
                <button
                  onClick={handleClose}
                  className="
                    absolute top-3 right-3 text-white/70 hover:text-white
                    transition-colors duration-300
                  "
                  aria-label="Cerrar modal"
                >
                  <FaTimes size={24} />
                </button>

                {/* Botón para agendar hora */}
                <Link href="/agenda" onClick={handleClose}>
                  <motion.div
                    className="
                      px-6 py-3 font-alumniSans text-xl text-white animate-pulse
                      bg-black/40 border-2 border-white/80 rounded-sm
                      hover:bg-white hover:text-black transition-all duration-300
                      shadow-lg cursor-pointer
                    "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ¡Agenda tu hora!
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
