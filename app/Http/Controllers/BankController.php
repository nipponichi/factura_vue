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
        $this->middleware(['can:read bank account'])->only('index', 'show');
        $this->middleware(['can:create bank account'])->only('create', 'store');
        $this->middleware(['can:update bank account'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete bank account'])->only('destroy');
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
        
            return response()->json(['message' => 'Bank accounts', 'type'=>'success', 'result' => $accounts]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }
        
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
            DB::table('bank_account')->insert([
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
            // Marcar la cuenta bancaria antigua con dt_end
            DB::table('bank_account')
                ->where('id', $bankAccountId)
                ->update([
                    'favourite' => 0,
                    'dt_end' => now(),
                ]);

            DB::commit();
            return response()->json(['message' => 'Successfully updated.', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when updating.', 'type' => 'error']);
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


            DB::commit();

            return response()->json(['message' => 'It has been created correctly.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when creating.','type' => 'error']);
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
                $companyId = $companyResult->company_id;
            }
            
            $activeAccountsCount = DB::table('bank_account')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activeAccountsCount <= 1) {
                DB::rollback();
                return response()->json(['message' => 'There must be at least one active to be able to delete.','type' => 'warning']);
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
                return response()->json(['message' => 'You cannot delete if it is marked as a favorite.','type' => 'warning']);
            }

            DB::table('bank_account')
                ->where('id', $id)
                ->update([
                    'dt_end' => now(),
                ]);

            DB::commit();
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error deleting.','type' => 'error']);
        }
    }


    public function makeFavourite($id) {
        try {
            
            $this->favouriteTrue($id);
            
            return response()->json(['message' => 'It has been marked as a favorite.','type' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error when selecting as favorite.','type' => 'error']);
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
