<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhoneRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\Phone;

class PhoneController extends Controller
{
    public function __construct()
    {
        $this->middleware(['can:read company'])->only('index');
        $this->middleware(['can:create company'])->only('create');
        $this->middleware(['can:create company'])->only('store');
        $this->middleware(['can:read company'])->only('show');
        $this->middleware(['can:update company'])->only('edit');
        $this->middleware(['can:update company'])->only('update');
        $this->middleware(['can:delete company'])->only('destroy');
    }

    public static function index(string $companyId)
{
    try {
        $phones = DB::table('companies_phone_register')
            ->select('id','phone', 'favorite', 'isMobile')
            ->where('company_detail_id', $companyId)
            ->whereNull('dt_end')
            ->get();

        return response()->json(['message' => 'phones', 'phones' => $phones], 200);
    } catch (Exception $e) {
        return response()->json(['message' => 'Error index phones: ' . $e->getMessage()], 500);
    }
}

    public function store(PhoneRequest $request)
{
    DB::beginTransaction();

    try {

        // Insertar en la tabla companies
        DB::table('companies_phone_register')->insert([
            'phone' => $request->phone,
            'dt_start' => now(),
            'favorite' => 0,
            'company_detail_id' => $request->companyID,
        ]);
    

        DB::commit();

        return response()->json(['message' => 'El telefono se ha creado correctamente']);
        // Confirma la transacción si todas las operaciones son exitosas
    } catch (Exception $e) {
        DB::rollback();
        return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
    }



}

public function destroy($id)
{
    try {

        DB::table('companies_phone_register')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);


        return response()->json(['message' => 'Se ha eliminado el teléfono con éxito: ' . $id]);
    } catch (Exception $e) {
        return response()->json(['message' => 'Error al eliminar el teléfono: ' . $id . $e->getMessage()], 500);
    }
}


}
