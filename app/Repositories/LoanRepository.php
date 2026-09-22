<?php

namespace App\Repositories;
use App\Models\Loan;

class LoanRepository
{

    //Obtener todos los prestamos
    public function getAll(){
        return Loan::with([ 'user', 'book' ])->get();
    }

    //Buscar un libro por su ID, si no falla
    public function findById(int $id){
        return Loan::with([ 'user', 'book' ])->findOrFail($id);
    }

    //Crear un nuevo prestamo
    public function create(array $data): Loan{
        return Loan::create($data);
    }

    //Actualizar un prestamo
    public function update(Loan $loan, array $data): Loan{
        $loan->update($data);
        return $loan->fresh([ 'user', 'book']);
    }

    //Eliminar un prestamo
    public function delete(Loan $loan):bool{
        return(bool) $loan->delete();
    }
}
