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
        $this->middleware(['can:update company'])->only('edit');
        $this->middleware(['can:update company'])->only('makeFavorite');
        $this->middleware(['can:update company'])->only('favoriteTrue');
        $this->middleware(['can:update company'])->only('update');
        $this->middleware(['can:delete company'])->only('destroy');
    }
    

    public static function index($companyId)
    {
        try {

            
            $addresses = DB::table('companies_addresses')
            ->select('companies_addresses.id','companies_address_register.address', 'companies_country_register.country','companies_province_register.province',
                'companies_town_register.town', 'companies_post_code_register.postCode', 'companies_addresses.favorite')
            ->leftJoin('companies_address_register', 'companies_address_register.id', '=', 'companies_addresses.company_address_register_id')
            ->leftJoin('companies_country_register', 'companies_country_register.id', '=', 'companies_addresses.company_country_register_id')
            ->leftJoin('companies_province_register', 'companies_province_register.id', '=', 'companies_addresses.company_province_register_id')
            ->leftJoin('companies_town_register', 'companies_town_register.id', '=', 'companies_addresses.company_town_register_id')
            ->leftJoin('companies_post_code_register', 'companies_post_code_register.id', '=', 'companies_addresses.company_post_code_register_id')
            ->where('companies_addresses.company_detail_id', $companyId)
            ->where('companies_addresses.dt_end', null)
            ->orderByDesc('companies_addresses.favorite')
            ->get();

            return response()->json(['message' => 'all addresses', 'addresses' => $addresses], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index addresses: ', 'addresses' => $addresses  . $e->getMessage()], 500);
        }
    }

    public function store(AddressRequest $request)
    {
        DB::beginTransaction();

        
        try {
            
            // Insertar en la tabla companies
            $newAddressId = DB::table('companies_address_register')->insertGetId([
                'address' => $request->address,
                'dt_start' => now(),
            ]);
            $newCountryId = DB::table('companies_country_register')->insertGetId([
                'country' => $request->country,
                'dt_start' => now(),
            ]);

            
            $newTownId = DB::table('companies_town_register')->insertGetId([
                'town' => $request->town,
                'dt_start' => now(),
            ]);

            
            $newPostCodeId = DB::table('companies_post_code_register')->insertGetId([
                'postCode' => $request->postCode,
                'dt_start' => now(),
            ]);
            $newProvinceId = DB::table('companies_province_register')->insertGetId([
                'province' => $request->province,
                'dt_start' => now(),
            ]);

            

            $newCompanyAddressesId = DB::table('companies_addresses')->insertGetId([
                'company_post_code_register_id' => $newPostCodeId,
                'company_address_register_id' => $newAddressId,
                'company_town_register_id' => $newTownId,
                'company_country_register_id' => $newCountryId,
                'company_province_register_id' => $newProvinceId,
                'dt_start' => now(),
                'favorite' => $request->favorite,
                'company_detail_id' => $request->companyID,
            ]);

            if ($request->favorite === true) {
                $this->favoriteTrue($newCompanyAddressesId);
            }


            $addresses = DB::table('companies_addresses')
            ->select('companies_addresses.id','companies_address_register.address', 'companies_country_register.country','companies_province_register.province',
                'companies_town_register.town', 'companies_post_code_register.postCode', 'companies_addresses.favorite')
            ->leftJoin('companies_address_register', 'companies_address_register.id', '=', 'companies_addresses.company_address_register_id')
            ->leftJoin('companies_country_register', 'companies_country_register.id', '=', 'companies_addresses.company_country_register_id')
            ->leftJoin('companies_province_register', 'companies_province_register.id', '=', 'companies_addresses.company_province_register_id')
            ->leftJoin('companies_town_register', 'companies_town_register.id', '=', 'companies_addresses.company_town_register_id')
            ->leftJoin('companies_post_code_register', 'companies_post_code_register.id', '=', 'companies_addresses.company_post_code_register_id')
            ->where('companies_addresses.company_detail_id', $request->companyID)
            ->where('companies_addresses.dt_end', null)
            ->orderByDesc('companies_addresses.favorite')
            ->get();

            

            DB::commit();


            return response()->json(['message' => 'El addresses se ha creado correctamente', 'addresses' => $addresses]);

            
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al guardar la dirección: ', $e->getMessage()], 500);
        }

    }

    public function update ($addressId, AddressRequest $request)
    {
        DB::beginTransaction();
        try {
            
             // Insertar en la tabla companies
            $newAddressId = DB::table('companies_address_register')->insertGetId([
                'address' => $request->address,
                'dt_start' => now(),
            ]);

            $newCountryId = DB::table('companies_country_register')->insertGetId([
                'country' => $request->country,
                'dt_start' => now(),
            ]);

            
            $newTownId = DB::table('companies_town_register')->insertGetId([
                'town' => $request->town,
                'dt_start' => now(),
            ]);

            
            $newPostCodeId = DB::table('companies_post_code_register')->insertGetId([
                'postCode' => $request->postCode,
                'dt_start' => now(),
            ]);
            $newProvinceId = DB::table('companies_province_register')->insertGetId([
                'province' => $request->province,
                'dt_start' => now(),
            ]);

            $companyResult = DB::table('companies_addresses')
            ->select('company_detail_id')
            ->where('id', $addressId)
            ->first(); 

            if ($companyResult) {
                $companyId = $companyResult->company_detail_id;
            }

            $newCompanyAddressesId = DB::table('companies_addresses')->insertGetId([
                'company_post_code_register_id' => $newPostCodeId,
                'company_address_register_id' => $newAddressId,
                'company_town_register_id' => $newTownId,
                'company_country_register_id' => $newCountryId,
                'company_province_register_id' => $newProvinceId,
                'dt_start' => now(),
                'favorite' => $request->favorite,
                'company_detail_id' => $companyId,
            ]);

            if ($request->favorite === true) {
                $this->favoriteTrue($newCompanyAddressesId);
            }

            $address = DB::table('companies_addresses')
            ->select('companies_addresses.id','companies_address_register.address', 'companies_country_register.country','companies_province_register.province',
                'companies_town_register.town', 'companies_post_code_register.postCode', 'companies_addresses.favorite')
            ->leftJoin('companies_address_register', 'companies_address_register.id', '=', 'companies_addresses.company_address_register_id')
            ->leftJoin('companies_country_register', 'companies_country_register.id', '=', 'companies_addresses.company_country_register_id')
            ->leftJoin('companies_province_register', 'companies_province_register.id', '=', 'companies_addresses.company_province_register_id')
            ->leftJoin('companies_town_register', 'companies_town_register.id', '=', 'companies_addresses.company_town_register_id')
            ->leftJoin('companies_post_code_register', 'companies_post_code_register.id', '=', 'companies_addresses.company_post_code_register_id')
            ->where('companies_addresses.id', $newCompanyAddressesId)
            ->where('companies_addresses.dt_end', null)
            ->orderByDesc('companies_addresses.favorite')
            ->get();

            DB::table('companies_addresses')
            ->where('id', $addressId)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'update','email' => $address, 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error update '. $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $companyResult = DB::table('companies_addresses')
                ->select('company_detail_id')
                ->where('id', $id)
                ->whereNull('dt_end')
                ->first(); 

            if ($companyResult) {
                $companyId = $companyResult->company_detail_id;
            }
            
            $activeAddressesCount = DB::table('companies_addresses')
                ->where('company_detail_id', $companyId)
                ->whereNull('dt_end')
                ->count();

            if ($activeAddressesCount <=1) {
                return response()->json(['message' => 'Debes tener al menos una dirección activo para poder eliminar.'], 400);
            }

            $companyFav = DB::table('companies_addresses')
            ->select('favorite')
            ->where('id', $id)
            ->whereNull('dt_end')
            ->first();
            
            if ($companyFav) {
                $companyEmail = $companyFav->favorite;
            }

            if ($companyEmail) {
                return response()->json(['message' => 'No puedes eliminar una dirección marcada como favorito.'], 400);
            }

            DB::table('companies_addresses')
            ->where('id', $id)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Se ha eliminado la dirección con éxito']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al eliminar la dirección: '.$e->getMessage()], 500);
        }
    }

    public function makeFavorite($id) {
        try {
            
            $this->favoriteTrue($id);
            
            return response()->json(['message' => 'make favorite',], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al seleccionar teléfono favorito '.$e->getMessage()], 500);
        }
    }

    public function favoriteTrue($id){
        $companyResult = DB::table('companies_addresses')
        ->select('company_detail_id')
        ->where('companies_addresses.id', $id)
        ->whereNull('dt_end')
        ->first(); 

        if ($companyResult) {
            $companyId = $companyResult->company_detail_id;
        }

        DB::table('companies_addresses')
        ->where('company_detail_id', $companyId)
        ->update([
            'favorite' => 0,
        ]);

        DB::table('companies_addresses')
        ->where('companies_addresses.id', $id)
        ->update([
            'favorite' => 1,
        ]);
    }

}
