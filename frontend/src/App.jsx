
import { useEffect, useState } from 'react';
import './App.css';

// Datos de ejemplo para probar TechDesk antes de conectar el backend.
const ticketsIniciales = [
  {
    id: 1001,
    titulo: 'No puedo ingresar al sistema',
    categoria: 'Acceso',
    prioridad: 'Alta',
    estado: 'Pendiente',
    solicitante: 'Carlos Rodríguez',
    fecha: '2026-10-08',
  },
  {
    id: 1002,
    titulo: 'Error al guardar un documento',
    categoria: 'Software',
    prioridad: 'Media',
    estado: 'En proceso',
    solicitante: 'Laura Gómez',
    fecha: '2026-10-09',
  },
  {
    id: 1003,
    titulo: 'Solicitud de instalación de software',
    categoria: 'Instalación',
    prioridad: 'Baja',
    estado: 'Resuelto',
    solicitante: 'Andrés Pérez',
    fecha: '2026-10-10',
  },
];

function App() {
  // Estados para controlar los tickets, las búsquedas y los formularios.
  
  // Carga los tickets guardados o utiliza los datos de prueba iniciales.
  const [tickets, setTickets] = useState(() => {
    try {
      const guardados = localStorage.getItem('techdesk_tickets');

      return guardados ? JSON.parse(guardados) : ticketsIniciales;
    } catch (error) {
      console.error('No se pudieron cargar los tickets guardados:', error);
      return ticketsIniciales;
    }
  });

  // Guarda automáticamente los tickets cuando cambia la lista.
  useEffect(() => {
    try {
      localStorage.setItem('techdesk_tickets', JSON.stringify(tickets));
    } catch (error) {
      console.error('No se pudieron guardar los tickets:', error);
      setMensaje('No fue posible guardar los cambios en el navegador.');
    }
  }, [tickets]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Valores iniciales del formulario de creación.
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Software');
  const [prioridad, setPrioridad] = useState('Media');
  const [descripcion, setDescripcion] = useState('');

  // Filtra los tickets por texto y por estado.
  const ticketsFiltrados = tickets.filter((ticket) => {
    const coincideTexto =
      ticket.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(ticket.id).includes(busqueda) ||
      ticket.solicitante.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === 'Todos' || ticket.estado === filtroEstado;

    return coincideTexto && coincideEstado;
  });

  // Calcula los totales que aparecen en las tarjetas del dashboard.
  const pendientes = tickets.filter(
    (ticket) => ticket.estado === 'Pendiente'
  ).length;

  const enProceso = tickets.filter(
    (ticket) => ticket.estado === 'En proceso'
  ).length;

  const resueltos = tickets.filter(
    (ticket) => ticket.estado === 'Resuelto'
  ).length;

  // Registra un ticket de prueba en el estado de React.
  function crearTicket(evento) {
    evento.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setMensaje('Completa el título y la descripción del problema.');
      return;
    }

    const nuevoTicket = {
      id: tickets.length
        ? Math.max(...tickets.map((ticket) => ticket.id)) + 1
        : 1001,
      titulo: titulo.trim(),
      categoria,
      prioridad,
      estado: 'Pendiente',
      solicitante: 'Usuario actual',
      fecha: new Date().toISOString().slice(0, 10),
      descripcion: descripcion.trim(),
    };

    setTickets((anteriores) => [nuevoTicket, ...anteriores]);
    setTitulo('');
    setCategoria('Software');
    setPrioridad('Media');
    setDescripcion('');
    setMostrarFormulario(false);
    setMensaje('Ticket creado correctamente.');

    // Oculta el mensaje después de mostrarlo.
    window.setTimeout(() => setMensaje(''), 3000);
  }

  // Permite avanzar un ticket al siguiente estado de prueba.
  function cambiarEstado(id) {
    const estados = ['Pendiente', 'En proceso', 'Resuelto'];

    setTickets((anteriores) =>
      anteriores.map((ticket) => {
        if (ticket.id !== id) return ticket;

        const posicion = estados.indexOf(ticket.estado);
        const siguienteEstado = estados[(posicion + 1) % estados.length];

        return { ...ticket, estado: siguienteEstado };
      })
    );
  }

  return (
    <div className="app-container">
      {/* Menú lateral de navegación. */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <h2>TechDesk</h2>
            <span>Soporte técnico</span>
          </div>
        </div>

        <p className="menu-label">MENÚ PRINCIPAL</p>

        <nav className="navigation">
          <a href="#dashboard" className="nav-item active">
            <span>▦</span> Dashboard
          </a>
          <a href="#tickets" className="nav-item">
            <span>▤</span> Todos los tickets
          </a>
          <button
            className="nav-item nav-button"
            onClick={() => setMostrarFormulario(true)}
          >
            <span>＋</span> Crear ticket
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-avatar">KB</div>
          <div className="user-info">
            <strong>Kevin Bernal</strong>
            <span>Administrador</span>
          </div>
        </div>
      </aside>

      {/* Área principal del dashboard. */}
      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">TechDesk / Inicio</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-user">
            <span className="status-dot"></span>
            <span>Panel de soporte</span>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <h2>¡Bienvenido a TechDesk!</h2>
            <p>Administra y consulta las solicitudes de soporte técnico.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setMensaje('');
              setMostrarFormulario(true);
            }}
          >
            + Crear ticket
          </button>
        </section>

        {/* Tarjetas con el resumen de solicitudes. */}
        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon blue">▤</div>
            <p>Total de tickets</p>
            <h3>{tickets.length}</h3>
            <span className="stat-caption">Solicitudes registradas</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon orange">◷</div>
            <p>Pendientes</p>
            <h3>{pendientes}</h3>
            <span className="stat-caption">Esperando atención</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon purple">⚙</div>
            <p>En proceso</p>
            <h3>{enProceso}</h3>
            <span className="stat-caption">En atención técnica</span>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Resueltos</p>
            <h3>{resueltos}</h3>
            <span className="stat-caption">Solicitudes solucionadas</span>
          </article>
        </section>

        {/* Formulario que aparece al solicitar un nuevo ticket. */}
        {mostrarFormulario && (
          <section className="panel form-panel">
            <div className="panel-heading">
              <div>
                <h2>Crear nuevo ticket</h2>
                <p>Describe el problema que necesitas solucionar.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setMostrarFormulario(false)}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
            </div>

            <form onSubmit={crearTicket}>
              <div className="form-grid">
                <label>
                  Título del problema
                  <input
                    type="text"
                    value={titulo}
                    onChange={(evento) => setTitulo(evento.target.value)}
                    maxLength={100}
                    placeholder="Ej. Error al iniciar sesión"
                    required
                  />
                </label>

                <label>
                  Categoría
                  <select
                    value={categoria}
                    onChange={(evento) => setCategoria(evento.target.value)}
                  >
                    <option>Software</option>
                    <option>Hardware</option>
                    <option>Acceso</option>
                    <option>Instalación</option>
                    <option>Redes</option>
                    <option>Otros</option>
                  </select>
                </label>

                <label>
                  Prioridad
                  <select
                    value={prioridad}
                    onChange={(evento) => setPrioridad(evento.target.value)}
                  >
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </label>

                <label className="full-width">
                  Descripción del problema
                  <textarea
                    value={descripcion}
                    onChange={(evento) => setDescripcion(evento.target.value)}
                    rows="4"
                    placeholder="Explica qué ocurrió y qué necesitas..."
                    required
                  />
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="primary-button">
                  Guardar ticket
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Tabla con búsqueda y filtro de tickets. */}
        <section className="panel tickets-panel" id="tickets">
          <div className="panel-heading">
            <div>
              <h2>Tickets recientes</h2>
              <p>Consulta y administra las solicitudes registradas.</p>
            </div>
            <span className="ticket-count">{tickets.length} tickets</span>
          </div>

          <div className="filters">
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por título, número o solicitante..."
              aria-label="Buscar tickets"
            />

            <select
              value={filtroEstado}
              onChange={(evento) => setFiltroEstado(evento.target.value)}
              aria-label="Filtrar por estado"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>En proceso</option>
              <option>Resuelto</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Solicitante</th>
                  <th>Categoría</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <strong className="ticket-title">
                        #{ticket.id}
                      </strong>
                      <span className="ticket-subtitle">{ticket.titulo}</span>
                    </td>
                    <td>{ticket.solicitante}</td>
                    <td>{ticket.categoria}</td>
                    <td>
                      <span
                        className={`priority priority-${ticket.prioridad.toLowerCase()}`}
                      >
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status status-${ticket.estado
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {ticket.estado}
                      </span>
                    </td>
                    <td>{ticket.fecha}</td>
                    <td>
                      <button
                        className="table-action"
                        onClick={() => cambiarEstado(ticket.id)}
                        title="Avanzar al siguiente estado"
                      >
                        Cambiar estado
                      </button>
                    </td>
                  </tr>
                ))}

                {ticketsFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No se encontraron tickets con esos criterios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          TechDesk · Sistema de Gestión de Tickets de Soporte Técnico
        </footer>

        {/* Mensaje temporal para informar el resultado de una operación. */}
        {mensaje && (
          <div className="notification" role="status">
            <span>✓</span> {mensaje}
            <button onClick={() => setMensaje('')} aria-label="Cerrar mensaje">
              ×
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
