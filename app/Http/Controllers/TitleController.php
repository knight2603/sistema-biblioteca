<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\JsonResponse;

class TitleController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Title::all()
        );
    }
}