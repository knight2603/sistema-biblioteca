<?php

namespace App\Services;
use App\Models\Loan;
use App\Repositories\LoanRepository;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class LoanService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        //Se inyecta una instancia de LoanRepository
        private LoanRepository $loanRepository
    ){}

    //Buscar todos los prestamos
    public function getAll(){
        return $this->loanRepository->getAll();
    }

    //Buscar por ID, si no saltar error
    public function findById(int $id){
        return $this->loanRepository->findById($id);
    }

    //Crear un nuevo prestamo
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

        // Buscar el libro
        $book = Book::findOrFail($data['book_id']);

        // Revisar la disponibilidad
        if (!$book->available) {
            throw new \Exception(
                'El libro no está disponible para préstamo.');
            }

        // Contar préstamos activos del usuario
        $activeLoans = Loan::where('user_id', $data['user_id'])
            ->whereNull('return_date')
            ->count();

        // Máximo 3 préstamos activos
        if ($activeLoans >= 3) {
            throw new \Exception(
                'El usuario ya tiene el máximo de 3 préstamos activos.');
            }

            // Crear el préstamo
            $loan = $this->loanRepository->create($data);

            // Cambia el estado del libro como no disponible
            $book->update(['available' => false,]);

            return $loan->load(['user','book',]);
        });
    }

    //Actualizar un prestamo
    public function update(Loan $loan, array $data){
        return $this->loanRepository->update($loan, $data);
    }

    //Eliminar un prestamo
    public function delete(Loan $loan):bool{
        return $this->loanRepository0>delete($loan);
    }
}
