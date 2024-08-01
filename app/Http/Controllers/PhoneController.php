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
        $this->middleware(['can:read phone'])->only('index', 'show');
        $this->middleware(['can:create phone'])->only('create', 'store');
        $this->middleware(['can:update phone'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete phone'])->only('destroy');
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
            return response()->json(['message' => 'emails', 'type'=>'success', 'result' => $phones]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }
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


            DB::table('phones')->insert([
                'phone' => $request->phone,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'isMobile' => 1,
                'company_id' => $companyId,
            ]);

            DB::table('phones')
            ->where('id', $phoneId)
            ->update([
                'dt_end' => now(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Successfully updated.', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when updating.', 'type' => 'error']);
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
                DB::rollback();
                return response()->json(['message' => 'There must be at least one active to be able to delete.','type' => 'warning']);
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
                DB::rollback();
                return response()->json(['message' => 'You cannot delete if it is marked as a favorite.','type' => 'warning']);
                
            }

            DB::table('phones')
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
