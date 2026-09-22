<?php

namespace App\Services;
use App\Models\Book;
use App\Repositories\BookRepository;
use App\Models\Title;
use App\Models\Author;
use App\Models\Genre;

class BookService{
    //Crea una nueva instancia del servicio
    public function __construct(
        private BookRepository $bookRepository
    ){}

    //Obtiene todos los libros registros en el sistema
    public function getAll(){
        return $this->bookRepository->getAll();
    }

    //Busca un libro especifico por su ID
    public function findById(int $id){
        return $this->bookRepository->findById($id);
    }

    //Crear un nuevo libro
    public function create(array $data): Book
    {
        $title = Title::firstOrCreate([
            'name' => $data['title'],
        ]);

        $author = Author::firstOrCreate([
            'name' => $data['author'],
        ]);

        $genre = Genre::firstOrCreate([
            'name' => $data['genre'],
        ]);

        return $this->bookRepository->create([
            'title_id' => $title->id,
            'author_id' => $author->id,
            'genre_id' => $genre->id,
            'available' => $data['available'] ?? true,
        ]);
    }

    //Actualiza un libro
    public function update(Book $book, array $data): Book
    {
        $title = Title::firstOrCreate([
            'name' => $data['title'],
        ]);

        $author = Author::firstOrCreate([
            'name' => $data['author'],
        ]);

        $genre = Genre::firstOrCreate([
            'name' => $data['genre'],
        ]);

        return $this->bookRepository->update($book, [
            'title_id' => $title->id,
            'author_id' => $author->id,
            'genre_id' => $genre->id,
            'available' => $data['available'] ?? $book->available,
        ]);
    }

    //Eliminar un libro
    public function delete (Book $book): bool{
        return $this->bookRepository->delete($book);
    }
}