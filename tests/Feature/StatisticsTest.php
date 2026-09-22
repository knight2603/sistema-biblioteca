<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatisticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_library_statistics(): void
    {
        $user = User::factory()->create();

        $bookResponse = $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
            'available' => true,
        ]);

        $bookId = $bookResponse->json('id');

        $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $bookId,
            'loan_date' => '2026-09-22',
        ])->assertStatus(201);

        $response = $this->getJson('/api/statistics');

        $response
            ->assertStatus(200)
            ->assertJsonPath('total_books', 1)
            ->assertJsonPath('available_books', 0)
            ->assertJsonPath('loaned_books', 1)
            ->assertJsonPath('total_loans', 1)
            ->assertJsonPath('active_loans', 1)
            ->assertJsonPath(
                'books_by_genre.0.genre',
                'Ficción'
            )
            ->assertJsonPath(
                'books_by_genre.0.total',
                1
            );
    }
}