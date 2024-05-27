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
        $this->middleware(['can:update company'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete company'])->only('destroy');
    }

    public static function index($companyId)
    {
        try {
            $emails = DB::table('emails')
                ->select('id','email', 'favourite')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->orderByDesc('favourite')
                ->get();


            return response()->json(['message' => 'emails', 'emails' => $emails], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
        }
    }

    // Not needed
    public function edit()
    {
     //
    }

    public function update ($emailId, emailRequest $request)
    {
        DB::beginTransaction();
        try {
            
            $companyResult = DB::table('emails')
            ->select('company_id')
            ->where('id', $emailId)
            ->first();

            if ($companyResult) {
                $companyId = $companyResult->company_id;
            }


            $newEmailId = DB::table('emails')->insertGetId([
                'email' => $request->email,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'company_id' => $companyId,
            ]);

            $email = DB::table('emails')
            ->select('id','company_id', 'favourite')
            ->where('id', $newEmailId)
            ->whereNull('dt_end')
            ->first();

            DB::table('emails')
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
            $newEmailId = DB::table('emails')->insertGetId([
                'email' => $request->email,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'company_id' => $request->companyID,
            ]);

            if ($request->favourite === true) {
                $this->favouriteTrue($newEmailId);
            }

            $email = DB::table('emails')
            ->select('email','id','company_id', 'favourite')
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
            $companyResult = DB::table('emails')
                ->select('company_id')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first();

            if ($companyResult) {
                $companyId = $companyResult->company_id;
            }
            
            $activeEmailsCount = DB::table('emails')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activeEmailsCount <=1) {
                return response()->json(['message' => 'Debes tener al menos un email activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('emails')
            ->select('favourite')
            ->where('id', $id)
            ->whereNull('dt_end')
            ->first();
            
            if ($companyFav) {
                $companyEmail = $companyFav->favourite;
            }

            if ($companyEmail) {
                return response()->json(['message' => 'No puedes eliminar un email marcado como favorito.'], 400);
            }

            DB::table('emails')
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

    public function makeFavourite($id) {
        try {
            
            $this->favouriteTrue($id);
            
            return response()->json(['message' => 'make favourite',], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar email favorito '.$e->getMessage()], 500);
        }
    }

    public function favouriteTrue($id){
        $companyResult = DB::table('emails')
        ->select('company_id')
        ->where('id', $id)
        ->whereNull('dt_end')
        ->first();

        if ($companyResult) {
            $companyId = $companyResult->company_id;
        }

        DB::table('emails')
        ->where('company_id', $companyId)
        ->update([
            'favourite' => 0,
        ]);

        DB::table('emails')
        ->where('id', $id)
        ->update([
            'favourite' => 1,
        ]);
    }





}
