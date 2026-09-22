<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\UserController;

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

//Permite litar todos los prestamos
Route::get('/loans', [LoanController::class, 'index']);

//permite crear un nuevo prestamo
Route::post('/loans', [LoanController::class, 'store']);

//Permite mostrar un prestamo especifico
Route::get('/loans/{id}', [LoanController::class, 'show']);

//Permite actualizar un prestamo
Route::put('/loans/{id}', [LoanController::class, 'update']);

//Permite eliminar un prestamo
Route::delete('/loans/{id}', [LoanController::class, 'destroy']);

//Permite listar los usuarios
Route::get('/users', [UserController::class, 'index']);

//Permite crear un nuevo usuario
Route::post('/users', [UserCOntroller::class, 'store']);

//Permite traer un usuario especifico
Route::get('/users/{id}', [UserController::class, 'show']);

//Permite actualizar un usuario
Route::put('/users/{id}', [UserController::class, 'update']);

//Permite eliminar un usuario
Route::delete('/users/{id}', [UserController::class, 'destroy']);

