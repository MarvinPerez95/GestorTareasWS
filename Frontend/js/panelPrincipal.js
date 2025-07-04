const socket = io("http://localhost:3000");
let tableroActual = null;
let tareasActuales = [];

document.addEventListener("DOMContentLoaded", async () => {
    await cargarTableros();
    await cargarFiltros();

    document.getElementById("tableroId").addEventListener("change", async function () {
        const nuevoId = this.value;
        if (tableroActual) socket.emit("leave_tablero", tableroActual);
        socket.emit("join_tablero", nuevoId);
        tableroActual = nuevoId;
        await cargarTareasDelTablero(tableroActual);
    });

    document.getElementById("filtroPrioridad").addEventListener("change", renderizarTareas);
    document.getElementById("filtroEstado").addEventListener("change", renderizarTareas);

    socket.on("nueva_tarea", (tarea) => {
        if (parseInt(tableroActual) === tarea?.Tableros?.[0]?.TableroID || true) {
            tareasActuales.push(tarea);
            renderizarTareas();
        }
    });
});

async function cargarTableros() {
    const res = await fetch("/tablero");
    const data = await res.json();
    const select = document.getElementById("tableroId");
    select.innerHTML = "";
    data.forEach(tablero => {
        const option = document.createElement("option");
        option.value = tablero.TableroID;
        option.textContent = tablero.Nombre;
        select.appendChild(option);
    });

    if (data.length > 0) {
        document.getElementById("tableroId").value = data[0].TableroID;
        socket.emit("join_tablero", data[0].TableroID);
        tableroActual = data[0].TableroID;
        await cargarTareasDelTablero(tableroActual);
    }
}

async function cargarFiltros() {
    const [prioridades, estados] = await Promise.all([
        fetch("/prioridad").then(r => r.json()),
        fetch("/estado").then(r => r.json())
    ]);

    const prioridadSelect = document.getElementById("filtroPrioridad");
    prioridades.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.Nombre;
        opt.textContent = p.Nombre;
        prioridadSelect.appendChild(opt);
    });

    const estadoSelect = document.getElementById("filtroEstado");
    estados.forEach(e => {
        const opt = document.createElement("option");
        opt.value = e.Nombre;
        opt.textContent = e.Nombre;
        estadoSelect.appendChild(opt);
    });
}

async function cargarTareasDelTablero(tableroId) {
    const res = await fetch(`/tablero/${tableroId}/tareas`);
    tareasActuales = await res.json();
    renderizarTareas();
}

function renderizarTareas() {
    const filtroPrioridad = document.getElementById("filtroPrioridad").value;
    const filtroEstado = document.getElementById("filtroEstado").value;

    const tbody = document.getElementById("tareasBody");
    tbody.innerHTML = "";

    tareasActuales
        .filter(t =>
            (!filtroPrioridad || t.Prioridad?.Nombre === filtroPrioridad) &&
            (!filtroEstado || t.Estado?.Nombre === filtroEstado)
        )
        .forEach(tarea => agregarFilaTarea(tarea));
}

function agregarFilaTarea(tarea) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${tarea.Titulo}</td>
    <td>${tarea.Descripcion}</td>
    <td>${tarea.Prioridad?.Nombre || "-"}</td>
    <td>${tarea.Estado?.Nombre || "-"}</td>
    <td>${tarea.Usuario?.Nombre || "-"}</td>
  `;
    document.getElementById("tareasBody").appendChild(fila);
}
