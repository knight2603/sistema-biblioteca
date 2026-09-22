<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Title extends Model
{
    protected $fillable = [
        'name',
    ];

    //Un registro puede tener muchos libros asociados
    public function books(): HasMany{
        return $this->hasMany(Book::class);
    }
}
