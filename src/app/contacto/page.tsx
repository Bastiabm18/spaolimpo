// src/components/Contact.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { FaXTwitter, FaPhone } from 'react-icons/fa6';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { BsCalendarDate } from 'react-icons/bs';

// Variante para el contenedor principal, orquesta la animación de los hijos
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variante para cada elemento hijo (título, íconos, mapa)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Contact ()  {
  // Importación dinámica del mapa para evitar problemas de renderizado en el servidor (SSR)
  // Leaflet depende del objeto 'window' que solo existe en el navegador.
  const Map = useMemo(() => dynamic(() => import('../components/Map'), { 
    loading: () => <p className="text-neutral-400">Cargando mapa...</p>,
    ssr: false 
  }), []);

  // Coordenadas para Santa Juana, Biobío, Chile.
  // ¡Recuerda cambiarlas por tu ubicación exacta!
  const location: [number, number] = [-37.173753, -72.941342];

  const iconHover = {
    scale: 1.2,
    rotate: 10,
    transition: { type: 'spring' as const, stiffness: 300 },
  };

  return (
    <section id="contacto" className="w-full py-0 px-4 md:px-8">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ---- TÍTULO ---- */}
        <motion.h2
          className="
            font-bold font-alumniSans text-4xl md:text-5xl uppercase tracking-wider mb-2
            bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
          "
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          variants={itemVariants}
        >
          Donde encontrarnos
        </motion.h2>

        {/* ---- ÍCONOS DE REDES SOCIALES ---- */}
        <motion.div 
          className="flex items-center justify-center gap-6 md:gap-8 mb-4"
          variants={itemVariants}
        >
          <motion.a href="tel:+56939125131" target="_blank" whileHover={iconHover}>
            <FaPhone className="h-8 w-8 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="https://www.instagram.com" target="_blank" whileHover={iconHover}>
            <FaInstagram className="h-8 w-8 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="https://www.facebook.com" target="_blank" whileHover={iconHover}>
            <FaFacebook className="h-8 w-8 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="https://www.tiktok.com" target="_blank" whileHover={iconHover}>
            <FaTiktok className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="https://www.x.com" target="_blank" whileHover={iconHover}>
            <FaXTwitter className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
          
          <motion.a href="/agenda" whileHover={iconHover}>
            <BsCalendarDate className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
          
        </motion.div>

        {/* ---- CONTENEDOR DEL MAPA ---- */}
        <motion.div 
          className="
            w-full h-80 md:h-72 
            p-2 bg-black/20
            border-[16px] border-solid 
            [border-image:url(/madera.jpeg)_30_stretch]
            shadow-2xl shadow-black/50
            z-10
          "
          variants={itemVariants}
        >
          <Map position={location} />
        </motion.div>
      </motion.div>
    </section>
  );
};
