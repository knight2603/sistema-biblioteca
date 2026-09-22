import { useState } from 'react'
import { createBook } from '../services/api'

function BookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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

        try {
            await createBook(formData)

            setSuccess('Libro creado correctamente.')

            setFormData({
                title: '',
                author: '',
                genre: '',
            })
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section>
            <h1>Nuevo libro</h1>
            <p>Registra un nuevo libro en la biblioteca.</p>

            {error && <p>{error}</p>}

            {success && <p>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">
                        Título
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="author">
                        Autor
                    </label>

                    <input
                        id="author"
                        name="author"
                        type="text"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="genre">
                        Género
                    </label>

                    <input
                        id="genre"
                        name="genre"
                        type="text"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Crear libro
                </button>
            </form>
        </section>
    )
}

export default BookForm