<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();

            $table->foreignId('title_id')
            ->constrained('titles')
            ->restrictOnDelete();

            $table->foreignId('author_id')
            ->constrained('authors')
            ->restrictOnDelete();

            $table->foreignId('genre_id')
            ->constrained('genres')
            ->restrictOnDelete();

            $table->boolean('available')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
