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


            
            $addresses = DB::table('companies_addresses')
            ->select(
                'companies_addresses.id',
                'companies_address_register.address',
                'companies_country_register.country',
                'companies_province_register.province',
                'companies_town_register.town',
                'companies_post_code_register.postCode',
                'companies_address_register.favourite'
            )
            ->leftJoin('companies_address_register', 'companies_addresses.id', '=', 'companies_address_register.company_addresses_id')
            ->leftJoin('companies_country_register', 'companies_addresses.id', '=', 'companies_country_register.company_addresses_id')
            ->leftJoin('companies_province_register', 'companies_addresses.id', '=', 'companies_province_register.company_addresses_id')
            ->leftJoin('companies_town_register', 'companies_addresses.id', '=', 'companies_town_register.company_addresses_id')
            ->leftJoin('companies_post_code_register', 'companies_addresses.id', '=', 'companies_post_code_register.company_addresses_id')
            ->where('companies_addresses.company_detail_id', $companyId)
            ->orderByDesc('companies_address_register.favourite')
            ->whereNull('companies_addresses.dt_end')
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

            $companyAddressId = DB::table('companies_addresses')->insertGetId([
                'dt_start' => now(),
                'company_detail_id' => $request->companyID,
            ]);
            
            DB::table('companies_address_register')->insert([
                'favourite' => $request->favourite,
                'address' => $request->address,
                'dt_start' => now(),
                'company_addresses_id' => $companyAddressId,
            
            ]);

            DB::table('companies_town_register')->insert([
                'favourite' => $request->favourite,
                'town' => $request->town,
                'dt_start' => now(),
                'company_addresses_id' => $companyAddressId,
            ]);

            DB::table('companies_province_register')->insert([
                'favourite' => $request->favourite,
                'province' => $request->province,
                'dt_start' => now(),
                'company_addresses_id' => $companyAddressId,
            ]);

            DB::table('companies_post_code_register')->insert([
                'favourite' => $request->favourite,
                'postCode' => $request->postCode,
                'dt_start' => now(),
                'company_addresses_id' => $companyAddressId,
            ]);

            DB::table('companies_country_register')->insert([
                'favourite' => $request->favourite,
                'country' => $request->country,
                'dt_start' => now(),
                'company_addresses_id' => $companyAddressId,
            ]);

            if ($request->favourite === true) {
                $this->favouriteTrue($companyAddressId);
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

            DB::table('companies_addresses')
            ->where('id', $companyAddressId)
            ->update(['dt_end' => now()]);

            $newCompanyAddressesId = DB::table('companies_addresses')->insertGetId([
                'dt_start' => now(),
                'company_detail_id' => $request->companyID,
            ]);

             // Insertar en la tabla companies
            DB::table('companies_address_register')->insert([
                'address' => $request->address,
                'company_addresses_id' => $newCompanyAddressesId,
                'dt_start' => now(),
            ]);

            DB::table('companies_country_register')->insert([
                'country' => $request->country,
                'company_addresses_id' => $newCompanyAddressesId,
                'dt_start' => now(),
            ]);

            
            DB::table('companies_town_register')->insert([
                'town' => $request->town,
                'company_addresses_id' => $newCompanyAddressesId,
                'dt_start' => now(),
            ]);

            
            DB::table('companies_post_code_register')->insert([
                'postCode' => $request->postCode,
                'company_addresses_id' => $newCompanyAddressesId,
                'dt_start' => now(),
            ]);

            DB::table('companies_province_register')->insert([
                'province' => $request->province,
                'company_addresses_id' => $newCompanyAddressesId,
                'dt_start' => now(),
            ]);

            if ($request->favourite === true) {
                $this->favouriteTrue($newCompanyAddressesId);
            }

            $this->dateEnd($companyAddressId);

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
            DB::table('companies_addresses')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);
 
            $companyResult = DB::table('companies_addresses')
            ->select([
                'company_detail_id',
            ])
            ->where('id', $id)
            ->first();

            $activeAddressesCount = DB::table('companies_addresses')
            ->where('company_detail_id', $companyResult->company_detail_id)
            ->whereNull('dt_end')
            ->count();

            if ($activeAddressesCount == 0) {
                DB::rollback();
                return response()->json(['message' => 'Debes tener al menos una dirección activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('companies_address_register')
            ->select('favourite')
            ->where('company_addresses_id', $id)
            ->first();
            

            if ($companyFav->favourite) {
                DB::rollback();
                return response()->json(['message' => 'No puedes eliminar una dirección marcada como favorito.'], 400);
            }
            
            $this->dateEnd($id);
            
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
            return response()->json(['message' => 'Error al seleccionar teléfono favorito '.$e->getMessage()], 500);
        }
    }

    public function favouriteTrue($newFavoriteCompanyAddressesId){

        $companyDetail = DB::table('companies_addresses')
        ->select([
            'company_detail_id',
        ])
        ->where('id', $newFavoriteCompanyAddressesId)
        ->first();
        
        // Obtener todas las IDs de direcciones de la empresa
        $companyAddressesIds = DB::table('companies_addresses')
            ->select('id')
            ->where('company_detail_id', $companyDetail->company_detail_id)
            ->get();

        // Tablas a actualizar
        $tablesToUpdate = [
            'companies_address_register',
            'companies_province_register',
            'companies_country_register',
            'companies_town_register',
            'companies_post_code_register'
        ];

        // Desmarcar todas las direcciones como favoritas
        foreach ($companyAddressesIds as $addressId) {
            foreach ($tablesToUpdate as $table) {
                DB::table($table)
                    ->where('company_addresses_id', $addressId->id)
                    ->update(['favourite' => false]);
            }
        }

        // Marcar la nueva dirección como favorita en todas las tablas
        foreach ($tablesToUpdate as $table) {
            DB::table($table)
                ->where('company_addresses_id', $newFavoriteCompanyAddressesId)
                ->update(['favourite' => true]);
        }
        
    }

    public function dateEnd($oldCompanyAddressesId){

        // Tablas a actualizar
        $tablesToUpdate = [
            'companies_address_register',
            'companies_province_register',
            'companies_country_register',
            'companies_town_register',
            'companies_post_code_register'
        ];

        // Desmarcar todas las direcciones como favoritas
        foreach ($tablesToUpdate as $table) {
            DB::table($table)
                ->where('company_addresses_id', $oldCompanyAddressesId)
                ->update(['dt_end' => now()]);
        }
        
    }

}
