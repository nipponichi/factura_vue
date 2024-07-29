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
        $this->middleware(['can:read email'])->only('index', 'show');
        $this->middleware(['can:create email'])->only('create', 'store');
        $this->middleware(['can:update email'])->only('edit', 'makeFavourite', 'favouriteTrue', 'update');
        $this->middleware(['can:delete email'])->only('destroy');
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


            return response()->json(['message' => 'emails', 'emails' => $emails]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }
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


            DB::table('emails')->insert([
                'email' => $request->email,
                'dt_start' => now(),
                'favourite' => $request->favourite,
                'company_id' => $companyId,
            ]);

            DB::table('emails')
            ->where('id', $emailId)
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
                DB::rollback();
                return response()->json(['message' => 'There must be at least one active to be able to delete.','type' => 'warning']);
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
                DB::rollback();
                return response()->json(['message' => 'You cannot delete if it is marked as a favorite.','type' => 'warning']);
            }

            DB::table('emails')
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
