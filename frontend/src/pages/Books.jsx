import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    getBooks,
    updateBook,
    deleteBook,
} from '../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

function Books() {
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [editingBook, setEditingBook] = useState(null)

    const loadBooks = async () => {
        try {
            setError(null)

            const data = await getBooks()
            setBooks(data)
        } catch {
            setError('No se pudieron cargar los libros.')
        }
    }

    useEffect(() => {
        loadBooks()
    }, [])

    const handleEdit = (book) => {
        setError(null)

        setEditingBook({
            id: book.id,
            title: book.title.name,
            author: book.author.name,
            genre: book.genre.name,
            available: book.available,
        })
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        setError(null)

        if (
            !editingBook.title.trim() ||
            !editingBook.author.trim() ||
            !editingBook.genre.trim()
        ) {
            setError('Todos los campos son obligatorios.')
            return
        }

        try {
            await updateBook(editingBook.id, {
                title: editingBook.title.trim(),
                author: editingBook.author.trim(),
                genre: editingBook.genre.trim(),
                available: editingBook.available,
            })

            setEditingBook(null)
            await loadBooks()
        } catch {
            setError('No se pudo actualizar el libro.')
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '¿Deseas eliminar este libro?'
        )

        if (!confirmed) {
            return
        }

        try {
            setError(null)

            await deleteBook(id)
            await loadBooks()
        } catch {
            setError('No se pudo eliminar el libro.')
        }
    }

    if (error && !editingBook && !books.length) {
        return (
            <section className="page-section">
                <div className="page-header">
                    <div>
                        <h1>Libros</h1>
                        <p>
                            Gestión de libros de la biblioteca.
                        </p>
                    </div>
                </div>

                <div className="error-message" role="alert">
                    {error}
                </div>
            </section>
        )
    }

    return (
        <section className="page-section">

            <div className="page-header">
                <div>
                    <h1>Libros</h1>

                    <p>
                        Gestión de libros de la biblioteca.
                    </p>
                </div>

                <Link
                    className="primary-button"
                    to="/books/new"
                >
                    + Nuevo libro
                </Link>
            </div>

            {error && (
                <div
                    className="error-message"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {editingBook && (
                <div className="edit-panel">
                    <div className="edit-panel-header">
                        <div>
                            <h2>Editar libro</h2>

                            <p>
                                Modifica la información del libro.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="close-button"
                            onClick={() => setEditingBook(null)}
                            aria-label="Cerrar formulario de edición"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleUpdate}>

                        <div className="form-grid">

                            <div className="form-group">
                                <label htmlFor="edit-title">
                                    Título
                                </label>

                                <input
                                    id="edit-title"
                                    type="text"
                                    value={editingBook.title}
                                    onChange={(event) =>
                                        setEditingBook({
                                            ...editingBook,
                                            title: event.target.value,
                                        })
                                    }
                                    maxLength="255"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-author">
                                    Autor
                                </label>

                                <input
                                    id="edit-author"
                                    type="text"
                                    value={editingBook.author}
                                    onChange={(event) =>
                                        setEditingBook({
                                            ...editingBook,
                                            author: event.target.value,
                                        })
                                    }
                                    maxLength="255"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-genre">
                                    Género
                                </label>

                                <input
                                    id="edit-genre"
                                    type="text"
                                    value={editingBook.genre}
                                    onChange={(event) =>
                                        setEditingBook({
                                            ...editingBook,
                                            genre: event.target.value,
                                        })
                                    }
                                    maxLength="255"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Guardar cambios
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => setEditingBook(null)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {!books.length ? (
                <div className="empty-state">
                    <h2>No hay libros registrados</h2>

                    <p>
                        Comienza agregando el primer libro a la biblioteca.
                    </p>

                    <Link
                        className="primary-button"
                        to="/books/new"
                    >
                        Agregar libro
                    </Link>
                </div>
            ) : (
                <div className="books-grid">

                    {books.map((book) => (
                        <article
                            className="book-card"
                            key={book.id}
                        >
                            <div className="book-card-header">

                            <div className="book-icon">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                                <span
                                    className={
                                        book.available
                                            ? 'status-badge available'
                                            : 'status-badge borrowed'
                                    }
                                >
                                    {book.available
                                        ? 'Disponible'
                                        : 'Prestado'}
                                </span>

                            </div>

                            <div className="book-card-content">

                                <h2>
                                    {book.title.name}
                                </h2>

                                <div className="book-information">

                                    <div>
                                        <span>
                                            Autor
                                        </span>

                                        <strong>
                                            {book.author.name}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Género
                                        </span>

                                        <strong>
                                            {book.genre.name}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            ID del libro
                                        </span>

                                        <strong>
                                            #{book.id}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <div className="book-card-actions">

                                <button
                                    type="button"
                                    className="edit-button"
                                    onClick={() => handleEdit(book)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Eliminar
                                </button>

                            </div>
                        </article>
                    ))}

                </div>
            )}
        </section>
    )
}

export default Books