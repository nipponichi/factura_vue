<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProviderRequest;
use App\Http\Requests\ProviderHeadRequest;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProviderController extends Controller
{

    public function __construct()
    {

        $this->middleware(['can:read company'])->only(['index', 'show']);
        $this->middleware(['can:create company'])->only(['create', 'store']);
        $this->middleware(['can:update company'])->only(['edit', 'update']);
        $this->middleware(['can:delete company'])->only('destroy');
    }


    public static function index(string $companyId)
    {
        try {
            $companies = DB::table('companies')
            ->select(
                
                'companies.id',
                'companies.dt_end',
                'companies_tax_numbers.tax_number',
                'companies_names.name',
                'emails.email',
                'phones.phone',
                'addresses.address',
                'addresses.town',
                'addresses.province',
                'addresses.post_code',
                'addresses.country',
                'companies_users.user_id',
                'users.email as user_email'
            )
    
            ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
            ->leftJoin('users', 'users.id', '=', 'companies_users.user_id')
            ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
            ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
            ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
            ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
            ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')
            ->where('addresses.favourite', 1)
            ->where('phones.favourite', 1)
            ->where('emails.favourite', 1)
            ->whereNull('companies_users.dt_end')
            ->whereNull('companies_names.dt_end')
            ->whereNull('companies_tax_numbers.dt_end')
            ->whereNull('addresses.dt_end')
            ->whereNull('phones.dt_end')
            ->whereNull('emails.dt_end')
            ->whereIn('companies.id', function ($query) use ($companyId) {
                $query->select('company_id_provider')
                    ->from('companies_providers')
                    ->where('company_id_company', $companyId)
                    ->where('dt_end', null);
            })
            ->get();
            
            return response()->json(['providers' => $companies]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(ProviderRequest $request)
    {
        DB::beginTransaction();

        try {
            $companyId = DB::table('companies')->insertGetId([
                'dt_start' => now(),
            ]);

            DB::table('companies_users')->insert ([
                'user_id' => 1,
                'company_id' => $companyId,
                'dt_start' => now(),
            ]);


            // Insertar en la tabla companies
            DB::table('companies_tax_numbers')->insert([
                'tax_number' => $request->tax_number,
                'company_id' => $companyId,
                'dt_start' => now(),
            ]);

            DB::table('companies_names')->insert([
                'name' => $request->name,
                'company_id' => $companyId,
                'dt_start' => now(),
            ]);

            // Insertar en la tabla companies_email_register
            DB::table('emails')->insert([
                'email' => $request->email,
                'favourite' =>true,
                'dt_start' => now(),
                'company_id' => $companyId,
            ]);

            // Insertar en la tabla companies_phone_register
            DB::table('phones')->insert([
                'phone' => $request->phone,
                'favourite' =>true,
                'dt_start' => now(),
                'company_id' => $companyId,
            ]);

            DB::table('addresses')->insertGetId([
                'address' => $request->address,
                'town' => $request->town,
                'province' => $request->province,
                'post_code' => $request->post_code,
                'country' => $request->country,
                'favourite' => true,
                'dt_start' => now(),
                'company_id' => $companyId,
            ]);


            DB::table('companies_providers')->insert([
                'company_id_company' => $request->companyID,
                'company_id_provider' => $companyId,
                'dt_start' => now(),
            ]);


            DB::commit();

            return response()->json(['message' => 'It has been created correctly.','type' => 'success', 'companyId' => $companyId]);
            
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error when creating.','type' => 'error']);
        }

    }


    /**
     * Display the specified resource.
     */
    public function show($companyId, $providerId)
    {
        try {
            $userId = Auth::id();
            $user = Auth::user();
            

            $currentUserId = DB::table('companies_users')
            ->select([
                'user_id'
            ])
            ->where('company_id', $companyId)
            ->first();

            $currentProviderId = DB::table('companies_providers')
            ->select([
                'company_id_provider'
            ])
            ->where('company_id_company', $companyId)
            ->where('company_id_provider', $providerId)
            ->whereNull('dt_end')
            ->first();
            
            if ($currentUserId === null || $currentProviderId === null || $userId != $currentUserId->user_id && !$user->hasRole('admin')) {
                return Redirect::route('companies.index')->with('error', 'No se encontró la empresa o no tiene permisos suficientes');
            }
            
            $companies = DB::table('companies')
            ->select(
                'companies.id',
                'companies.dt_end',
                'companies_tax_numbers.tax_number',
                'companies_names.name',
                'emails.email',
                'phones.phone',
                'addresses.country',
                'addresses.town',
                'addresses.post_code',
                'addresses.province',
                'addresses.address'
            )
            
            ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
            ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
            ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
            ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
            ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
            ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')

            ->where('companies.id', $providerId)
            ->where('addresses.favourite', 1)
            ->where('phones.favourite', 1)
            ->where('emails.favourite', 1)
            ->whereIn('companies.id', function ($query) use ($companyId) {
                $query->select('company_id_provider')
                    ->from('companies_providers')
                    ->where('company_id_company', $companyId)
                    ->where('dt_end', null);
            })
            

            ->whereNull('companies_names.dt_end')
            ->whereNull('companies_tax_numbers.dt_end')
            ->whereNull('addresses.dt_end')
            ->whereNull('phones.dt_end')
            ->whereNull('emails.dt_end')
            ->first();
            
            return Inertia::render('Companies/Customers/Show', ['company' => $companies]);
            
        }catch (Exception $e) {
                
            return response()->json(['message' => 'Error loading data' ,'type' => 'error']);
        }

    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProviderHeadRequest $request, $companyId)
    {
        DB::beginTransaction();
        try {


            $oldCompanyName = DB::table('companies_names')
            ->select([
                'name',
            ])
            ->where('company_id',$companyId)
            ->first();

            if ($oldCompanyName->name != $request->name) {
                
                DB::table('companies_names')
                ->where ('company_id', $companyId)
                ->update ([
                    'dt_end' => now(),
                ]);
                
                DB::table('companies_names') ->insert ([
                    'name' => $request->name,
                    'company_id' => $companyId,
                    'dt_start' => now(),
                ]);

            }

            $oldCompanyTaxNumber = DB::table('companies_tax_numbers')
            ->select([
                'tax_number',
            ])
            ->where('company_id',$companyId)
            ->first();

            if ($oldCompanyTaxNumber->tax_number != $request->tax_number) {

                DB::table('companies_tax_numbers')
                ->where ('company_id', $companyId)
                ->update ([
                    'dt_end' => now(),
                ]);
                DB::table('companies_tax_numbers') ->insert ([
                    'tax_number' => $request->tax_number,
                    'company_id' => $companyId,
                    'dt_start' => now(),
                ]);

            }


            DB::commit();
            
            return response()->json(['message' => 'Successfully updated.', 'type' => 'success']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error when updating.', 'type' => 'error']);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
    
            DB::table('companies_providers')
                ->where('company_id_provider', $id)
                ->update([
                    'dt_end' => now(),
                ]);

    
            return response()->json(['message' => 'It has been successfully removed.','type' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error deleting.','type' => 'error']);
        }
    }
}
