import { useEffect, useState } from 'react'
import { getStatistics } from '../services/api'

function Dashboard() {
    const [statistics, setStatistics] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getStatistics()
            .then((data) => {
                setStatistics(data)
            })
            .catch(() => {
                setError('No se pudieron cargar las estadísticas.')
            })
    }, [])

    if (error) {
        return <p>{error}</p>
    }

    if (!statistics) {
        return <p>Cargando estadísticas...</p>
    }

return (
    <section>
        <h1>Dashboard</h1>
        <p>Resumen del sistema de biblioteca.</p>

        <div className="statistics-grid">
            <div className="stat-card">
                <h3>Total de libros</h3>
                <p>{statistics.total_books}</p>
            </div>

            <div className="stat-card">
                <h3>Libros disponibles</h3>
                <p>{statistics.available_books}</p>
            </div>

            <div className="stat-card">
                <h3>Libros prestados</h3>
                <p>{statistics.loaned_books}</p>
            </div>

            <div className="stat-card">
                <h3>Préstamos activos</h3>
                <p>{statistics.active_loans}</p>
            </div>
        </div>
    </section>
)
}

export default Dashboard