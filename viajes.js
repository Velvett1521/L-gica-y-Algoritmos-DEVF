// viajes.js
const destinos = [];

const calcular_costo_base = (destino, transporte) => {
    const costos_base = {
        Paris: 500,
        Londres: 400,
        New_York: 600
    };

    const costos_transporte = {
        Avion: 200,
        Tren: 100
    };

    return (costos_base[destino] || 0) + (costos_transporte[transporte] || 0);
};

export const registrar_destino = (destino, fecha, transporte) => {
    const nuevo_viaje = {
        destino,
        fecha,
        transporte,
        costo: calcular_costo_base(destino, transporte)
    };

    destinos.push(nuevo_viaje);
    console.log(`Viaje a ${destino} registrado con exito.`);
};

export const mostrar_itinerario = () => {
    console.log("\n========== ITINERARIO DE VIAJES ==========");
    destinos.forEach((viaje, index) => {
        console.log(`\nViaje ${index + 1}:`);
        console.log(`  Destino: ${viaje.destino}`);
        console.log(`  Fecha: ${viaje.fecha}`);
        console.log(`  Transporte: ${viaje.transporte}`);
        console.log(`  Costo: $${viaje.costo}`);
        console.log("-----------------------------------");
    });
    
    if (destinos.length === 0) {
        console.log("No hay viajes registrados.");
    }
    console.log("===========================================\n");
};

export const calcular_costo_total = () => {
    return destinos.reduce((total, viaje) => total + viaje.costo, 0);
};