// app.js
import { registrar_destino, mostrar_itinerario, calcular_costo_total } from './viajes.js';

const iniciar_aplicacion = () => {
    console.log("Iniciando Planificador de Viajes...\n");

    registrar_destino("Paris", "2024-06-15", "Avion");
    registrar_destino("Londres", "2024-07-01", "Tren");
    registrar_destino("New_York", "2024-08-20", "Avion");

    mostrar_itinerario();

    const total = calcular_costo_total();
    console.log(`Costo total estimado de todos los viajes: $${total}`);
};

iniciar_aplicacion();