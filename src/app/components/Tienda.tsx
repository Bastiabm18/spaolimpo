// src/components/Tienda.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

// Array con las rutas de las imágenes para el slider
const sliderImages = [
  '/slide_1.jpg',
  '/slide_2.jpg',
  '/slide_3.jpg',
  '/slide_4.jpg',
  '/slide_5.jpg',
];

// Variantes para la animación de entrada del componente
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export const Tienda = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Función para cambiar la imagen al hacer clic en un punto
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Efecto para el slider automático
  useEffect(() => {
    // Si el mouse está sobre el slider, no hacer nada
    if (isHovered) return;

    // Configura un temporizador para cambiar a la siguiente imagen
    const timer = setTimeout(() => {
      const isLastSlide = currentIndex === sliderImages.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 5000); // Cambia de imagen cada 5 segundos

    // Limpia el temporizador si el componente se desmonta o las dependencias cambian
    return () => clearTimeout(timer);
  }, [currentIndex, isHovered]); // Se ejecuta de nuevo si el índice o el estado hover cambian

  return (
    <section id="tienda" className="w-full px-4 md:px-8 overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Título de la sección */}
        <motion.h2
          className="
            font-bold font-alumniSans text-4xl md:text-5xl uppercase tracking-wider mb-6
            bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
          "
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          variants={itemVariants}
        >
          Nuestra Tienda
        </motion.h2>

        {/* Contenedor del Slider con el borde de madera */}
        <motion.div
          className="
            relative w-full aspect-video p-3 bg-black/20
            border-[16px] border-solid [border-image:url(/madera.jpeg)_30_stretch]
            shadow-2xl shadow-black/50
          "
          variants={itemVariants}
          onMouseEnter={() => setIsHovered(true)} // Pausa el slider al pasar el mouse
          onMouseLeave={() => setIsHovered(false)} // Reanuda el slider al quitar el mouse
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Image
                src={sliderImages[currentIndex]}
                alt={`Imagen de la tienda ${currentIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Puntos de Navegación */}
        <motion.div className="flex justify-center gap-3 mt-6" variants={itemVariants}>
          {sliderImages.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${currentIndex === slideIndex ? 'bg-[#D39154] scale-125' : 'bg-gray-600 hover:bg-gray-400'}
              `}
              aria-label={`Ir a la imagen ${slideIndex + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
