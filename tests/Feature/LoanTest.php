<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoanTest extends TestCase
{
    use RefreshDatabase;

    private function createBook(): Book
    {
        $response = $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupery',
            'genre' => 'Ficcion',
            'available' => true,
        ]);

        return Book::findOrFail($response->json('id'));
    }

    public function test_can_create_a_loan(): void
    {
        $user = User::factory()->create();
        $book = $this->createBook();

        $response = $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
        ]);

        $response
            ->assertStatus(201)
            ->assertJsonPath('user_id', $user->id)
            ->assertJsonPath('book_id', $book->id);

        $this->assertDatabaseHas('loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'return_date' => null,
        ]);

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'available' => false,
        ]);
    }

    public function test_cannot_loan_an_unavailable_book(): void
    {
        $user = User::factory()->create();
        $book = $this->createBook();

        $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
        ]);

        $response = $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
        ]);

        $response
            ->assertStatus(409)
            ->assertJson([
                'message' => 'El libro no está disponible para prestamo.',
            ]);
    }

    public function test_user_cannot_have_more_than_three_active_loans(): void
    {
        $user = User::factory()->create();

        for ($i = 0; $i < 3; $i++) {
            $book = $this->createBook();

            $this->postJson('/api/loans', [
                'user_id' => $user->id,
                'book_id' => $book->id,
                'loan_date' => '2026-09-22',
            ])->assertStatus(201);
        }

        $fourthBook = $this->createBook();

        $response = $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $fourthBook->id,
            'loan_date' => '2026-09-22',
        ]);

        $response
            ->assertStatus(409)
            ->assertJson([
                'message' => 'El usuario ya tiene el maximo de 3 prestamos activos.',
            ]);
    }

    public function test_can_return_a_loan(): void
    {
        $user = User::factory()->create();
        $book = $this->createBook();

        $loanResponse = $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
        ]);

        $loanId = $loanResponse->json('id');

        $response = $this->putJson("/api/loans/{$loanId}", [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
            'return_date' => '2026-09-23',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonPath('return_date', '2026-09-23T00:00:00.000000Z');

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'available' => true,
        ]);
    }

    public function test_cannot_return_an_already_returned_loan(): void
    {
        $user = User::factory()->create();
        $book = $this->createBook();

        $loanResponse = $this->postJson('/api/loans', [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
        ]);

        $loanId = $loanResponse->json('id');

        $this->putJson("/api/loans/{$loanId}", [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
            'return_date' => '2026-09-23',
        ])->assertStatus(200);

        $response = $this->putJson("/api/loans/{$loanId}", [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'loan_date' => '2026-09-22',
            'return_date' => '2026-09-24',
        ]);

            $response->dump();
            $response->assertStatus(409);
    }
}