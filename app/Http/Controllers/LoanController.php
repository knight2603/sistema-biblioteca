<?php

namespace App\Http\Controllers;
use App\Http\Requests\LoanRequest;
use App\Models\Loan;
use App\Services\LoanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoanController extends Controller
{

    //Se crea una instancia que viene desde servicios
    public function __construct(
        private LoanService $loanService
    ){}

    //Traer todos los prestamos en un Json
    public function index(): JsonResponse{
        return response()->json(
            $this->loanService->getAll()
        );
    }

    //Crear un nuevo prestamo
    public function store(LoanRequest $request): JsonResponse{
        $loan = $this->loanService->create(
            $request->validated()
        );
        return response()->json(
            $loan->load([
                'user',
                'book',
            ]),
            201
        );
    }

    //Buscar un prestamo por ID especifico
    public function show(int $id):JsonResponse{
        return response()->json(
            $this->loanService->findById($id)
        );
    }


    //Actualizar un prestamo
    public function update(LoanRequest $request, int $id):JsonResponse{
        $loan = $this->loanService->findById($id);

        $loan =$this->loanService->update(
            $loan,
            $request->validated()
        );

        return response()->json($loan);
    }


    //Eliminar un prestamo
    public function destroy(Loan $loan): JsonResponse{
        $this->loanService->delete($loan);

        return response()->json([
            'message'=> 'Loan deleted succesfully',
        ]);
    }
}
