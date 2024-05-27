<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use Illuminate\Support\Facades\DB;
use Exception;

class AddressController extends Controller
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


            
            $addresses = DB::table('addresses')
            ->select(
                'addresses.id',
                'addresses.address',
                'addresses.country',
                'addresses.province',
                'addresses.town',
                'addresses.post_code',
                'addresses.favourite'
            )
            ->where('addresses.company_id', $companyId)
            ->orderByDesc('addresses.favourite')
            ->whereNull('addresses.dt_end')
            ->get();


            return response()->json(['message' => 'all addresses', 'addresses' => $addresses], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index addresses: '  . $e->getMessage()], 500);
        }
    }

    public function store(AddressRequest $request)
    {
        DB::beginTransaction();

        
        try {

            $newAddressId = DB::table('addresses')->insertGetId([
                'address' => $request->address,
                'town' => $request->town,
                'post_code' => $request->post_code,
                'province' => $request->province,
                'country' => $request->country,
                'favourite' => $request->favourite,
                'dt_start' => now(),
                'company_id' => $request->companyID,
            ]);
            

            // REPARAR
            if ($request->favourite === true) {
                $this->favouriteTrue($newAddressId);
            }

            DB::commit();


            return response()->json(['message' => 'El addresses se ha creado correctamente']);

            
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al guardar la dirección: ', $e->getMessage()], 500);
        }

    }

    public function update ($companyAddressId, AddressRequest $request)
    {
        DB::beginTransaction();
        try {

            $companyFav = DB::table('addresses')
            ->select('favourite')
            ->where('id', $companyAddressId)
            ->first();
            

            if ($companyFav->favourite && $request->favourite === false) {
                DB::rollback();
                return response()->json(['message' => 'Necesitas al menos una dirección marcada como favorito.'], 400);
            }

            DB::table('addresses')
            ->where('id',$request->id)
            ->update(['dt_end' => now()]);

            $newAddressId = DB::table('addresses')
            ->insertGetId([
                'company_id' => $request->companyID,
                'address' => $request->address,
                'town' => $request->town,
                'post_code' => $request->post_code,
                'province' => $request->province,
                'country' => $request->country,
                'dt_start' => now()
            ]);

            if ($request->favourite === true) {
                $this->favouriteTrue($newAddressId);
            }

    
            DB::commit();
            return response()->json(['message' => 'La dirección se ha modificado con éxito', 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al modificar la direccion', $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $companyId = DB::table('addresses')
            ->select('company_id')
            ->where('id',$id)
            ->first();


            $activeAddressesCount = DB::table('addresses')
            ->where('company_id', $companyId->company_id)
            ->whereNull('dt_end')
            ->count();

            
            if ($activeAddressesCount <= 1) {
                DB::rollback();
                return response()->json(['message' => 'Debes tener al menos una dirección activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('addresses')
            ->select('favourite')
            ->where('id', $id)
            ->first();
            

            if ($companyFav->favourite) {
                DB::rollback();
                return response()->json(['message' => 'No puedes eliminar una dirección marcada como favorito.'], 400);
            }
            
            DB::table('addresses')
            ->where('id',$id)
            ->update(['dt_end' => now()]);
            
            DB::commit();
            return response()->json(['message' => 'Se ha eliminado la dirección con éxito']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al eliminar la dirección: '.$e->getMessage()], 500);
        }
    }

    public function makeFavourite($companyAddressesId) {
        try {
            
            $this->favouriteTrue($companyAddressesId);
            
            return response()->json(['message' => 'make favourite'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar dirección favorito '.$e->getMessage()], 500);
        }
    }

    public function favouriteTrue($newFavoriteCompanyAddressesId){
        
    
        $companyResult = DB::table('addresses')
        ->select('company_id')
        ->where('id', $newFavoriteCompanyAddressesId)
        ->whereNull('dt_end')
        ->first();
        
        if ($companyResult) {
            $companyId = $companyResult->company_id;
        }
        
        DB::table('addresses')
        ->where('company_id', $companyId)
        ->update([
            'favourite' => false,
        ]);

        DB::table('addresses')
        ->where('id', $newFavoriteCompanyAddressesId)
        ->update([
            'favourite' => true,
        ]);
        
    }


}
