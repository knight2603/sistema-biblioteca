<?php

namespace App\Services;
use App\Models\User;
Use App\Repositories\UserRepository;

class UserService
{

    public function __construct(
        //Creamos una instancia desde el repositorio
        private UserRepository $userRepository){}

    //Buscar todos los usuarios
    public function getAll(){
        return $this->userRepository->getAll();
    }

    //Buscar por ID
    public function findById(int $id){
        return $this->userRepository->findById($id);
    }

    //Creamos un usuario
    public function create(array $data): User {
        return $this->userRepository->create($data);
    }

    //Actualizamos un usuario
    public function update(User $user, array $data): User{
        return $this->userRepository->update($user, $data);
    }

    //Eliminamos un usuario
    public function delete(User $user):bool{
        return $this->userRepository->delete($user);
    }
}
