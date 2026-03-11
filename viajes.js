// viajes.js
const destinos = [];

const costos_base = {
    Paris: 500,
    Londres: 400,
    New_York: 600,
    Tokyo: 800,
    Roma: 450,
    Cancun: 300,
    Madrid: 550,
    Amsterdam: 480
};

const costos_transporte = {
    Avion: 200,
    Tren: 100,
    Autobus: 50,
    Barco: 150,
    Coche: 80
};

const calcular_costo_base = (destino, transporte) => {
    return (costos_base[destino] || 500) + (costos_transporte[transporte] || 100);
};

const calcular_descuento = (costo_base, num_personas) => {
    if (num_personas >= 5 && num_personas <= 8) {
        return costo_base * 0.1; // 10% de descuento
    } else if (num_personas >= 9 && num_personas <= 12) {
        return costo_base * 0.15; // 15% de descuento
    } else if (num_personas > 12) {
        return costo_base * 0.2; // 20% de descuento
    }
    return 0;
};

export const registrar_destino = (destino, fecha, transporte, num_personas = 1) => {
    const costo_base = calcular_costo_base(destino, transporte);
    const descuento = calcular_descuento(costo_base, num_personas);
    const costo_final = costo_base - descuento;
    
    const nuevo_viaje = {
        destino,
        fecha,
        transporte,
        num_personas,
        costo_base,
        descuento,
        costo_final,
        id: Date.now() + Math.random() // ID único
    };

    destinos.push(nuevo_viaje);
    console.log(`Viaje a ${destino} para ${num_personas} persona(s) registrado con exito. Descuento: $${descuento}`);
};

export const obtener_destinos = () => {
    return destinos;
};

export const calcular_costo_total = () => {
    return destinos.reduce((total, viaje) => total + viaje.costo_final, 0);
};

export const eliminar_viaje = (id) => {
    const index = destinos.findIndex(viaje => viaje.id === id);
    if (index !== -1) {
        destinos.splice(index, 1);
        return true;
    }
    return false;
};

export const obtener_estadisticas = () => {
    if (destinos.length === 0) return null;
    
    const total_personas = destinos.reduce((sum, viaje) => sum + viaje.num_personas, 0);
    const total_descuentos = destinos.reduce((sum, viaje) => sum + viaje.descuento, 0);
    const viaje_mas_caro = destinos.reduce((max, viaje) => viaje.costo_final > max.costo_final ? viaje : max, destinos[0]);
    
    return {
        total_personas,
        total_descuentos,
        viaje_mas_caro
    };
};