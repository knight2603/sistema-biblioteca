<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    //Creamos una instancia que venga de Services
    public function __construct(
        private UserService $userService
    ){}

    //Traer todos los registros en Json
    public function index():JsonResponse{
        return response()->json(
            $this->userService->getAll()
        );
    }


    //Permite registrar un nuevo usuario
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->create(
            $request->validated()
        );

        return response()->json(
            $user,
            201
        );
    }


    //Permite traer un usuario por ID
    public function show(int $id): JsonResponse{
        return response()->json(
            $this->userService->findById($id)
        );
    }


    //Permite actualizar un usuario
    public function update(UserRequest $request, int $id): JsonResponse{
        $user = $this->userService->findById($id);

        $user = $this->userService->update(
            $user,
            $request->validated()
        );
        return response()->json($user);
    }


    //Permite eliminar un usuario
    public function destroy(User $user):JsonResponse{
        $this->userService->delete($user);

        return response()->json([
            'message'=> 'User deleted successfully',
        ]);
    }
}
