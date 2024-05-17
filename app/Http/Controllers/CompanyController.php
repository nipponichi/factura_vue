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
        $this->middleware(['can:read company'])->only('index'); 
        $this->middleware(['can:create company'])->only('create'); 
        $this->middleware(['can:create company'])->only('store');  
        $this->middleware(['can:read company'])->only('show'); 
        $this->middleware(['can:update company'])->only('edit');
        $this->middleware(['can:update company'])->only('update');
        $this->middleware(['can:delete company'])->only('destroy');     
    }


    public static function index()
    {
        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();
        
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
        ->where('companies.user_id', $userId)
        ->where('companies_addresses.favorite', 1)
        ->where('companies_phone_register.favorite', 1)
        ->where('companies_email_register.favorite', 1)
        ->whereNull('companies_addresses.dt_end')
        ->whereNull('companies_phone_register.dt_end')
        ->whereNull('companies_email_register.dt_end')
        ->get();


        
/*
        // Recupera las compañías asociadas al usuario actual con los detalles y el nombre registrado
        $companies = Company::select(
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
        ->join('companies_detail', 'companies.id', '=', 'companies_detail.company_id')
        ->join('companies_email_register', 'companies_detail.id', '=', 'companies_email_register.company_detail_id')
        ->join('companies_phone_register', 'companies_detail.id', '=', 'companies_phone_register.company_detail_id')
        ->join('companies_addresses', 'companies_detail.company_id', '=', 'companies_addresses.id')
        ->join('companies_town_register', 'companies_addresses.company_town_register_id', '=', 'companies_town_register.id')
        ->join('companies_country_register', 'companies_addresses.company_country_register_id', '=', 'companies_country_register.id')
        ->join('companies_province_register', 'companies_addresses.company_province_register_id', '=', 'companies_province_register.id')
        ->join('companies_post_code_register', 'companies_addresses.company_post_code_register_id', '=', 'companies_post_code_register.id')
        ->join('companies_address_register', 'companies_addresses.company_address_register_id', '=', 'companies_address_register.id')
        ->where('companies.dt_end', null)
        ->where('user_id', $userId)
        ->where('companies_phone_register.favorite', 1)
        ->where('companies_email_register.favorite', 1)
        ->where('companies_addresses.favorite', 1)
        ->get();
        */

        return Inertia::render('Companies/Index', ['companies' => $companies]);
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


            $user_id = Auth::id();
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

            // Obtener el usuario autenticado
            $userId = Auth::id();

            // Verificar si el usuario autenticado es propietario de la empresa
            $company = Company::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$company) {
                return Redirect::route('companies.index')->with('error', 'No se encontró la empresa');
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
            ->where('companies.user_id', $userId)
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
    $user_id = Auth::id();

    // Busca empresas relacionadas con el usuario actual
    $company = Company::where('user_id', $user_id)->get();


    // Si la colección de empresas está vacía, devuelve false, de lo contrario, devuelve true
    return $company->isEmpty() ? false : true;
    }

}
