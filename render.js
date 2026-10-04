// MÓDULO DE RENDERIZADO Y ANIMACIONES - [Angel Santana]

function renderizarArreglo(arregloPersonalizado = null) {
    const contenedor = document.getElementById("contenedor-visualizador");
    
    if (!contenedor) {
        console.warn("No se encontró el contenedor de visualización en el DOM.");
        return;
    }

    contenedor.innerHTML = "";
    const datos = arregloPersonalizado || obtenerArregloActual();
    const maxValor = Math.max(...datos, 100);

    datos.forEach((valor) => {
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

// Función para ejecutar la animación visual de cualquier algoritmo de ordenamiento
async function ejecutarAnimacionOrdenamiento(algoritmoNombre) {
    const datosOriginales = obtenerArregloActual();
    if (datosOriginales.length === 0) return;

    let resultado;
    if (algoritmoNombre === 'bubble') resultado = bubbleSort(datosOriginales);
    else if (algoritmoNombre === 'selection') resultado = selectionSort(datosOriginales);
    else if (algoritmoNombre === 'insertion') resultado = insertionSort(datosOriginales);
    else return;

    const { events } = resultado;
    const barras = document.getElementsByClassName("barra-visualizador");
    let arregloTemporal = [...datosOriginales];
    const maxValor = Math.max(...arregloTemporal, 100);

    for (let evento of events) {
        await new Promise(resolve => setTimeout(resolve, 30)); // Velocidad de animación

        if (evento.type === "compare") {
            // Opcional: cambiar color al comparar
        } else if (evento.type === "swap") {
            const [i, j] = evento.indices;
            [arregloTemporal[i], arregloTemporal[j]] = [arregloTemporal[j], arregloTemporal[i]];
            if (barras[i]) barras[i].style.height = `${(arregloTemporal[i] / maxValor) * 100}%`;
            if (barras[j]) barras[j].style.height = `${(arregloTemporal[j] / maxValor) * 100}%`;
        } else if (evento.type === "overwrite") {
            const { index, value } = evento;
            arregloTemporal[index] = value;
            if (barras[index]) barras[index].style.height = `${(value / maxValor) * 100}%`;
        }
    }
}