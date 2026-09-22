import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createBook } from '../services/api'

function BookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError(null)
        setSuccess(null)

        const title = formData.title.trim()
        const author = formData.author.trim()
        const genre = formData.genre.trim()

        if (!title || !author || !genre) {
            setError('Todos los campos son obligatorios.')
            return
        }

        if (title.length > 255) {
            setError('El título no puede superar los 255 caracteres.')
            return
        }

        if (author.length > 255) {
            setError('El autor no puede superar los 255 caracteres.')
            return
        }

        if (genre.length > 255) {
            setError('El género no puede superar los 255 caracteres.')
            return
        }

        try {
            setLoading(true)

            await createBook({
                title,
                author,
                genre,
            })

            setSuccess('Libro creado correctamente.')

            setFormData({
                title: '',
                author: '',
                genre: '',
            })
        } catch (error) {
            setError(
                error.message ||
                'No se pudo crear el libro.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="page-section">

            <div className="page-header">
                <div>
                    <h1>Nuevo libro</h1>

                    <p>
                        Registra un nuevo libro en la biblioteca.
                    </p>
                </div>

                <Link
                    to="/books"
                    className="secondary-button"
                >
                    Volver a libros
                </Link>
            </div>

            <div className="form-panel">

                <div className="form-panel-header">
                    <div>
                        <h2>Información del libro</h2>

                        <p>
                            Completa los datos para registrar un nuevo libro.
                        </p>
                    </div>
                </div>

                {error && (
                    <div
                        className="error-message"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        className="success-message"
                        role="status"
                    >
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label htmlFor="title">
                                Título
                            </label>

                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                maxLength="255"
                                placeholder="Ej. El principito"
                                required
                            />

                            <small>
                                Máximo 255 caracteres.
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">
                                Autor
                            </label>

                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={formData.author}
                                onChange={handleChange}
                                maxLength="255"
                                placeholder="Ej. Antoine de Saint-Exupéry"
                                required
                            />

                            <small>
                                Máximo 255 caracteres.
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">
                                Género
                            </label>

                            <input
                                id="genre"
                                name="genre"
                                type="text"
                                value={formData.genre}
                                onChange={handleChange}
                                maxLength="255"
                                placeholder="Ej. Ficción"
                                required
                            />

                            <small>
                                Máximo 255 caracteres.
                            </small>
                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? 'Guardando...'
                                : 'Crear libro'}
                        </button>

                        <Link
                            to="/books"
                            className="secondary-button"
                        >
                            Cancelar
                        </Link>

                    </div>

                </form>

            </div>

        </section>
    )
}

export default BookForm