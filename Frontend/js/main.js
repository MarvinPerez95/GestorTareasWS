// Simulación de login con almacenamiento en localStorage
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value;
            const clave = document.getElementById("clave").value;

            // Guardamos credenciales en localStorage
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("clave", clave);

            window.location.href = "panel.html";
        });
    }

    if (tablaUsuarios) {
        const usuario = localStorage.getItem("usuario");
        const clave = localStorage.getItem("clave");

        fetch("http://localhost:3000/api/usuarios", {
            headers: {
                "usuario": usuario,
                "clave": clave
            }
        })
            .then(res => res.json())
            .then(data => {
                data.forEach(u => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td>${u.rol}</td>
          `;
                    tablaUsuarios.appendChild(fila);
                });
            })
            .catch(err => {
                alert("No autorizado o error de conexión");
                window.location.href = "login.html";
            });
    }
});
