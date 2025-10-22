// src/components/Services.tsx

'use client';

import { motion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import { GiBeard, GiHairStrands, GiScissors, GiRazorBlade } from 'react-icons/gi';
import { SlMustache } from 'react-icons/sl';
import { TbMassage, TbRazorElectric } from 'react-icons/tb';

// Variante para el contenedor principal que orquesta la animación de los hijos
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Variante para cada tarjeta de servicio
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- Datos de los servicios ---
// Usar un array hace que el código sea más limpio y fácil de actualizar.
const servicesData = [
  {
    icon: TbRazorElectric,
    title: 'Corte de cabello',
    description: 'Asesoría, corte y lavado de cabello. Incluye peinado con pomada a elección.',
    price: '$9.990',
  },
  {
    icon: GiBeard,
    title: 'Perfilado de barba',
    description: 'Asesoría, arreglo de barba, aplicación de toalla caliente, aceite y limpieza facial.',
    price: '$9.990',
  },
  {
    icon: GiRazorBlade,
    title: 'Afeitado al ras',
    description: 'Rasurado con toalla caliente, crema y loción para después del afeitado.',
    price: '$5.990',
  },
  {
    icon: SlMustache,
    title: 'Diseño de Barba',
    description: 'Diseño y arreglo de barba, aplicación de toalla caliente, aceite y limpieza facial.',
    price: '$12.990',
  },
  {
    icon:TbMassage,
    title: 'Masajes',
    description: 'Masaje relajante de 30 minutos para aliviar tensiones y estrés.',
    price: '$19.990',
  }
];



export const Services = () => {


  const router = useRouter();
  return (
    <section id="servicios" className="w-full py-10 px-4 md:px-8">
      {/* Contenedor principal de los servicios */}
      <motion.div
        className="
          grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto
        "
        variants={containerVariants}
       
        viewport={{ once: true, amount: 0.3 }}
      >
                <motion.h2
                  className="
                    font-bold font-alumniSans text-4xl md:text-5xl uppercase tracking-wider mb-4
                    bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
                  "
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                  variants={itemVariants}
                >
                  Servicios
                </motion.h2>
        {servicesData.map((service, index) => (
          <motion.div
          onClick={() => router.push('/agenda')}
            key={index}
            className="
              flex flex-col items-center text-center p-8
              bg-black/20 rounded-lg 
              border border-white/10
              transition-all duration-300
              hover:bg-black/40 hover:border-[#D39154]/50 hover:scale-105
            "
            variants={itemVariants}
          >
            {/* Ícono del servicio */}
            <service.icon className="h-14 w-14 mb-5 text-[#D39154]" />

            {/* Título del servicio */}
            <h3 className="text-2xl font-bold text-neutral-200 mb-2 tracking-wide">
              {service.title}
            </h3>

            {/* Descripción del servicio */}
            <p className="font-alumniSans text-lg text-neutral-400 mb-6 max-w-xs">
              {service.description}
            </p>

            {/* Precio del servicio */}
            <p
              className="
                mt-auto text-3xl font-bold text-[#D39154]
                bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]
              "
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
            >
              {service.price}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};