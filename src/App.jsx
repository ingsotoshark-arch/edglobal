import './App.css'

function App() {
  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-3xl)' }}>
      <div className="glass-panel" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ marginBottom: 'var(--spacing-md)' }}>
          EdGlobal Beyond
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem' }}>
          Infraestructura Base y Design System Inicializados
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
          <button className="btn btn-primary">Primary Action</button>
          <button className="btn btn-secondary">Secondary Action</button>
          <button className="btn btn-outline">Outline Action</button>
        </div>
      </div>
    </div>
  )
}

export default App
