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

 //Traer los titulkos
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