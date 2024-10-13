import React, { useState, useEffect } from "react";

export default function Timer({ evento, nombreevent }) {
  // Estado para almacenar el tiempo restante en milisegundos
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: "Cargando ... ",
    horas: "",
    minutos: "",
    segundos: "",
  });

  // Función para calcular el tiempo restante
  function calculateTimeLeft() {
    const fechaEvento = new Date(evento);
    if (isNaN(fechaEvento.getTime())) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 }; // Si la fecha es inválida
    }

    const fechaActual = new Date();
    const diferenciaEnMs = fechaEvento - fechaActual;

    if (diferenciaEnMs <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 }; // Si el evento ya pasó
    }

    const diasRestantes = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor(
      (diferenciaEnMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutosRestantes = Math.floor(
      (diferenciaEnMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const segundosRestantes = Math.floor((diferenciaEnMs % (1000 * 60)) / 1000);

    return {
      dias: diasRestantes,
      horas: horasRestantes,
      minutos: minutosRestantes,
      segundos: segundosRestantes,
    };
  }

  // useEffect para actualizar el tiempo cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante(calculateTimeLeft());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, [evento]);

  // Renderizar el tiempo restante
  return (
    <div>
      <h2 style={{ color: "white" }}>
        Faltan {tiempoRestante.dias} días, {tiempoRestante.horas}h:
        {tiempoRestante.minutos}m:{tiempoRestante.segundos}s para {nombreevent}
      </h2>
    </div>
  );
}
