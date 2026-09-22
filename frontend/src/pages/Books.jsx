import { useEffect, useState } from 'react'
import { getBooks } from '../services/api'

function Books() {
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getBooks()
            .then((data) => {
                setBooks(data)
            })
            .catch(() => {
                setError('No se pudieron cargar los libros.')
            })
    }, [])

    if (error) {
        return <p>{error}</p>
    }

    return (
        <section>
            <h1>Libros</h1>
            <p>Gestión de libros de la biblioteca.</p>

            {!books.length ? (
                <p>No hay libros registrados.</p>
            ) : (
                <div>
                    {books.map((book) => (
                        <div key={book.id}>
                            <h3>{book.title.name}</h3>
                            <p>Autor: {book.author.name}</p>
                            <p>Género: {book.genre.name}</p>
                            <p>
                                Estado:{' '}
                                {book.available
                                    ? 'Disponible'
                                    : 'Prestado'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default Books