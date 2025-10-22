// src/components/AboutUs.tsx

'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

// Variante para el contenedor principal, orquesta la animación de los hijos
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Variante para los elementos hijos (columna de texto e imagen)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const AboutUs = () => {
  return (
    <section id="nosotros" className="w-full py-4 px-4 md:px-8 overflow-hidden">
      <motion.div
        className="
          max-w-6xl mx-auto
          flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* ---- COLUMNA DE TEXTO (Izquierda en desktop) ---- */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={itemVariants}
        >
          <h2
            className="
              font-bold font-alumniSans text-4xl md:text-5xl uppercase tracking-wider mb-4
              bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
            "
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Spa Olimpo
          </h2>

          {/* Usamos el mismo borde de madera del footer para la imagen */}
          <div
            className="
              border-[16px] border-solid 
              [border-image:url(/madera.jpeg)_30_stretch]
              shadow-2xl shadow-black/50 mb-10
            "
          >
            <Image
              src="/slide_4.jpg"
              alt="Interior de la Barbería"
              width={600}
              height={700}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4 font-alumniSans text-xl text-neutral-300">
            <p>
              Enero 2025, Barbería <b className='text-[#D39154] font-bold'>Spa Olimpo </b> comenzó como un pequeño local en el
              corazón de la ciudad. Con el tiempo, hemos evolucionado para
              convertirnos en un espacio integral de cuidado personal para hombres
              y mujeres.
            </p>
            <p>
              Nuestra filosofía se basa en tres pilares:{' '}
              <strong className="font-bold text-[#D39154]">calidad</strong> en
              nuestros servicios,{' '}
              <strong className="font-bold text-[#D39154]">atención</strong>{' '}
              personalizada y un{' '}
              <strong className="font-bold text-[#D39154]">ambiente</strong>{' '}
              acogedor donde nuestros clientes se sientan como en casa.
            </p>
            <p>
              Hoy contamos con un equipo multidisciplinario de profesionales
              apasionados por su trabajo.
            </p>
          </div>
        </motion.div>

        {/* ---- COLUMNA DE IMAGEN (Derecha en desktop) ---- */}
        <motion.div
          className="
            flex-1 w-full max-w-sm md:max-w-none
            p-3 bg-black/20
          "
          variants={itemVariants}
        >

        </motion.div>
      </motion.div>
    </section>
  );
};