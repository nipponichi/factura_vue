<?php

namespace App\Http\Controllers;


use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class CompanyController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('can:read company')->only(['index', 'show', 'companyInvoice']);
        $this->middleware('can:create company')->only(['create', 'store']);
        $this->middleware('can:update company')->only(['edit', 'update']);
        $this->middleware('can:delete company')->only('destroy');
    }


    public static function index()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        
        $companies = DB::table('companies')
        ->select(
            'companies.id',
            'companies.dt_end',
            'companies_tax_numbers.tax_number',
            'companies_names.name',
            'emails.email',
            'phones.phone',
            'addresses.address',
            'addresses.post_code',
            'addresses.province',
            'addresses.town',
            'addresses.country'
        )
        ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
        ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
        ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
        ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
        ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
        ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')
        
        ->where('companies_users.user_id', $userId)
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

        return Inertia::render('Companies/Index', ['companies' => $companies]);
    
    }

    public static function companiesInvoice()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        
        $companies = DB::table('companies')
        ->select(
            'companies.id',
            'companies.dt_end',
            'companies_tax_numbers.tax_number',
            'companies_names.name',
            'emails.email',
            'phones.phone',
            'addresses.address',
            'addresses.post_code',
            'addresses.province',
            'addresses.town',
            'addresses.country',
            'bank_account.complete_bank_account',
            'bank_account.swift',
            'bank_account.bank_name',
            'bank_account.id as bank_account_id'
        )
        ->leftJoin('companies_users', 'companies.id', '=', 'companies_users.company_id')
        ->leftJoin('companies_names', 'companies.id', '=', 'companies_names.company_id')
        ->leftJoin('companies_tax_numbers', 'companies.id', '=', 'companies_tax_numbers.company_id')
        //->leftJoin('bank_account', 'companies.id', '=', 'bank_account.company_id')
        ->leftJoin('emails', 'companies.id', '=', 'emails.company_id')
        ->leftJoin('phones', 'companies.id', '=', 'phones.company_id')
        ->leftJoin('addresses', 'companies.id', '=', 'addresses.company_id')

        ->leftJoin(DB::raw('(SELECT * FROM bank_account WHERE favourite = 1) as bank_account'), 'companies.id', '=', 'bank_account.company_id')
        
        ->where('companies_users.user_id', $userId)
        ->where('addresses.favourite', 1)
        ->where('phones.favourite', 1)
        ->where('emails.favourite', 1)
        //->where('bank_account.favourite', 1)
        ->whereNull('companies_users.dt_end')
        ->whereNull('companies_names.dt_end')
        ->whereNull('companies_tax_numbers.dt_end')
        ->whereNull('addresses.dt_end')
        ->whereNull('phones.dt_end')
        ->whereNull('emails.dt_end')
        ->get();

        return response()->json(['message' => 'Compañía encontrada ahora ', 'companies' => $companies]);

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
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        try {

            // Obtener el usuario autenticado
            $userId = Auth::id();

            $companies = DB::table('companies_users')
                ->select('company_id')
                ->where('user_id', $userId)
                ->get()
                ->pluck('company_id');

            // Verificar si el ID de la empresa está entre las empresas asociadas al usuario
            if (!$companies->contains($id)) {
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

            ->where('companies.id', $id)
            ->where('companies_users.user_id', $userId)
            ->first();

            $totalInvoices = DB::table('documents')
            ->where('company_id_company', $id)
            ->whereNull('dt_end')
            ->count();

            
            $totalCustomers = DB::table('companies_customers')
            ->where('company_id_company', $id)
            ->whereNull('dt_end')
            ->count();
            
            return Inertia::render('Companies/Show', ['company' => $companies, 'totalInvoices' => $totalInvoices, 'totalCustomers' => $totalCustomers ]);
            
        }catch (Exception $e) {
                
            return response()->json(['message' => 'Compañía no encontrada ahora ', $e->getMessage()], 500);
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
    
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
    }

    public function hasCompany()
    {
        $user_id = Auth::id();

        $company = DB::table('companies_users')
            ->select('company_id')
            ->where('user_id', $user_id)
            ->whereNull('dt_end')
            ->first();

        // Si no hay una compañía asociada, devuelve false, de lo contrario, devuelve true
        return $company === null ? false : true;
    }


}
