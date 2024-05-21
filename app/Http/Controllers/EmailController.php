<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmailRequest;
use Illuminate\Support\Facades\DB;
use Exception;

class EmailController extends Controller
{
    public function __construct()
    {
        $this->middleware(['can:read company'])->only('index');
        $this->middleware(['can:create company'])->only('create');
        $this->middleware(['can:create company'])->only('store');
        $this->middleware(['can:read company'])->only('show');
        $this->middleware(['can:update company'])->only('edit');
        $this->middleware(['can:update company'])->only('makeFavorite');
        $this->middleware(['can:update company'])->only('favoriteTrue');
        $this->middleware(['can:update company'])->only('update');
        $this->middleware(['can:delete company'])->only('destroy');
    }

    public static function index($companyId)
    {
        try {
            $emails = DB::table('companies_email_register')
                ->select('id','email', 'favorite')
                ->where('company_detail_id', $companyId)
                ->whereNull('dt_end')
                ->orderByDesc('favorite') 
                ->get();


            return response()->json(['message' => 'emails', 'emails' => $emails], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
        }
    }


    public function edit()
    {

    }

    public function update ($emailId, emailRequest $request)
    {
        DB::beginTransaction();
        try {
            
            $companyResult = DB::table('companies_email_register')
            ->select('company_detail_id')
            ->where('id', $emailId)
            ->first(); 

            if ($companyResult) {
                $companyId = $companyResult->company_detail_id;
            }


            $newEmailId = DB::table('companies_email_register')->insertGetId([
                'email' => $request->email,
                'dt_start' => now(),
                'favorite' => $request->favorite,
                'company_detail_id' => $companyId,
            ]);

            $email = DB::table('companies_email_register')
            ->select('id','company_detail_id', 'favorite')
            ->where('id', $newEmailId)
            ->whereNull('dt_end')
            ->first(); 

            DB::table('companies_email_register')
            ->where('id', $emailId)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'update','email' => $email, 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error update '. $e->getMessage()], 500);
        }
    }

    public function store(EmailRequest $request)
    {
        DB::beginTransaction();

        try {
            
            // Insertar en la tabla companies
            $newEmailId = DB::table('companies_email_register')->insertGetId([
                'email' => $request->email,
                'dt_start' => now(),
                'favorite' => $request->favorite,
                'company_detail_id' => $request->companyID,
            ]);

            if ($request->favorite === true) {
                $this->favoriteTrue($newEmailId);
            }

            $email = DB::table('companies_email_register')
            ->select('email','id','company_detail_id', 'favorite')
            ->where('id', $newEmailId)
            ->whereNull('dt_end')
            ->first(); 
        

            DB::commit();

            return response()->json(['message' => 'El email se ha creado correctamente', 'email' => $email]);
            // Confirma la transacción si todas las operaciones son exitosas
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el email: ', $e->getMessage()], 500);
        }

    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $companyResult = DB::table('companies_email_register')
                ->select('company_detail_id')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first(); 

            if ($companyResult) {
                $companyId = $companyResult->company_detail_id;
            }
            
            $activeEmailsCount = DB::table('companies_email_register')
                ->where('company_detail_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activeEmailsCount <=1) {
                return response()->json(['message' => 'Debes tener al menos un email activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('companies_email_register')
            ->select('favorite')
            ->where('id', $id)
            ->whereNull('dt_end')
            ->first();
            
            if ($companyFav) {
                $companyEmail = $companyFav->favorite;
            }

            if ($companyEmail) {
                return response()->json(['message' => 'No puedes eliminar un email marcado como favorito.'], 400);
            }

            DB::table('companies_email_register')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Se ha eliminado el email con éxito']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al eliminar el email: '.$e->getMessage()], 500);
        }
    }

    public function makeFavorite($id) {
        try {
            
            $this->favoriteTrue($id);
            
            return response()->json(['message' => 'make favorite',], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar email favorito '.$e->getMessage()], 500);
        }
    }

    public function favoriteTrue($id){
        $companyResult = DB::table('companies_email_register')
        ->select('company_detail_id')
        ->where('id', $id)
        ->whereNull('dt_end')
        ->first(); 

        if ($companyResult) {
            $companyId = $companyResult->company_detail_id;
        }

        DB::table('companies_email_register')
        ->where('company_detail_id', $companyId)
        ->update([
            'favorite' => 0,
        ]);

        DB::table('companies_email_register')
        ->where('id', $id)
        ->update([
            'favorite' => 1,
        ]);
    }





}
