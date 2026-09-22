<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_book(): void
    {
        $response = $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
            'available' => true,
        ]);

        $response
            ->assertStatus(201)
            ->assertJsonPath('title.name', 'El principito')
            ->assertJsonPath('author.name', 'Antoine de Saint-Exupéry')
            ->assertJsonPath('genre.name', 'Ficción');

        $this->assertDatabaseCount('books', 1);
    }

    public function test_can_list_books(): void
    {
        $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
        ]);

        $response = $this->getJson('/api/books');

        $response
            ->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_can_update_a_book(): void
    {
        $createResponse = $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
        ]);

        $bookId = $createResponse->json('id');

        $response = $this->putJson("/api/books/{$bookId}", [
            'title' => 'El principito actualizado',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
            'available' => true,
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonPath(
                'title.name',
                'El principito actualizado'
            );
    }

    public function test_can_delete_a_book(): void
    {
        $createResponse = $this->postJson('/api/books', [
            'title' => 'El principito',
            'author' => 'Antoine de Saint-Exupéry',
            'genre' => 'Ficción',
        ]);

        $bookId = $createResponse->json('id');

        $response = $this->deleteJson("/api/books/{$bookId}");

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Book deleted successfully',
            ]);

        $this->assertDatabaseMissing('books', [
            'id' => $bookId,
        ]);
    }
}