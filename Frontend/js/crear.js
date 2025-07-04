const socket = io("http://localhost:3000");

document.addEventListener("DOMContentLoaded", async () => {
    await cargarOpciones();

    // Crear tablero
    document.getElementById("formTablero").addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            Nombre: document.getElementById("nombreTablero").value,
            Descripcion: document.getElementById("descripcionTablero").value,
            DepartamentoID: document.getElementById("departamentoSelect").value,
            UsuarioID: document.getElementById("usuarioSelect").value,
            FechaCreacion: new Date()
        };

        const res = await fetch("/tablero", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert("✅ Tablero creado: " + result.Nombre);
    });

    // Crear tarea + WebSocket
    document.getElementById("formTarea").addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            Titulo: document.getElementById("titulo").value,
            Descripcion: document.getElementById("descripcion").value,
            Contenido: document.getElementById("contenido").value,
            FechaLimite: document.getElementById("fechaLimite").value,
            CategoriaID: document.getElementById("categoriaSelect").value,
            EstadoID: document.getElementById("estadoSelect").value,
            PrioridadID: document.getElementById("prioridadSelect").value,
            UsuarioID: document.getElementById("usuarioTareaSelect").value,
            TableroID: document.getElementById("tableroTareaSelect").value,
            Activo: true
        };

        const res = await fetch("/tarea", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.ok) {
            alert("✅ Tarea creada y emitida");
        } else {
            alert("❌ Error: " + (result.mensaje || "Error creando tarea"));
        }
    });
});

async function cargarOpciones() {
    await cargarSelect("/tablero", "tableroTareaSelect", "TableroID", "Nombre");
    await cargarSelect("/usuario", "usuarioSelect", "UsuarioID", "Nombre");
    await cargarSelect("/usuario", "usuarioTareaSelect", "UsuarioID", "Nombre");
    await cargarSelect("/departamento", "departamentoSelect", "DepartamentoID", "Nombre");
    await cargarSelect("/categoria", "categoriaSelect", "CategoriaID", "Nombre");
    await cargarSelect("/estado", "estadoSelect", "EstadoID", "Nombre");
    await cargarSelect("/prioridad", "prioridadSelect", "PrioridadID", "Nombre");
}

async function cargarSelect(url, elementId, valueField, textField) {
    const res = await fetch(url);
    const data = await res.json();
    const select = document.getElementById(elementId);
    select.innerHTML = "";
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item[valueField];
        option.textContent = item[textField];
        select.appendChild(option);
    });
}
