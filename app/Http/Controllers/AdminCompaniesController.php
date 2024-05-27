<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Requests\CompanyHeadRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Company;
use Exception;


class AdminCompaniesController extends Controller
{

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!auth()->user()->hasRole('admin')) {
                abort(403, 'No tienes permiso para acceder a esta página.');
            }
            
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     */
    public static function index()
    {
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
        ->get();

        return Inertia::render('Admin/CompaniesAdmin', ['companies' => $companies]);
    
    }

    public function reload()
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
            ->get();

            
            return response()->json(['message' => 'La compañía se ha creado correctamente', 'companies' => $companies]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index emails: ' . $e->getMessage()], 500);
        }
        
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        DB::beginTransaction();
        try {

            
            $companyId = DB::table('companies')->insertGetId([
                'dt_start' => now(),
            ]);

            DB::table('companies_users')->insert ([
                'user_id' => $request->user_id,
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

            DB::commit();

            return response()->json(['message' => 'La compañía se ha creado correctamente']);
        } catch (Exception $e) {
            
            DB::rollback();
            return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
        try {

            // Verificar si el usuario autenticado es propietario de la empresa
            $company = Company::where('id', $id)->get();


            if (!$company) {
                return response()->json(['message' => 'La empresa no ha sido econtrada']);
            }
            

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
                'addresses.country'
            )
            ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
            ->leftJoin('users', 'users.id', '=', 'companies_users.user_id')
            ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
            ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
            ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
            ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
            ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')
            ->where('companies.id', $id)
            ->where('addresses.favourite', 1)
            ->where('phones.favourite', 1)
            ->where('emails.favourite', 1)
            ->whereNull('companies_users.dt_end')
            ->whereNull('companies_names.dt_end')
            ->whereNull('companies_tax_numbers.dt_end')
            ->whereNull('addresses.dt_end')
            ->whereNull('phones.dt_end')
            ->whereNull('emails.dt_end')
            ->first();
            
            
            return Inertia::render('Companies/Show', ['company' => $companies]);
            
        }catch (Exception $e) {
                
            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
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
    public function update(CompanyHeadRequest $request, string $companyId)
    {
        DB::beginTransaction();
        try {

            $oldCompanyUser = DB::table('companies_users')
            ->select([
                'user_id',
            ])
            ->where('company_id',$companyId)
            ->first();
        
            if ($oldCompanyUser->user_id != $request->user_id) {
                
                DB::table('companies_users')
                ->where ('company_id', $companyId)
                ->update ([
                    'dt_end' => now(),
                ]);

                DB::table('companies_users')->insert ([
                    'user_id' => $request->user_id,
                    'company_id' => $companyId,
                    'dt_start' => now(),
                ]);

            }


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
            
            return response()->json(['message' => 'La compañia se ha modificado correctamente.'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al editar la compañía: ' . $e->getMessage()], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        // Actualizar en la tabla companies
        DB::table('companies')
        ->where('id', $id)
        ->update([
            'dt_end' => now()
        ]);
        // Actualizar en la tabla companies_users
        DB::table('companies_users')
        ->where('company_id', $id)
        ->update([
            'dt_end' => now()
        ]);

        // Actualizar en la tabla companies_tax_numbers
        DB::table('companies_tax_numbers')
        ->where('company_id', $id)
        ->update([
            'dt_end' => now()
        ]);

        // Actualizar en la tabla companies_names
        DB::table('companies_names')
        ->where('company_id', $id)
        ->update([
            'dt_end' => now()]);

        // Actualizar en la tabla emails
        DB::table('emails')
        ->where('company_id', $id)
        ->update([
            'favourite' => false,
            'dt_end' => now()
        ]);

        // Actualizar en la tabla phones
        DB::table('phones')
        ->where('company_id', $id)
        ->update([
            'favourite' => false,
            'dt_end' => now()
        ]);

        // Actualizar en la tabla addresses
        DB::table('addresses')
        ->where('company_id', $id)
        ->update([
            'favourite' => false,
            'dt_end' => now()
        ]);

    }

}
