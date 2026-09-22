import { useEffect, useState } from 'react'
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from '../services/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faEnvelope,
    faBook,
    faPen,
    faTrash,
    faXmark,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

function Users() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [editingUser, setEditingUser] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)

    const loadUsers = async () => {
        try {
            setError(null)

            const data = await getUsers()

            setUsers(data)
        } catch {
            setError(
                'No se pudieron cargar los usuarios.'
            )
        }
    }

    useEffect(() => {
        loadUsers()
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

        const name = formData.name.trim()
        const email = formData.email.trim()
        const password = formData.password

        if (!name || !email || !password) {
            setError(
                'Todos los campos son obligatorios.'
            )
            return
        }

        if (name.length > 255) {
            setError(
                'El nombre no puede superar los 255 caracteres.'
            )
            return
        }

        if (password.length < 8) {
            setError(
                'La contraseña debe tener al menos 8 caracteres.'
            )
            return
        }

        try {
            setLoading(true)

            await createUser({
                name,
                email,
                password,
            })

            setFormData({
                name: '',
                email: '',
                password: '',
            })

            await loadUsers()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo crear el usuario.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (user) => {
        setError(null)

        setEditingUser({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    }

    const handleUpdate = async (event) => {
        event.preventDefault()

        setError(null)

        const name = editingUser.name.trim()
        const email = editingUser.email.trim()

        if (!name || !email) {
            setError(
                'El nombre y el correo son obligatorios.'
            )
            return
        }

        if (name.length > 255) {
            setError(
                'El nombre no puede superar los 255 caracteres.'
            )
            return
        }

        try {
            setLoading(true)

            await updateUser(editingUser.id, {
                name,
                email,
                password: 'password123',
            })

            setEditingUser(null)

            await loadUsers()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo actualizar el usuario.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '¿Deseas eliminar este usuario?'
        )

        if (!confirmed) {
            return
        }

        try {
            setError(null)

            await deleteUser(id)

            await loadUsers()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo eliminar el usuario.'
            )
        }
    }

    return (
        <section className="page-section">

            <div className="page-header">
                <div>
                    <h1>Usuarios</h1>

                    <p>
                        Gestión de usuarios de la biblioteca.
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

            {/* Crear usuario */}

            <div className="form-panel">

                <div className="form-panel-header">

                    <div className="section-title">

                        <div className="section-icon">
                            <FontAwesomeIcon
                                icon={faUserPlus}
                            />
                        </div>

                        <div>
                            <h2>Nuevo usuario</h2>

                            <p>
                                Registra un nuevo usuario en la biblioteca.
                            </p>
                        </div>

                    </div>

                </div>

                <form onSubmit={handleCreate}>

                    <div className="form-grid">

                        <div className="form-group">

                            <label htmlFor="name">
                                Nombre
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength="255"
                                placeholder="Nombre completo"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                maxLength="255"
                                placeholder="correo@ejemplo.com"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="8"
                                placeholder="Mínimo 8 caracteres"
                                required
                            />

                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            <FontAwesomeIcon
                                icon={faUserPlus}
                            />

                            {loading
                                ? 'Creando...'
                                : 'Crear usuario'}
                        </button>

                    </div>

                </form>

            </div>

            {/* Editar usuario */}

            {editingUser && (
                <div className="edit-panel">

                    <div className="edit-panel-header">

                        <div className="section-title">

                            <div className="section-icon">
                                <FontAwesomeIcon
                                    icon={faPen}
                                />
                            </div>

                            <div>
                                <h2>Editar usuario</h2>

                                <p>
                                    Modifica la información del usuario.
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            className="close-button"
                            onClick={() =>
                                setEditingUser(null)
                            }
                            aria-label="Cerrar formulario de edición"
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                            />
                        </button>

                    </div>

                    <form onSubmit={handleUpdate}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label htmlFor="edit-user-name">
                                    Nombre
                                </label>

                                <input
                                    id="edit-user-name"
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(event) =>
                                        setEditingUser({
                                            ...editingUser,
                                            name: event.target.value,
                                        })
                                    }
                                    maxLength="255"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="edit-user-email">
                                    Correo electrónico
                                </label>

                                <input
                                    id="edit-user-email"
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(event) =>
                                        setEditingUser({
                                            ...editingUser,
                                            email: event.target.value,
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
                                disabled={loading}
                            >
                                <FontAwesomeIcon
                                    icon={faPen}
                                />

                                {loading
                                    ? 'Guardando...'
                                    : 'Guardar cambios'}
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    setEditingUser(null)
                                }
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {/* Usuarios registrados */}

            <div className="users-section">

                <div className="section-heading">
                    <div>
                        <h2>Usuarios registrados</h2>

                        <p>
                            Usuarios actualmente registrados en el sistema.
                        </p>
                    </div>

                    <span className="users-count">
                        {users.length}
                        {' '}
                        {users.length === 1
                            ? 'usuario'
                            : 'usuarios'}
                    </span>
                </div>

                {!users.length ? (
                    <div className="empty-state">

                        <div className="empty-icon">
                            <FontAwesomeIcon
                                icon={faUser}
                            />
                        </div>

                        <h2>
                            No hay usuarios registrados
                        </h2>

                        <p>
                            Comienza registrando el primer usuario.
                        </p>

                    </div>
                ) : (
                    <div className="users-grid">

                        {users.map((user) => (
                            <article
                                className="user-card"
                                key={user.id}
                            >

                                <div className="user-card-header">

                                    <div className="user-icon">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                        />
                                    </div>

                                    <span className="user-id">
                                        #{user.id}
                                    </span>

                                </div>

                                <div className="user-card-content">

                                    <h3>
                                        {user.name}
                                    </h3>

                                    <div className="user-information">

                                        <div>
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />

                                            <span>
                                                {user.email}
                                            </span>
                                        </div>

                                        <div>
                                            <FontAwesomeIcon
                                                icon={faBook}
                                            />

                                            <span>
                                                {user.loans?.length ?? 0}
                                                {' '}
                                                {user.loans?.length === 1
                                                    ? 'préstamo'
                                                    : 'préstamos'}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                <div className="user-card-actions">

                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() =>
                                            handleEdit(user)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                        />

                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(user.id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                        />

                                        Eliminar
                                    </button>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>

        </section>
    )
}

export default Users