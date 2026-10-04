// MÓDULO DE RENDERIZADO Y ANIMACIONES - [Angel Santana]

/**
 * Dibuja el arreglo actual en pantalla en forma de barras verticales.
 * Lee los datos directamente desde el módulo de datos.js.
 */
function renderizarArreglo() {
    const contenedor = document.getElementById("contenedor-visualizador");
    
    // Si el contenedor no existe en el HTML todavía, lo creamos o avisamos
    if (!contenedor) {
        console.warn("No se encontró el contenedor de visualización en el DOM.");
        return;
    }

    // Limpiamos las barras anteriores
    contenedor.innerHTML = "";

    const datos = obtenerArregloActual();
    const maxValor = Math.max(...datos, 100); // Para calcular proporciones relativas de altura

    datos.forEach((valor, indice) => {
        const barra = document.createElement("div");
        barra.classList.add("barra-visualizador");
        barra.style.height = `${(valor / maxValor) * 100}%`;
        barra.style.width = `${100 / datos.length}%`;
        
    

        contenedor.appendChild(barra);
    });
}


function actualizarVistaConDatosNuevos() {
    generarArregloAleatorio();
    renderizarArreglo();
}

function actualizarVistaConReinicio() {
    reiniciarArreglo();
    renderizarArreglo();
}