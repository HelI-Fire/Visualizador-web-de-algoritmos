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

// Función para ejecutar la animación visual de cualquier algoritmo disponible
async function ejecutarAnimacionOrdenamiento(algoritmoNombre) {
    const datosOriginales = obtenerArregloActual();
    if (datosOriginales.length === 0) return;

    let resultado;
    
    // Algoritmos de fuerza bruta y avanzados
    if (algoritmoNombre === 'bubble') resultado = bubbleSort(datosOriginales);
    else if (algoritmoNombre === 'selection') resultado = selectionSort(datosOriginales);
    else if (algoritmoNombre === 'insertion') resultado = insertionSort(datosOriginales);
    else if (algoritmoNombre === 'quick') resultado = quickSort(datosOriginales);
    else if (algoritmoNombre === 'merge') resultado = mergeSort(datosOriginales);
    else if (algoritmoNombre === 'gnome') resultado = gnomeSort(datosOriginales);
    else if (algoritmoNombre === 'exchange') resultado = exchangeSort(datosOriginales);
    else if (algoritmoNombre === 'stooge') resultado = stoogeSort(datosOriginales);
    else return;

    const { events } = resultado;
    const barras = document.getElementsByClassName("barra-visualizador");
    let arregloTemporal = [...datosOriginales];
    const maxValor = Math.max(...arregloTemporal, 100);

    for (let evento of events) {
        await new Promise(resolve => setTimeout(resolve, 20)); // Velocidad de la animación

        if (evento.type === "swap") {
            const [i, j] = evento.indices;
            [arregloTemporal[i], arregloTemporal[j]] = [arregloTemporal[j], arregloTemporal[i]];
            if (barras[i]) barras[i].style.height = `${(arregloTemporal[i] / maxValor) * 100}%`;
            if (barras[j]) barras[j].style.height = `${(arregloTemporal[j] / maxValor) * 100}%`;
        } else if (evento.type === "overwrite") {
            const { index, value } = evento;
            arregloTemporal[index] = value;
            if (barras[index]) barras[index].style.height = `${(value / maxValor) * 100}%`;
        } else if (evento.type === "finish") {
            // Al finalizar aseguramos el renderizado exacto del arreglo ordenado
            renderizarArreglo(evento.array);
        }
    }
}