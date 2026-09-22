<?php

namespace App\Repositories;
use App\Models\Book;
Use App\Models\Loan;
use Illuminate\Support\Facades\DB;

class StatisticsRepository
{

    public function getStatistics():array{

        //Contar todos los libros
        $totalBooks = Book::count();

        //Los libros que estan disponibles
        $availableBooks = Book::where('available', true)->count();

        //Los libros que se encuentran prestados
        $loanedBooks = Book::where('available', false)->count();

        //Total de prestamos
        $totalLoans = Loan::count();

        //Prestamos activos
        $activeLoans = Loan::whereNull('return_date')->count();

        //Libros por genero
        $booksByGenre = Book::query()
        -> join ('genres', 'books.genre_id', '=', 'genres.id')
        -> select ('genres.name as genre',
        DB::raw('count(books.id) as total'))
        ->groupBy('genres.id', 'genres.name')
        ->get();

        return[
            'total_books' => $totalBooks,
            'available_books' => $availableBooks,
            'loaned_books' => $loanedBooks,
            'total_loans' => $totalLoans,
            'active_loans' => $activeLoans,
            'books_by_genre' => $booksByGenre
        ];
    }
}
