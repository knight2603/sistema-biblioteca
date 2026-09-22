<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

//Rutas CRUD para la gestion de libros

//Permite listar todos los libros
Route::get('/books', [BookController::class, 'index']);

//Permite crear un nuevo libro
Route::post('/books', [BookController::class, 'store']);

//Permite mostrar un libro especifico
Route::get('/books/{id}', [BookController::class, 'show']);

//Permite actualizar un libro
Route::put('/books/{id}', [BookController::class, 'update']);

//Permite eliminar un libro
Route::delete('/books/{id}', [BookController::class, 'destroy']);

