const socket = io("http://localhost:3000");
let tableroActual = null;

document.addEventListener("DOMContentLoaded", async () => {
    await cargarTableros();

    document.getElementById("tableroId").addEventListener("change", function () {
        const nuevoId = this.value;
        if (tableroActual) socket.emit("leave_tablero", tableroActual);
        socket.emit("join_tablero", nuevoId);
        tableroActual = nuevoId;
        document.getElementById("tareasBody").innerHTML = "";
    });

    // Escuchar nuevas tareas emitidas
    socket.on("nueva_tarea", (tarea) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${tarea.Titulo}</td>
      <td>${tarea.Descripcion}</td>
      <td>${tarea.Prioridad?.Nombre || '-'}</td>
      <td>${tarea.Estado?.Nombre || '-'}</td>
      <td>${tarea.Usuario?.Nombre || '-'}</td>
    `;
        document.getElementById("tareasBody").appendChild(fila);
    });
});

async function cargarTableros() {
    const res = await fetch("/tablero");
    const data = await res.json();
    const select = document.getElementById("tableroId");
    data.forEach(tablero => {
        const option = document.createElement("option");
        option.value = tablero.TableroID;
        option.textContent = tablero.Nombre;
        select.appendChild(option);
    });
}
