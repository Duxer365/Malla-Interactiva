
const materias = [
  { id: 1, nombre: "Enfermería General", req: [], anio: 1 },
  { id: 2, nombre: "Epidemiologia", req: [], anio: 1 },
  { id: 3, nombre: "Ciencias Biológicas I", req: [], anio: 1 },
  { id: 4, nombre: "Comunicación como Herramienta Profesional", req: [], anio: 1 },
  { id: 5, nombre: "Enfermería Comunitaria I", req: [1], anio: 1 },
  { id: 6, nombre: "Sociología I", req: [], anio: 1 },
  { id: 7, nombre: "Ciencias Biológicas II", req: [3], anio: 1 },
  { id: 8, nombre: "Computación Nivel I", req: [], anio: 2 },
  { id: 9, nombre: "Enfermería Atención Adulto I", req: [1, 7], anio: 2 },
  { id: 10, nombre: "Farmacología", req: [], anio: 2 },
  { id: 11, nombre: "Microbiología", req: [], anio: 2 },
  { id: 12, nombre: "Nutrición Aplicada a Enfermería", req: [3], anio: 2 },
  { id: 13, nombre: "Enfermería Atención Adulto II", req: [9], anio: 2 },
  { id: 14, nombre: "Antropología", req: [], anio: 2 },
  { id: 15, nombre: "Psicología", req: [], anio: 2 },
  { id: 16, nombre: "Enfermería en Salud Mental", req: [], anio: 2 },
  { id: 17, nombre: "Computación Nivel II", req: [8], anio: 2 },
  { id: 18, nombre: "Inglés Nivel I", req: [], anio: 3 },
  { id: 19, nombre: "Inglés Nivel II", req: [18], anio: 3 },
  { id: 20, nombre: "Enf. Cuidados Obstétricos", req: [1, 7], anio: 3 },
  { id: 21, nombre: "Enf. Niño y Adolescente I", req: [1, 7, 10, 11], anio: 3 },
  { id: 22, nombre: "Marcos Éticos en Enfermería", req: [1], anio: 3 },
  { id: 23, nombre: "Filosofía", req: [], anio: 3 },
  { id: 24, nombre: "Electiva I", req: [], anio: 3 },
  { id: 25, nombre: "Electiva II", req: [], anio: 3 },
  { id: 26, nombre: "Enf. Recien Nacido", req: [20], anio: 3 },
  { id: 27, nombre: "Enf. Niño y Adolescente II", req: [21], anio: 3 },
  { id: 28, nombre: "Administración Servicios", req: [5, 13], anio: 3 },
  { id: 29, nombre: "Investigación I", req: [21], anio: 3 },
  { id: 30, nombre: "Práctica Integral I", req: [2,4,5,6,10,11,12,13,14,15,16,20,21,22,23,25], anio: 3 },
  { id: 31, nombre: "Enfermería Comunitaria II", req: [5], anio: 4 },
  { id: 32, nombre: "Inglés Nivel III", req: [19], anio: 4 },
  { id: 33, nombre: "Inglés Nivel IV", req: [20], anio: 4 },
  { id: 34, nombre: "Investigación II", req: [29], anio: 4 },
  { id: 35, nombre: "Filosofía y Ciencia Enfermera", req: [1, 23], anio: 4 },
  { id: 36, nombre: "Enf. Paciente Crítico I", req: [30], anio: 4 },
  { id: 37, nombre: "Enfermería Comunitaria III", req: [31], anio: 4 },
  { id: 38, nombre: "Investigación III", req: [34], anio: 4 },
  { id: 39, nombre: "Enf. Paciente Crítico II", req: [36], anio: 4 },
  { id: 40, nombre: "Sociología II", req: [6], anio: 4 },
  { id: 41, nombre: "Gestión Servicios I", req: [28], anio: 5 },
  { id: 42, nombre: "Deontología Enfermería", req: [22], anio: 5 },
  { id: 43, nombre: "Taller Investigación I", req: [38], anio: 5 },
  { id: 44, nombre: "Seminario Optativo I", req: [], anio: 5 },
  { id: 45, nombre: "Seminario Optativo II", req: [], anio: 5 },
  { id: 46, nombre: "Gestión Servicios II", req: [41], anio: 5 },
  { id: 47, nombre: "Educación en Enfermería", req: [39], anio: 5 },
  { id: 48, nombre: "Taller Investigación II", req: [43], anio: 5 },
  { id: 49, nombre: "Práctica Integral II", req: [35, 37, 39, 40, 41, 42, 43, 44], anio: 5 }
];

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

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reiniciar progreso';
  resetBtn.style.marginTop = '30px';
  resetBtn.onclick = () => {
    if (confirm('¿Estás seguro que deseas borrar todo el progreso?')) {
      localStorage.removeItem('materiasAprobadas');
      aprobadas.clear();
      actualizarEstado();
    }
  };
  document.body.appendChild(resetBtn);
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
