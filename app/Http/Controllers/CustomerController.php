<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CustomerRequest;
use App\Http\Requests\CustomerHeadRequest;
use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
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
                $query->select('company_id_customer')
                    ->from('companies_customers')
                    ->where('company_id_company', $companyId)
                    ->where('dt_end', null);
            })
            ->get();


            return response()->json(['message' => 'Compañía no encontrada ahora ', 'customers' => $companies]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error index companies: ' . $e->getMessage()], 500);
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
    public function store(CustomerRequest $request)
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


            DB::table('companies_customers')->insert([
                'company_id_company' => $request->companyID,
                'company_id_customer' => $companyId,
                'dt_start' => now(),
                'isConsulting' => false,
            ]);


            DB::commit();

            return response()->json(['message' => 'La compañía se ha creado correctamente', 'companyId' => $companyId]);
            // Confirma la transacción si todas las operaciones son exitosas
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error al crear la compañía: ', $e->getMessage()], 500);
        }

    }


    /**
     * Display the specified resource.
     */
    public function show($companyId, $customerId)
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


            // Verificar si el usuario es el propietario de la empresa o tiene el rol de administrador
            if ($userId != $currentUserId->user_id && !$user->hasRole('admin')) {
                return Redirect::route('companies.index')->with('error', 'No se encontró el cliente');
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

            ->where('companies.id', $customerId)
            ->where('addresses.favourite', 1)
            ->where('phones.favourite', 1)
            ->where('emails.favourite', 1)
            ->whereIn('companies.id', function ($query) use ($companyId) {
                $query->select('company_id_customer')
                    ->from('companies_customers')
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
                
            return response()->json(['message' => 'Cliente no encontrada ', $e->getMessage()], 500);
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
    public function update(CustomerHeadRequest $request, $companyId)
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
        try {
    
            DB::table('companies_customers')
                ->where('company_id_customer', $id)
                ->update([
                    'dt_end' => now(),
                ]);

    
            return response()->json(['message' => 'Se ha desactivado la compañía con éxito: ' . $id]);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al desactivar la compañía: ' . $id . $e->getMessage()], 500);
        }
    }
}
