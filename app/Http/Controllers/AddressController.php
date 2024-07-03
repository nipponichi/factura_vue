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
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
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


            return response()->json(['message' => 'It has been created correctly.','type' => 'success']);
            
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when creating.','type' => 'error']);
        }

    }

    public function update ($companyAddressId, AddressRequest $request)
    {
        DB::beginTransaction();
        try {


            DB::table('addresses')
            ->insert([
                'company_id' => $request->companyID,
                'address' => $request->address,
                'town' => $request->town,
                'post_code' => $request->post_code,
                'province' => $request->province,
                'favourite' => $request->favourite,
                'country' => $request->country,
                'dt_start' => now()
            ]);

            DB::table('addresses')
            ->where('id',$request->id)
            ->update(['dt_end' => now()]);


    
            DB::commit();
            return response()->json(['message' => 'Successfully updated.', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when updating.', 'type' => 'error']);
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
                return response()->json(['message' => 'There must be at least one active to be able to delete.','type' => 'warning']);
            }

            $companyFav = DB::table('addresses')
            ->select('favourite')
            ->where('id', $id)
            ->first();
            

            if ($companyFav->favourite) {
                DB::rollback();
                return response()->json(['message' => 'You cannot delete if it is marked as a favorite.','type' => 'warning']);
            }
            
            DB::table('addresses')
            ->where('id',$id)
            ->update(['dt_end' => now()]);
            
            DB::commit();
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error deleting.','type' => 'error']);
        }
    }

    public function makeFavourite($companyAddressesId) {
        try {
            
            $this->favouriteTrue($companyAddressesId);
            
            return response()->json(['message' => 'It has been marked as a favorite.','type' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error when selecting as favorite.','type' => 'error']);
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
