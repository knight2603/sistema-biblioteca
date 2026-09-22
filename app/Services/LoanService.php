<?php

namespace App\Services;
use App\Models\Loan;
use App\Repositories\LoanRepository;
use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;


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
            abort(
                409,
                'El libro no está disponible para prestamo.');
            }

        // Contar prestamos activos del usuario
        $activeLoans = Loan::where('user_id', $data['user_id'])
            ->whereNull('return_date')
            ->count();

        // Maximo 3 prestamos activos
        if ($activeLoans >= 3) {
            abort(
                409,
                'El usuario ya tiene el maximo de 3 prestamos activos.');
            }

            // Crear el prestamo
            $loan = $this->loanRepository->create($data);

            // Cambia el estado del libro como no disponible
            $book->update(['available' => false,]);

            return $loan->load(['user','book',]);
        });
    }

    //Actualizar un prestamo
    public function update(Loan $loan, array $data){
        return DB::transaction(function() use ($loan, $data){
            
        //Verificar que el prestamo no haya sido devuelto 
        if(!empty($data['return_date']) && $loan->return_date !== null){
            abort(
                409,
                'El prestamo ya fue devuelto.'
            );
        }

        //Actualizar el estado del prestamo
        $loan = $this->loanRepository->update(
            $loan,
            $data
        );

        //Si se registro una devolucioon liberar el libro
        if(!empty($data['return_date'])){
            $book = Book::findOrFail($loan->book_id);

            $book->update([ 'available' => true, ]);
        }

        return $loan->load(['user', 'book',]);
        });
    }

    //Eliminar un prestamo
    public function delete(Loan $loan):bool{
        return $this->loanRepository0>delete($loan);
    }
}
