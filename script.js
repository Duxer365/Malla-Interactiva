
// Lista de materias con id, nombre, requisitos, y año (recortada para espacio)
// Reemplazar con la lista completa del mensaje anterior si se desea
const materias = [...]; // Usa el contenido del mensaje anterior

let aprobadas = new Set(JSON.parse(localStorage.getItem('materiasAprobadas')) || []);

function guardarProgreso() {
  localStorage.setItem('materiasAprobadas', JSON.stringify([...aprobadas]));
}

function crearSecciones() {
  const contenedor = document.getElementById('contenedor-principal');
  for (let i = 1; i <= 5; i++) {
    const divAnio = document.createElement('div');
    divAnio.classList.add('anio');
    const titulo = document.createElement('h2');
    titulo.textContent = `Año ${i}`;
    divAnio.appendChild(titulo);
    const gridAnio = document.createElement('div');
    gridAnio.classList.add('grid-anio');
    gridAnio.dataset.anio = i;
    divAnio.appendChild(gridAnio);
    contenedor.appendChild(divAnio);
  }
}

function crearBotones() {
  materias.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'materia bloqueada';
    btn.innerText = `${m.id}. ${m.nombre}`;
    btn.dataset.id = m.id;
    const grid = document.querySelector(`.grid-anio[data-anio="${m.anio}"]`);
    grid.appendChild(btn);
    btn.addEventListener('click', () => toggleMateria(m.id));
  });
  actualizarEstado();
}

function puedeDesbloquear(materia) {
  return materia.req.every(id => aprobadas.has(id));
}

function actualizarEstado() {
  document.querySelectorAll('.materia').forEach(btn => {
    const id = Number(btn.dataset.id);
    const materia = materias.find(m => m.id === id);
    if (aprobadas.has(id)) {
      btn.className = 'materia aprobada';
    } else if (puedeDesbloquear(materia)) {
      btn.className = 'materia desbloqueada';
    } else {
      btn.className = 'materia bloqueada';
    }
  });
}

function toggleMateria(id) {
  const materia = materias.find(m => m.id === id);
  if (!puedeDesbloquear(materia) && !aprobadas.has(id)) return;
  if (aprobadas.has(id)) {
    aprobadas.delete(id);
  } else {
    aprobadas.add(id);
  }
  guardarProgreso();
  actualizarEstado();
}

crearSecciones();
crearBotones();
