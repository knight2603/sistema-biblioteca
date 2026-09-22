<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Loan;

class Book extends Model
{
    protected $fillable = [
        'title_id',
        'author_id',
        'genre_id',
        'available',
    ];

    //Un libro puede tener un titulo
    public function title(): BelongsTo{
        return $this->belongsTo(Title::class);
    }

    //Un libro puede tener a un autor
    public function author(): BelongsTo{
        return $this->belongsTo(Author::class);
    }

    //Un libro puede tener un genero
    public function genre(): BelongsTo{
        return $this->belongsTo(Genre::class);
    }

    //Un libro puede tener varios prestamos
    public function loans():HasMany{
        return $this->hasMany(Loan::class);
    }
}
