'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';

const sliderImages = [
  '/slide_1.jpg',
  '/slide_2.jpg',
  '/slide_3.jpg',
  '/slide_4.jpg',
  '/slide_5.jpg',
];

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliderImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === sliderImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentIndex]);


  return (
    <section className="px-4 md:px-8 lg:px-16 ">
      <div className="relative w-full h-[60vh] md:h-[60vh] group">
        
        {/* --- Cinta de promoción --- */}
        <h2
          className="
            absolute top-8 z-20 -left-12 transform -rotate-45 
            w-48 py-2 text-center font-bold text-white text-xl
            bg-[url('/madera.jpeg')] bg-cover
            shadow-md
          "
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
        >
          Horas Disponibles
        </h2>

        
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute bottom-5 left-0 w-full h-full border-8 border-gray-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Image
              src={sliderImages[currentIndex]}
              alt={`Imagen del carrusel ${currentIndex + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={currentIndex === 0}
              className="" 
            />
            <div 
              className="absolute inset-0 bg-black opacity-20 
                         group-hover:opacity-10 transition-opacity duration-300"
            ></div>

            {/* --- MEJORA: Barra de Horario --- */}
            <div
              className="
                absolute text-xl md:text-2xl bottom-0 left-0 right-0 z-10 py-2 text-center text-white 
                font-caveat  bg-[url('/madera.jpeg')] bg-cover
              "
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
            >
              Lunes a Sabado de 09:00 am Hasta 21:00 pm
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 left-4 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
          aria-label="Imagen anterior"
        >
          <HiChevronLeft className="h-6 w-6" />
        </button>

        <button 
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
          aria-label="Siguiente imagen"
        >
          <HiChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <a 
            href="/agenda"
            className="text-2xl font-rubikDirt uppercase cursor-pointer border-4 p-3 tracking-widest
                       bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
                       hover:brightness-125 transition-all duration-300"
            style={{
              borderImageSource: "url('/madera.jpeg')",
              borderImageSlice: 30,
              borderImageRepeat: 'stretch',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}
          > 
            Agenda
          </a>
        </div>
      </div>
    </section>
  );
};
