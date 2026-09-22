<?php

namespace App\Repositories;
use App\Models\user;

class UserRepository
{
    //Busca todos los usuarios con un prestamo
    public function getAll(){
        return User::with('loans')->get();
    }

    //Busca un usuario por ID de prestamo
    public function findById(int $id){
        return User::with('loans')->findOrFail($id);
    }

    //Crear un nuevo usuario
    public function create(array $data):User{
        return User::create($data);
    }

    //Actualizar un usuario
    public function update(User $user, array $data):User{
        $user->update($data);

        return $user->fresh([
            'loans',
        ]);
    }

    //Eliminar un usuario 
    public function delete(User $user):bool{
        return(bool) $user->delete();
    }
}
