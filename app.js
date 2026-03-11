// app.js
import { 
    registrar_destino, 
    obtener_destinos, 
    calcular_costo_total, 
    eliminar_viaje,
    obtener_estadisticas 
} from './viajes.js';

const actualizar_html = () => {
    const destinos = obtener_destinos();
    const lista_viajes = document.getElementById('lista-viajes');
    const total_div = document.getElementById('total');
    const estadisticas_div = document.getElementById('estadisticas');
    
    if (destinos.length === 0) {
        lista_viajes.innerHTML = '<div class="mensaje">No hay viajes registrados aún. Agrega uno arriba</div>';
        total_div.innerHTML = '';
        estadisticas_div.innerHTML = '';
        return;
    }
    
    let html = '';
    destinos.forEach((viaje) => {
        html += `
            <div class="viaje" id="viaje-${viaje.id}">
                <div class="destino-header">
                    <span class="destino">${viaje.destino}</span>
                    <button class="btn-eliminar" onclick="eliminar_viaje_click(${viaje.id})">❌</button>
                </div>
                <div class="detalle">Fecha: ${viaje.fecha}</div>
                <div class="detalle">Transporte: ${viaje.transporte}</div>
                <div class="detalle">Personas: ${viaje.num_personas}</div>
                <div class="detalle">Costo base: $${viaje.costo_base}</div>
                ${viaje.descuento > 0 ? `<div class="descuento">🎉 Descuento: -$${viaje.descuento}</div>` : ''}
                <div class="costo">Total: $${viaje.costo_final}</div>
            </div>
        `;
    });
    
    lista_viajes.innerHTML = html;
    
    const total = calcular_costo_total();
    total_div.innerHTML = `Costo total de todos los viajes: $${total}`;
    
    const stats = obtener_estadisticas();
    if (stats) {
        estadisticas_div.innerHTML = `
            <div class="stat">Total de viajeros: ${stats.total_personas}</div>
            <div class="stat">Total descuentos aplicados: $${stats.total_descuentos}</div>
            <div class="stat">Viaje más caro: ${stats.viaje_mas_caro.destino} ($${stats.viaje_mas_caro.costo_final})</div>
        `;
    }
};

window.eliminar_viaje_click = (id) => {
    eliminar_viaje(id);
    actualizar_html();
};

window.registrar_viaje_desde_form = () => {
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;
    const transporte = document.getElementById('transporte').value;
    const personas = parseInt(document.getElementById('personas').value) || 1;
    
    if (!destino || !fecha) {
        alert('Por favor llena todos los campos');
        return;
    }
    
    registrar_destino(destino, fecha, transporte, personas);
    actualizar_html();
    
    // Limpiar formulario
    document.getElementById('destino').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('transporte').selectedIndex = 0;
    document.getElementById('personas').value = '1';
};

const cargar_ejemplos = () => {
    registrar_destino("Paris", "2024-06-15", "Avion", 2);
    registrar_destino("Londres", "2024-07-01", "Tren", 6);  // Este tiene descuento del 10%
    registrar_destino("Cancun", "2024-08-20", "Avion", 10); // Este tiene descuento del 15%
    registrar_destino("Tokyo", "2024-09-10", "Barco", 1);
    actualizar_html();
};

const iniciar_aplicacion = () => {
    console.log("Iniciando Planificador de Viajes Extendido...\n");
    cargar_ejemplos();
};

document.addEventListener('DOMContentLoaded', iniciar_aplicacion);