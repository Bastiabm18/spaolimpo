'use client'; // Necesario para que Framer Motion funcione en Next.js App Router

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

const NeonSign = () => {
  // --- Estilos para el efecto Neón ---
  // Usamos textShadow para crear el resplandor.
  // La sintaxis es: [desplazamiento-x] [desplazamiento-y] [desenfoque] [color]
  // Combinamos un resplandor interior blanco y uno exterior amarillo para un efecto más realista.
  const neonEffect = {
    color: '#fff', // Color del texto base (blanco para que el brillo destaque)
    textShadow: `
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #D39154,
      0 0 82px #D39154,
      0 0 92px #D39154,
      0 0 102px #D39154,
      0 0 151px #D39154
    `,
  };

  return (
    <motion.div
      className="text-5xl font-bold tracking-wider" // Aumenté el tamaño para que se vea mejor
      style={neonEffect}
      // --- Animación de Parpadeo ---
      // Animamos la opacidad para simular un parpadeo o una conexión inestable.
      animate={{
        opacity: [1, 0.1, 0.95, 0.25, 1, 0.9, 1, 0.8, 1,1,0.9,0.99, 1, 0.9, 1, 0.8, 1,1,0.9,0.99], // Secuencia de opacidades
      }}
      transition={{
        duration: 10,           // Duración total de una secuencia de parpadeo
        repeat: Infinity,      // Repetir la animación para siempre
        repeatType: 'loop',    // Tipo de repetición
        ease: 'easeInOut',     // Suaviza el cambio entre opacidades
      }}
    >
      <p  className="bg-cover bg-clip-text">
        Spa Olimpo
      </p>
    </motion.div>
  );
};

export default NeonSign;