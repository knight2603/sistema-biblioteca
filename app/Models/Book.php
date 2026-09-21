<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    protected $fillable = [
        'title_id',
        'author_id',
        'genre_id',
        'available',
    ];

    public function title(): BelongsTo{
        return $this->belongsTo(Title::class);
    }

    public function author(): BelongsTo{
        return $this->belongsTo(Author::class);
    }

    public function genre(): BelongsTo{
        return $this->belongsTo(Genre::class);
    }
}
