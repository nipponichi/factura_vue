<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class PaymentMethodController extends Controller
{
    public function __construct()
    {
        $this->middleware(['can:read company'])->only('index');
        $this->middleware(['can:create company'])->only('create');
        $this->middleware(['can:create company'])->only('store');
        $this->middleware(['can:read company'])->only('show');
        $this->middleware(['can:update company'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete company'])->only('destroy');
    }

    public static function index()
    {

        try {
            $methods = DB::table('payment_method')
                ->select('name', 'id')
                ->whereNull('dt_end')
                ->get();
        
            return response()->json(['message' => 'bank accounts', 'methods' => $methods], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index bank accounts: ' . $e->getMessage()], 500);
        }
        
    }
}
