<?php

namespace App\Services;
use App\Models\Book;
use App\Repositories\BookRepository;

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

    //Crea un libro
    public function create(array $data): Book{
        return $this->bookRepository->create($data);
    }

    //Actualiza un libro
    public function update(Book $book, array $data): Book{
        return $this->bookRepository->update($book, $data);
    }

    //Eliminar un libro
    public function delete (Book $book): bool{
        return $this->bookRepository->delete($book);
    }
}