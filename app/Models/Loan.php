<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Books;

class Loan extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'loan_date',
        'return_date',
    ];

    //Transforma fechas
    protected $casts = [
        'loan_date' => 'date',
        'return_date' =>'date',
    ];

    //Un prestamo le pertenece a un usuario
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    //Un prestamo le pertenece a un libro
    public function book():BelongsTo{
        return $this->belongsTo(Book::class);
    }

}

