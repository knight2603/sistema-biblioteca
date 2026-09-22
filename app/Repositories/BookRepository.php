<?php

namespace App\Repositories;
use App\Models\Book;


class BookRepository{
    
    //Obtener todos los libros registrados con sus relaciones (titulo, autor, genero)
    public function getAll(){
        return Book::with(['title', 'author', 'genre',])->get();
    }

    //Buscar un libro por su ID con sus relaciones
    public function findById(int $id){
        return Book::with([ 'title', 'author', 'genre'])->findOrFail($id);
    }

    //Crear un libro
    public function create(array $data): Book
    {
        return Book::create($data);
    }

    //Actualizar un libro
    public function update(Book $book, array $data): Book{
        $book->update($data);
        return $book->fresh(['title', 'author', 'genre',]);
    }

    //Eliminar un libro
    public function delete(Book $book): bool{
        return (bool) $book->delete();
    }
}