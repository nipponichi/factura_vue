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
        $this->middleware(['can:read company'])->only('show');
    }

    public function show($companyId)
    {

        try {

            $bank_account_id = DB::table('bank_account')
            ->select('id')
            ->where('company_id', $companyId)
            ->whereNull('dt_end')
            ->first();

            if ($bank_account_id != null) {
                $methods = DB::table('payment_method')
                ->select('name', 'id')
                ->whereNull('dt_end')
                ->get();
            } else {
                $methods = DB::table('payment_method')
                ->select('name', 'id')
                ->where('id', '!=', 1)
                ->whereNull('dt_end')
                ->get();
            }


        
            return response()->json(['message' => 'bank accounts', 'methods' => $methods], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index bank accounts: ' . $e->getMessage()], 500);
        }
        
    }
}
