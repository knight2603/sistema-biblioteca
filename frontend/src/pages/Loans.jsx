import { useEffect, useState } from 'react'
import {
    getLoans,
    createLoan,
    updateLoan,
} from '../services/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBook,
    faUser,
    faCalendar,
    faRotateLeft,
    faPlus,
    faCheck,
    faClock,
} from '@fortawesome/free-solid-svg-icons'

function Loans() {
    const [loans, setLoans] = useState([])
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        user_id: '',
        book_id: '',
        loan_date: '',
    })

    const [loading, setLoading] = useState(false)

    const loadLoans = async () => {
        try {
            setError(null)

            const data = await getLoans()

            setLoans(data)
        } catch {
            setError(
                'No se pudieron cargar los préstamos.'
            )
        }
    }

    useEffect(() => {
        loadLoans()
    }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        setError(null)

        if (!formData.user_id || !formData.book_id) {
            setError(
                'El usuario y el libro son obligatorios.'
            )
            return
        }

        if (!formData.loan_date) {
            setError(
                'La fecha de préstamo es obligatoria.'
            )
            return
        }

        try {
            setLoading(true)

            await createLoan({
                user_id: Number(formData.user_id),
                book_id: Number(formData.book_id),
                loan_date: formData.loan_date,
            })

            setFormData({
                user_id: '',
                book_id: '',
                loan_date: '',
            })

            await loadLoans()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo registrar el préstamo.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleReturn = async (loan) => {
        const confirmed = window.confirm(
            '¿Deseas registrar la devolución de este libro?'
        )

        if (!confirmed) {
            return
        }

        try {
            setError(null)
            setLoading(true)

            await updateLoan(loan.id, {
                user_id: loan.user_id,
                book_id: loan.book_id,
                loan_date: loan.loan_date,
                return_date: new Date()
                    .toISOString()
                    .split('T')[0],
            })

            await loadLoans()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo registrar la devolución.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="page-section">

            {/* Encabezado */}

            <div className="page-header">

                <div>
                    <h1>Préstamos</h1>

                    <p>
                        Gestión de préstamos y devoluciones de la biblioteca.
                    </p>
                </div>

            </div>

            {/* Error */}

            {error && (
                <div
                    className="error-message"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {/* Nuevo préstamo */}

            <div className="form-panel">

                <div className="form-panel-header">

                    <div className="section-title">

                        <div className="section-icon">
                            <FontAwesomeIcon
                                icon={faPlus}
                            />
                        </div>

                        <div>
                            <h2>Nuevo préstamo</h2>

                            <p>
                                Registra un nuevo préstamo de la biblioteca.
                            </p>
                        </div>

                    </div>

                </div>

                <form onSubmit={handleCreate}>

                    <div className="form-grid">

                        <div className="form-group">

                            <label htmlFor="user_id">
                                ID del usuario
                            </label>

                            <input
                                id="user_id"
                                name="user_id"
                                type="number"
                                min="1"
                                value={formData.user_id}
                                onChange={handleChange}
                                placeholder="Ej. 1"
                                required
                            />

                            <small>
                                Ingresa el ID del usuario registrado.
                            </small>

                        </div>

                        <div className="form-group">

                            <label htmlFor="book_id">
                                ID del libro
                            </label>

                            <input
                                id="book_id"
                                name="book_id"
                                type="number"
                                min="1"
                                value={formData.book_id}
                                onChange={handleChange}
                                placeholder="Ej. 1"
                                required
                            />

                            <small>
                                Ingresa el ID del libro disponible.
                            </small>

                        </div>

                        <div className="form-group">

                            <label htmlFor="loan_date">
                                Fecha de préstamo
                            </label>

                            <input
                                id="loan_date"
                                name="loan_date"
                                type="date"
                                value={formData.loan_date}
                                onChange={handleChange}
                                required
                            />

                            <small>
                                Fecha en la que se realiza el préstamo.
                            </small>

                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            <FontAwesomeIcon
                                icon={faBook}
                            />

                            {loading
                                ? 'Registrando...'
                                : 'Registrar préstamo'}
                        </button>

                    </div>

                </form>

            </div>

            {/* Lista */}

            <div className="loans-section">

                <div className="section-heading">

                    <div>
                        <h2>Préstamos registrados</h2>

                        <p>
                            Consulta el estado de los préstamos realizados.
                        </p>
                    </div>

                    <span className="users-count">
                        {loans.length}
                        {' '}
                        {loans.length === 1
                            ? 'préstamo'
                            : 'préstamos'}
                    </span>

                </div>

                {!loans.length ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            <FontAwesomeIcon
                                icon={faBook}
                            />
                        </div>

                        <h2>
                            No hay préstamos registrados
                        </h2>

                        <p>
                            Los préstamos registrados aparecerán aquí.
                        </p>

                    </div>

                ) : (

                    <div className="loans-grid">

                        {loans.map((loan) => (

                            <article
                                className="loan-card"
                                key={loan.id}
                            >

                                {/* Cabecera */}

                                <div className="loan-card-header">

                                    <div className="loan-icon">
                                        <FontAwesomeIcon
                                            icon={faBook}
                                        />
                                    </div>

                                    <span
                                        className={
                                            loan.return_date
                                                ? 'status-badge available'
                                                : 'status-badge borrowed'
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                loan.return_date
                                                    ? faCheck
                                                    : faClock
                                            }
                                        />

                                        {loan.return_date
                                            ? 'Devuelto'
                                            : 'Activo'}
                                    </span>

                                </div>

                                {/* Contenido */}

                                <div className="loan-card-content">

                                    <h3>
                                        Préstamo #{loan.id}
                                    </h3>

                                    <div className="loan-information">

                                        <div>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                            />

                                            <div>
                                                <span>
                                                    Usuario
                                                </span>

                                                <strong>
                                                    {loan.user?.name ||
                                                        `ID ${loan.user_id}`}
                                                </strong>
                                            </div>
                                        </div>

                                        <div>
                                            <FontAwesomeIcon
                                                icon={faBook}
                                            />

                                            <div>
                                                <span>
                                                    Libro
                                                </span>

                                                <strong>
                                                    {loan.book?.title?.name ||
                                                        `ID ${loan.book_id}`}
                                                </strong>
                                            </div>
                                        </div>

                                        <div>
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                            />

                                            <div>
                                                <span>
                                                    Fecha de préstamo
                                                </span>

                                                <strong>
                                                    {loan.loan_date}
                                                </strong>
                                            </div>
                                        </div>

                                        {loan.return_date && (
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faRotateLeft}
                                                />

                                                <div>
                                                    <span>
                                                        Fecha de devolución
                                                    </span>

                                                    <strong>
                                                        {loan.return_date}
                                                    </strong>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* Acción */}

                                {!loan.return_date && (
                                    <div className="loan-card-actions">

                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={() =>
                                                handleReturn(loan)
                                            }
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faRotateLeft}
                                            />

                                            Registrar devolución
                                        </button>

                                    </div>
                                )}

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </section>
    )
}

export default Loans