// src/app/loading.tsx

// Este componente se mostrará automáticamente mientras las páginas se cargan.
export default function Loading() {

    setTimeout(() => {
        // Aquí podrías agregar lógica adicional si es necesario
    }, 3000); // Simula un retraso de 1 segundo
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      {/* Spinner animado con los colores de tu marca */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-[#D39154]"></div>
      <p className="mt-4 text-lg font-alumniSans text-neutral-300">
        Cargando...
      </p>
    </div>
  );
}