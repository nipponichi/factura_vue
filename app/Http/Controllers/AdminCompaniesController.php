<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
            'companies.user_id',
            'companies.dt_end',
            'companies.taxNumber',
            'companies_detail.name',
            'companies_email_register.email',
            'companies_phone_register.phone',
            'companies_country_register.country',
            'companies_town_register.town',
            'companies_post_code_register.postCode',
            'companies_province_register.province',       
            'companies_address_register.address'
        )
        ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
        ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
        ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
        ->leftJoin('companies_addresses', 'companies_detail.id', '=', 'companies_addresses.company_detail_id')
        ->leftJoin('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
        ->leftJoin('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
        ->leftJoin('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
        ->leftJoin('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
        ->leftJoin('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
        ->where('companies_addresses.favorite', 1)
        ->where('companies_phone_register.favorite', 1)
        ->where('companies_email_register.favorite', 1)
        ->whereNull('companies_addresses.dt_end')
        ->whereNull('companies_phone_register.dt_end')
        ->whereNull('companies_email_register.dt_end')
        ->get();


        return Inertia::render('Admin/CompaniesAdmin', ['companies' => $companies]);
        //return response()->json(['message' => 'Compañia cargada correctamente', 'companies' => $companies]);
        //return response()->json(['message' => 'Error al eliminiar la compañia: '. $companies]);
        
    
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
        try {
            
            $company = new Company($request->validated());
            $company->user_id = $user_id;
            $company->save();

            //return Inertia::render('Companies/Index');
            return response()->json(['message' => 'La compañía se ha creado correctamente', 'company' => $company]);
            
        }catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
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
                'companies.taxNumber',
                'companies_detail.name',
                'companies_email_register.email',
                'companies_phone_register.phone',
                'companies_country_register.country',
                'companies_town_register.town',
                'companies_post_code_register.postCode',
                'companies_province_register.province',       
                'companies_address_register.address'
            )
            ->leftJoin('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->leftJoin('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
            ->leftJoin('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
            ->leftJoin('companies_addresses', 'companies_detail.id', '=', 'companies_addresses.company_detail_id')
            ->leftJoin('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
            ->leftJoin('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
            ->leftJoin('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
            ->leftJoin('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
            ->leftJoin('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
            ->where('companies.id', $id)
            ->where('companies_addresses.favorite', 1)
            ->where('companies_phone_register.favorite', 1)
            ->where('companies_email_register.favorite', 1)
            ->whereNull('companies_addresses.dt_end')
            ->whereNull('companies_phone_register.dt_end')
            ->whereNull('companies_email_register.dt_end')
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
        /*
        try {

            $companies = Company::where('companies.id', $id)
            ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
            ->join('companies_email_register', 'companies_detail.company_id', '=', 'companies_email_register.company_detail_id')
            ->join('companies_phone_register', 'companies_detail.company_id', '=', 'companies_phone_register.company_detail_id')
            ->join('companies_address_register', 'companies_detail.company_id', '=', 'companies_address_register.company_detail_id')
            ->join('companies_province_register', 'companies_detail.company_id', '=', 'companies_province_register.company_detail_id')
            ->join('companies_town_register', 'companies_detail.company_id', '=', 'companies_town_register.company_detail_id')
            ->join('companies_post_code_register', 'companies_detail.company_id', '=', 'companies_post_code_register.company_detail_id')
            ->join('companies_country_register', 'companies_detail.company_id', '=', 'companies_country_register.company_detail_id')
            ->first();

            

            return response()->json(['company' => $companies]);

        }catch (Exception $e) {
                
            return response()->json(['message' => 'Compañía no encontrada ', $e->getMessage()], 500);
        }
        */
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, string $id)
    {
        /*
        try {
            // Actualiza la compañía y devuelve el número de filas afectadas
            $company = Company::where('companies.id', $id)
                ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
                ->join('companies_email_register', 'companies_detail.company_id', '=', 'companies_email_register.company_detail_id')
                ->join('companies_phone_register', 'companies_detail.company_id', '=', 'companies_phone_register.company_detail_id')
                ->join('companies_address_register', 'companies_detail.company_id', '=', 'companies_address_register.company_detail_id')
                ->join('companies_province_register', 'companies_detail.company_id', '=', 'companies_province_register.company_detail_id')
                ->join('companies_town_register', 'companies_detail.company_id', '=', 'companies_town_register.company_detail_id')
                ->join('companies_post_code_register', 'companies_detail.company_id', '=', 'companies_post_code_register.company_detail_id')
                ->join('companies_country_register', 'companies_detail.company_id', '=', 'companies_country_register.company_detail_id')
                ->update([
                    'companies.taxNumber' => $request->taxNumber,
                    'companies_detail.name' => $request->taxNumber,
                    'companies_email_register.email' => $request->taxNumber,
                    'companies_phone_register.phone' => $request->taxNumber,
                    '.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    'companies.taxNumber' => $request->taxNumber,
                    
                ]);

                if ($company === 0) {
                    return response()->json([
                        'message' => 'No se encontró ninguna compañía con el ID proporcionado.'
                    ], 404);
                }

    
        } catch (Exception $e) {
            // Devuelve una respuesta JSON con un mensaje de error
            return response()->json([
                'message' => 'Error al editar la compañía: ' . $request->taxNumber . '. ' . $e->getMessage()
            ], 500);
        }*/
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        /*

        try {

            $company = Company::findOrFail($id);
            $company->delete();
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id]);
        } catch (Exception $e) {
            
            return response()->json(['message' => 'Error al eliminiar la compañia: '. $id . $e->getMessage()], 500);
        }
        */
        
    }

    public function hasCompany()
    {

    // Busca empresas relacionadas con el usuario actual
        Company::get();


    // Si la colección de empresas está vacía, devuelve false, de lo contrario, devuelve true
        return $company->isEmpty() ? false : true;
    }

}
