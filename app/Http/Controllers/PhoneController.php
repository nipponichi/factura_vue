<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhoneRequest;
use Illuminate\Support\Facades\DB;
use Exception;

class PhoneController extends Controller
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
            $phones = DB::table('phones')
                ->select('id','phone', 'favourite', 'isMobile')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->orderByDesc('favourite')
                ->get();
            return response()->json(['message' => 'phones', 'phones' => $phones], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index phones: ' . $e->getMessage()], 500);
        }
    }

    // Not needed
    public function edit()
    {
        //
    }

    public function update ($phoneId, PhoneRequest $request)
    {
        DB::beginTransaction();
        try {
            
            $companyResult = DB::table('phones')
            ->select('company_id')
            ->where('id', $phoneId)
            ->first();

            if ($companyResult) {
                $companyId = $companyResult->company_id;
            }


            $newPhoneId = DB::table('phones')->insertGetId([
                'phone' => $request->phone,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'isMobile' => 1,
                'company_id' => $companyId,
            ]);

            $phone = DB::table('phones')
            ->select('phone','id','company_id', 'favourite')
            ->where('id', $newPhoneId)
            ->whereNull('dt_end')
            ->first();

            DB::table('phones')
            ->where('id', $phoneId)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'update','phone' => $phone, 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error update '. $e->getMessage()], 500);
        }
    }

    public function store(PhoneRequest $request)
    {
        DB::beginTransaction();

        try {

            
            // Insertar en la tabla companies
            $newPhoneId = DB::table('phones')->insertGetId([
                'phone' => $request->phone,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'company_id' => $request->companyID,
            ]);

            if ($request->favourite === true) {
                $this->makeFavourite($newPhoneId);
            }

            $phone = DB::table('phones')
            ->select('phone','isMobile','id','company_id', 'favourite')
            ->where('id', $newPhoneId)
            ->whereNull('dt_end')
            ->first();
        

            DB::commit();

            return response()->json(['message' => 'El telefono se ha creado correctamente', 'phone' => $phone]);
            // Confirma la transacción si todas las operaciones son exitosas
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear el teléfono: ', $e->getMessage()], 500);
        }

    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $companyResult = DB::table('phones')
                ->select('company_id')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first();

            if ($companyResult) {
                $companyId = $companyResult->company_id;
            }
            
            $activePhonesCount = DB::table('phones')
                ->where('company_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activePhonesCount <=1) {
                return response()->json(['message' => 'Debes tener al menos un número de teléfono activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('phones')
            ->select('favourite')
            ->where('id', $id)
            ->whereNull('dt_end')
            ->first();
            
            if ($companyFav) {
                $companyPhone = $companyFav->favourite;
            }

            if ($companyPhone) {
                return response()->json(['message' => 'No puedes eliminar un teléfono marcado como favorito.'], 400);
            }

            DB::table('phones')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Se ha eliminado el teléfono con éxito']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al eliminar el teléfono: '.$e->getMessage()], 500);
        }
    }

    public function makeFavourite($id) {
        try {
            
            $this->favouriteTrue($id);
            
            return response()->json(['message' => 'make favourite',], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar teléfono favorito '.$e->getMessage()], 500);
        }
    }

    public function favouriteTrue($id){
        $companyResult = DB::table('phones')
        ->select('company_id')
        ->where('id', $id)
        ->whereNull('dt_end')
        ->first();

        if ($companyResult) {
            $companyId = $companyResult->company_id;
        }

        DB::table('phones')
        ->where('company_id', $companyId)
        ->update([
            'favourite' => 0,
        ]);

        DB::table('phones')
        ->where('id', $id)
        ->update([
            'favourite' => 1,
        ]);
    }





}
