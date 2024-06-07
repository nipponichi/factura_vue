<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\BankRequest;
use Illuminate\Support\Facades\DB;
use Exception;

class BankController extends Controller
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

    public static function index($companyId)
    {

        try {
            $accounts = DB::table('bank_account')
                ->select('id', 'iban', 'entity', 'office', 'control_digit', 'account_number', 'bank_name', 'country', 'swift', 'currency', 'favourite','complete_bank_account')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->orderByDesc('favourite')
                ->get();
        
            return response()->json(['message' => 'bank accounts', 'accounts' => $accounts], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index bank accounts: ' . $e->getMessage()], 500);
        }
        
    }

    // Not needed
    public function edit()
    {
        //
    }

    public function update($bankAccountId, BankRequest $request)
    {
        DB::beginTransaction();
        try {
            
            // Obtener el company_id de la cuenta bancaria existente
            $companyResult = DB::table('bank_account')
                ->select('company_id')
                ->where('id', $bankAccountId)
                ->first();

            if ($companyResult) {
                $companyId = $companyResult->company_id;
            }

            // Insertar una nueva cuenta bancaria
            $newAccountId = DB::table('bank_account')->insertGetId([
                'iban' => $request->iban,
                'entity' => $request->entity,
                'office' => $request->office,
                'control_digit' => $request->control_digit,
                'account_number' => $request->account_number,
                'bank_name' => $request->bank_name,
                'country' => $request->country,
                'swift' => $request->swift,
                'currency' => $request->currency,
                'favourite' => $request->favourite,
                'dt_start' => now(),
                'company_id' => $companyId,
                'complete_bank_account' => $request->complete_bank_account,
            ]);

            // Obtener la nueva cuenta bancaria creada
            $account = DB::table('bank_account')
                ->select('iban', 'entity', 'office', 'control_digit', 'account_number', 'bank_name', 'country', 'swift', 'currency', 'id', 'company_id', 'favourite', 'complete_bank_account')
                ->where('id', $newAccountId)
                ->whereNull('dt_end')
                ->first();

            // Marcar la cuenta bancaria antigua con dt_end
            DB::table('bank_account')
                ->where('id', $bankAccountId)
                ->update([
                    'dt_end' => now(),
                ]);

            DB::commit();
            return response()->json(['message' => 'La cuenta bancaria se ha actualizado correctamente', 'account' => $account], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al actualizar la cuenta bancaria: ' . $e->getMessage()], 500);
        }
    }


    public function store(BankRequest $request)
    {
        DB::beginTransaction();

        try {
        
            // Insertar en la tabla bank_account
            $newAccountId = DB::table('bank_account')->insertGetId([
                'iban' => $request->iban,
                'entity' => $request->entity,
                'office' => $request->office,
                'control_digit' => $request->control_digit,
                'account_number' => $request->account_number,
                'bank_name' => $request->bank_name,
                'country' => $request->country,
                'swift' => $request->swift,
                'currency' => $request->currency,
                'favourite' => $request->favourite,
                'dt_start' => now(),
                'company_id' => $request->companyID,
                'complete_bank_account' => $request->complete_bank_account,
            ]);
            

            if ($request->favourite === true) {
                $this->makeFavourite($newAccountId);
            }

            $account = DB::table('bank_account')
                ->select('iban', 'entity', 'office', 'control_digit', 'account_number', 'bank_name', 'country', 'swift', 'currency', 'id', 'company_id', 'favourite','complete_bank_account')
                ->where('id', $newAccountId)
                ->whereNull('dt_end')
                ->first();

            DB::commit();

            return response()->json(['message' => 'La cuenta bancaria se ha creado correctamente', 'account' => $account]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la cuenta bancaria: ' . $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $companyResult = DB::table('bank_account')
                ->select('company_id')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first();

            if ($companyResult) {
                DB::rollback();
                $companyId = $companyResult->company_id;
            }
            
            $activeAccountsCount = DB::table('bank_account')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activeAccountsCount <= 1) {
                DB::rollback();
                return response()->json(['message' => 'Debe tener al menos una cuenta bancaria activa para poder eliminar.'], 400);
            }

            $companyFav = DB::table('bank_account')
                ->select('favourite')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first();
            
            if ($companyFav) {
                $companyAccount = $companyFav->favourite;
            }

            if ($companyAccount) {
                DB::rollback();
                return response()->json(['message' => 'No puedes eliminar una cuenta bancaria marcada como favorita.'], 400);
            }

            DB::table('bank_account')
                ->where('id', $id)
                ->update([
                    'dt_end' => now(),
                ]);

            DB::commit();
            return response()->json(['message' => 'Se ha eliminado la cuenta bancaria con éxito']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al eliminar la cuenta bancaria: '.$e->getMessage()], 500);
        }
    }


    public function makeFavourite($id) {
        try {
            $this->favouriteTrue($id);
            
            return response()->json(['message' => 'Hacer favorita'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar cuenta bancaria favorita: ' . $e->getMessage()], 500);
        }
    }
    
    public function favouriteTrue($id){
        $companyResult = DB::table('bank_account')
            ->select('company_id')
            ->where('id', $id)
            ->whereNull('dt_end')
            ->first();
    
        if ($companyResult) {
            $companyId = $companyResult->company_id;
        }
    
        DB::table('bank_account')
            ->where('company_id', $companyId)
            ->update([
                'favourite' => 0,
            ]);
    
        DB::table('bank_account')
            ->where('id', $id)
            ->update([
                'favourite' => 1,
            ]);
    }
    





}
