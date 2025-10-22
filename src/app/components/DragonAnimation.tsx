// src/components/ZigZagDragon.tsx

'use client';

import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';

const DRAGON_IMAGE_SRC = '/woodGragon.png';

// --- Funciones de Ayuda para la Aleatoriedad ---

const getRandomY = () => `${Math.random() * 75 + 10}vh`;
const getRandomRotation = () => Math.random() * 30 - 15;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const ZigZagDragon = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // --- 1. PREPARACIÓN VIAJE 1 (Mirando a la derecha) ---
        await controls.start({
          x: '-20vw',
          y: getRandomY(),
          rotate: 0,
          scaleX: 1,
          transition: { duration: 0 },
        });

        // ✅ 1. DECISIÓN ALEATORIA: ¿Vuelo horizontal o escape vertical?
        // Hay un 30% de probabilidad de que elija un escape vertical.
        if (Math.random() < 0.3) {
          // --- NUEVA SECUENCIA: ESCAPE VERTICAL ---
          const flyUp = Math.random() < 0.5; // Decide si vuela hacia arriba o hacia abajo

          // Gira para apuntar en la dirección vertical
          await controls.start({ rotate: flyUp ? -90 : 90, transition: { duration: 0.5 } });
          await delay(200);

          // Vuela y desaparece por arriba o por abajo
          await controls.start({
            y: flyUp ? '-20vh' : '100vh',
            transition: { duration: 5, ease: 'easeIn' },
          });

          await delay(1500); // Pausa mientras está fuera de pantalla
          continue; // Salta el resto del ciclo y empieza uno nuevo
        }

        // --- SECUENCIA ORIGINAL: VIAJE DE IZQUIERDA A DERECHA ---
        await controls.start({
          x: '100vw',
          y: getRandomY(),
          rotate: [getRandomRotation(), getRandomRotation(), 0],
          transition: { duration: 14, ease: 'easeInOut' },
        });

        await delay(1500);

        // --- 2. PREPARACIÓN VIAJE 2 (Mirando a la izquierda) ---
        await controls.start({ scaleX: -1, transition: { duration: 0.2 } });
        await delay(200);

        // ✅ 2. OTRA DECISIÓN ALEATORIA
        if (Math.random() < 0.3) {
          const flyUp = Math.random() < 0.5;
          await controls.start({ rotate: flyUp ? 90 : -90, transition: { duration: 0.5 } });
          await delay(200);

          await controls.start({
            y: flyUp ? '-20vh' : '100vh',
            transition: { duration: 5, ease: 'easeIn' },
          });

          await delay(1500);
          continue;
        }

        // --- SECUENCIA ORIGINAL: VIAJE DE DERECHA A IZQUIERDA ---
        await controls.start({
          x: '-20vw',
          y: getRandomY(),
          rotate: [getRandomRotation(), getRandomRotation(), 0],
          transition: { duration: 14, ease: 'easeInOut' },
        });

        await delay(1500);

        // Gira para prepararse para el siguiente ciclo
        await controls.start({ scaleX: 1, transition: { duration: 0.2 } });
        await delay(200);
      }
    };

    sequence();

    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-50">
      <motion.div className="absolute" animate={controls}>
        <Image
          src={DRAGON_IMAGE_SRC}
          alt="Silueta de un dragón volando"
          width={200}
          height={200}
          className="w-40 h-auto md:w-52"
        />
      </motion.div>
    </div>
  );
};