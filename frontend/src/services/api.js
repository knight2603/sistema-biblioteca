const API_URL = 'http://127.0.0.1:8000/api'

//Metodo para conseguir las estadisticas
 export async function getStatistics() {
    const response = await fetch(`${API_URL}/statistics`)

        if (!response.ok){
        throw new Error('Error al obtener las estadisticas')
    }
    return response.json()
 }

 //Metodo para conseguir los libros
 export async function getBooks(){
    const response = await fetch (`${API_URL}/books`)

    if (!response.ok) {
        throw new Error('Error al obtener los libros')
    }
    return response.json()
 }

 //Metodo crear un libro
 export async function createBook(book) {
    const response = await fetch(`${API_URL}/books`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'Application/json',
        },
        body: JSON.stringify(book),
    })

    if(!response.ok){
        throw new Error('Error al crear el libro')
    }
    return response.json()
 }

 //Traer los titulos
 export async function getTitles() {
    const response = await fetch(`${API_URL}/titles`)

    if (!response.ok) {
        throw new Error('Error al obtener los títulos')
    }

    return response.json()
}


//Traer los autores
export async function getAuthors() {
    const response = await fetch(`${API_URL}/authors`)

    if (!response.ok) {
        throw new Error('Error al obtener los autores')
    }

    return response.json()
}

//Traer los generos
export async function getGenres() {
    const response = await fetch(`${API_URL}/genres`)

    if (!response.ok) {
        throw new Error('Error al obtener los géneros')
    }

    return response.json()
}

//Actualizar un libro 
export async function updateBook(id, book) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(book),
    })

    if (!response.ok) {
        throw new Error('Error al actualizar el libro')
    }

    return response.json()
}

//Eliminar un libro 
export async function deleteBook(id) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Error al eliminar el libro')
    }

    return response.json()
}

//Traer los usuarios
export async function getUsers() {
    const response = await fetch(`${API_URL}/users`)

    if (!response.ok) {
        throw new Error('Error al obtener los usuarios')
    }

    return response.json()
}

//Crear un usuario nuevo
export async function createUser(user) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(user),
    })

    if (!response.ok) {
        throw new Error('Error al crear el usuario')
    }

    return response.json()
}

//Actualizar un usuario
export async function updateUser(id, user) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(user),
    })

    if (!response.ok) {
        throw new Error('Error al actualizar el usuario')
    }

    return response.json()
}

//Eliminar un usuario
export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Error al eliminar el usuario')
    }

    return response.json()
}

export async function getLoans() {
    const response = await fetch(`${API_URL}/loans`)

    if (!response.ok) {
        throw new Error('Error al obtener los préstamos')
    }

    return response.json()
}

export async function createLoan(loan) {
    const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(loan),
    })

    if (!response.ok) {
        const errorData = await response.json()

        throw new Error(
            errorData.message || 'Error al crear el préstamo'
        )
    }

    return response.json()
}

export async function updateLoan(id, loan) {
    const response = await fetch(`${API_URL}/loans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(loan),
    })

    if (!response.ok) {
        const errorData = await response.json()

        throw new Error(
            errorData.message || 'Error al actualizar el préstamo'
        )
    }

    return response.json()
}

export async function deleteLoan(id) {
    const response = await fetch(`${API_URL}/loans/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Error al eliminar el préstamo')
    }

    return response.json()
}
