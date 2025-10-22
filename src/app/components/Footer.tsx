// src/components/Footer.tsx

'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';

// Variante para el contenedor principal, orquesta la animación de los hijos
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variante para cada elemento hijo (columnas, separador)
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

export const Footer = () => {
  const iconHover = {
    scale: 1.2,
    rotate: 10,
    transition: { type: 'spring' as const, stiffness: 300 },
  };

  return (
    <motion.footer
      // ✅ CONTENEDOR PRINCIPAL: Ahora es un flex container horizontal en pantallas grandes
      className="
        w-full h-[30vh] md:max-h-[20vh] 
        flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4
        px-8 py-6
        bg-black/20
        border-t-[16px] border-solid 
        [border-image:url(/madera.jpeg)_30_stretch]
      "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ---- COLUMNA IZQUIERDA ---- */}
      <motion.div
        className="flex flex-col items-center md:items-start text-center md:text-left"
        variants={itemVariants}
      >
        <p  className="text-xl md:text-3xl text-neutral-200">
          Developed & Powered with <FaHeart className="inline" /> by{' '}
          <Link
            href="https://www.instagram.com/bastiabm/"
            target="_blank"
            passHref
            className="
              font-bold text-xl uppercase tracking-wider
              bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
              hover:brightness-125 transition-all duration-300
            "
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            BABM
          </Link>
        </p>
        <p className="text-lg mt-5 sm:mt-0 font-alumniSans text-neutral-400">
          Todos los derechos reservados © {new Date().getFullYear()}
        </p>
      </motion.div>

      {/* ---- SEPARADOR VERTICAL (visible solo en pantallas grandes) ---- */}
      <motion.div
        className="hidden md:block w-px h-14 bg-cover bg-[url('/madera2.jpeg')]"
        variants={itemVariants}
      />

      {/* ---- COLUMNA DERECHA ---- */}
      <motion.div
        className="flex flex-col items-center md:items-end gap-3"
        variants={itemVariants}
      >
        {/* Íconos de Redes Sociales */}
        <div className="hidden md:flex items-center gap-6">
            <motion.a href="tel:+56939125131" target="_blank" whileHover={iconHover}>
                <FaPhone className="h-6 w-6 text-[#D39154] cursor-pointer" />
            </motion.a>
          <motion.a href="https://wa.me/+56939125131" target="_blank" whileHover={iconHover}>
            <FaWhatsapp className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="https://www.instagram.com/bastiabm/" target="_blank" whileHover={iconHover}>
            <FaInstagram className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
          <motion.a href="mailto:andresbarriosmedina1@gmail.com" target="_blank" whileHover={iconHover}>
            <FaEnvelope className="h-7 w-7 text-[#D39154] cursor-pointer" />
          </motion.a>
        </div>
        {/* Información de Ubicación */}
        <div className="flex font-alumniSans -mt-10 md:mt-0 items-center gap-2  text-left text-neutral-500">
          <FaMapMarkerAlt className="sm:h-5 sm:w-5 h-5 w-4 text-[#D39154] cursor-pointer" />
          <span className='text-neutral-500 text-left sm:text-2xl md:font-bold'>Santa Juana, Bio Bio, Chile</span>
        </div>
      </motion.div>
    </motion.footer>
  );
};