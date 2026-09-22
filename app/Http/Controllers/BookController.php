<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\JsonResponse;


class BookController extends Controller
{
    //Se crea una instancia del controlador que venga del servicio de libros
    public function __construct(
        private BookService $bookService)
        {}


    //Muestra todos los libros registrados
    public function index(): JsonResponse{
        return response()->json(
            $this->bookService->getAll()
        );
    }


    //Guarda un nuevo libro en la base de datos
    public function store(BookRequest $request): JsonResponse{
        $book = $this->bookService->create(
            $request->validated()
        );
        return response()->json(
            $book->load([
                'title',
                'author',
                'genre',
            ]),
            201
        );
    }


    //Muestra los detalles de un libro en especifico
    public function show(int $id): JsonResponse{
        return response()->json(
            $this->bookService->findById($id)
        );
    }


    //Actualiza la informacion de un libro existente
    public function update(BookRequest $request, int $id): JsonResponse{

        $book = $this->bookService->findById($id);
        $book = $this->bookService->update(
            $book,
            $request->validated()
        );

        return response()->json($book);
    }


    //Elimina un libro del sistema
    public function destroy(int $id): JsonResponse
    {
        $book = $this->bookService->findById($id);

        $this->bookService->delete($book);

        return response()->json([
            'message' => 'Book deleted successfully',
        ]);
    }
}
