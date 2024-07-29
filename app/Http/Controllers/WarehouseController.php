<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Exception;

class WarehouseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['can:read warehouse'])->only('index', 'show');
        $this->middleware(['can:create warehouse'])->only('create', 'store');
        $this->middleware(['can:update warehouse'])->only('edit', 'update');
        $this->middleware(['can:delete warehouse'])->only('destroy');
    }

    public static function index()
    {
        try {
            return Inertia::render('Warehouse/TableWarehouse');
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }
    }

}
