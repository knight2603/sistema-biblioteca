import { useEffect, useState } from 'react'
import { getStatistics } from '../services/api'

function Dashboard() {
    const [statistics, setStatistics] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                setLoading(true)
                setError(null)

                const data = await getStatistics()

                if (
                    typeof data.total_books !== 'number' ||
                    typeof data.available_books !== 'number' ||
                    typeof data.loaned_books !== 'number' ||
                    typeof data.active_loans !== 'number'
                ) {
                    throw new Error(
                        'Los datos recibidos no tienen un formato válido.'
                    )
                }

                setStatistics(data)
            } catch (error) {
                setError(
                    error.message ||
                    'No se pudieron cargar las estadísticas.'
                )
            } finally {
                setLoading(false)
            }
        }

        loadStatistics()
    }, [])

    if (loading) {
        return (
            <section>
                <h1>Dashboard</h1>
                <p>Cargando estadísticas...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <h1>Dashboard</h1>

                <p role="alert">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                >
                    Reintentar
                </button>
            </section>
        )
    }

    if (!statistics) {
        return (
            <section>
                <h1>Dashboard</h1>
                <p>No hay estadísticas disponibles.</p>
            </section>
        )
    }

    return (
        <section>
            <h1>Dashboard</h1>

            <p>
                Resumen del sistema de biblioteca.
            </p>

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